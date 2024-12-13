package ies.gamesense.live_game_service.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import ies.gamesense.live_game_service.entities.GameStatistics;
import ies.gamesense.live_game_service.entities.Match;
import jakarta.annotation.PostConstruct;

@Service
public class LiveServiceImpl implements LiveService {
    private final ObjectMapper objectMapper = new ObjectMapper();

    private Map<String, Match> matches;

    @PostConstruct
    public void init() {
        this.matches = new HashMap<>();
    }

    @KafkaListener(id = "games", topics = "games")
    public void listen(Match match) {
        System.out.println("Hello from Kafka!");
        System.out.println("Received Match: " + match.toString());

        match.getHomeTeam().setStared(false);
        match.getAwayTeam().setStared(false);

        match.getHomeTeam().setScore(0);
        match.getAwayTeam().setScore(0);

        this.matches.put(match.getMatchId(), match);
    }

    @KafkaListener(id = "stats", topics = "stats", containerFactory = "gameStatsKafkaListenerContainerFactory")
    public void listen(GameStatistics stats) {
        System.out.println("Hello from Kafka!");
        System.out.println("Received GameStatistics: " + stats.toString());

        Match match = this.matches.get(stats.getMatchId());

        if (match == null) {
            System.err.println("Match not found for ID: " + stats.getMatchId());
            return;
        }
        System.out.println(this.matches);

        Integer half = stats.getHalf();

        match.addGameStatistics(half, stats);
        this.matches.replace(match.getMatchId(), match);

        System.out.println("Match updated: " + match.toString());
        System.out.println(this.matches);

    }

    @KafkaListener(id = "events", topics = "events", containerFactory = "customKafkaListenerContainerFactory")
    public void listen(ConsumerRecord<String, String> record) {
        System.out.println("Hello from Kafka!");
        Map<String, String> event = null;
        try {
            // Parse the JSON payload into a Map<String, String>
            event = objectMapper.readValue(
                    record.value(),
                    new TypeReference<Map<String, String>>() {
                    });
            System.out.println("Received Event: " + event.toString());
        } catch (Exception e) {
            throw new RuntimeException("Error parsing event JSON: " + record.value(), e);
        }

        String matchId = event.get("game_id");

        Match match = this.matches.get(matchId);

        if (match == null) {
            System.err.println("Match not found for ID: " + matchId);
            return;
        }

        match.setMinute(Integer.parseInt(event.get("minute")));

        if (event.get("event_type").equals("GOAL")) {
            String team = event.get("team");
            if (team.equals("home")) {
                match.getHomeTeam().setScore(match.getHomeTeam().getScore() + 1);
            } else {
                match.getAwayTeam().setScore(match.getAwayTeam().getScore() + 1);
            }
        }

        if (event.get("event_type").equals("END")) {
            match.endMatch();
        }

        match.getEvents().add(event);
    }

    @Override
    public List<Match> getLiveGames() {
        return new ArrayList<>(this.matches.values());
    }

    @Override
    public Match getLiveById(String id) {
        Match game = this.matches.get(id);
        if (game == null) {
            System.err.println("Live game not found for ID: " + id);
        }
        return game;
    }

    @Override
    public Map<Integer, GameStatistics> getGameStatistics(String id) {
        Match game = getLiveById(id);
        System.out.println("Getting game statistics for game: " + id);
        System.out.println(game);
        return (game != null) ? game.getGameStatistics() : new HashMap<>();
    }

    @Override
    public boolean existsNewEvent(String id, Long lastEventId) {
        Match game = getLiveById(id);
        if (game == null)
            return false;
        List<Map<String, String>> events = game.getEvents();
        System.out.println("Checking for new events in game: " + id);
        System.out.println(events);
        return events.stream().anyMatch(event -> event.get("id").compareTo(lastEventId.toString()) > 0);
    }

    @Override
    public List<Map<String, String>> getNewEvents(String id, Long lastEventId) {
        Match game = getLiveById(id);
        if (game == null)
            return null;

        List<Map<String, String>> newEvents = new ArrayList<>();
        for (Map<String, String> event : game.getEvents()) {
            System.out.println("Checking event: " + event);
            String eventId = event.get("id");
            if (eventId.compareTo(lastEventId.toString()) > 0) {
                newEvents.add(event);
            }
        }
        return newEvents;
    }

    @Override
    public void createLive(Match live) {
        this.matches.put(live.getMatchId(), live);
    }

    @Override
    public String getCurrentMVP(String id) {
        Match game = getLiveById(id);
        return (game != null) ? game.getCurrentMvp() : null;
    }

    @Override
    public List<String> getTopStats(String id) {
        Match game = getLiveById(id);
        return (game != null) ? game.getTopStats() : null;
    }

    @Override
    public Map<String, String> getBasicInfo(String id) {
        Match game = getLiveById(id);
        if (game == null) {
            return null;
        }
        Map<String, String> basicInfo = game.getBasicInfo();
        basicInfo.put("home_score", String.valueOf(game.getHomeTeam().getScore()));
        basicInfo.put("away_score", String.valueOf(game.getAwayTeam().getScore()));
        return basicInfo;
    }
}
