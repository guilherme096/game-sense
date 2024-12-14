package ies.gamesense.live_game_service.services;

import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import ies.gamesense.live_game_service.entities.GameStatistics;
import ies.gamesense.live_game_service.entities.Match;

@Service
public class LiveServiceImpl implements LiveService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final MatchPersistenceProducer matchPersistenceProducer;
    private final MatchCacheService matchCacheService;
    private final RedisTemplate<String , Match> redisTemplate;

    public LiveServiceImpl(MatchPersistenceProducer matchPersistenceProducer, MatchCacheService matchCacheService, RedisTemplate<String, Match> redisTemplate) {
        this.matchPersistenceProducer = matchPersistenceProducer;
        this.matchCacheService = matchCacheService;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public List<Match> getLiveGames() {

        Set<String> keys = redisTemplate.keys("liveGames::*");
        List<Match> liveGames = new ArrayList<>();
        if (keys != null) {
            keys.forEach(key -> {
                Match match = redisTemplate.opsForValue().get(key);
                if (match != null) {
                    liveGames.add(match);
                }
            });
        }

        return liveGames;
    }

    @KafkaListener(id = "games", topics = "games")
    public void listen(Match match) {
        System.out.println("Hello from Kafka!");
        System.out.println("Received Match: " + match.toString());

        match.getHomeTeam().setStared(false);
        match.getAwayTeam().setStared(false);

        match.getHomeTeam().setScore(0);
        match.getAwayTeam().setScore(0);

        updateMatch(match.getMatchId(), match);
        System.out.println("Match saved to Redis: " + match);
    }

    @KafkaListener(id = "stats", topics = "stats", containerFactory = "gameStatsKafkaListenerContainerFactory")
    public void listen(GameStatistics stats) {
        try {
            System.out.println("Hello from Kafka!");
            System.out.println("Received GameStatistics: " + stats);

            String matchId = stats.getMatchId(); // Ensure this field exists in GameStatistics
            System.out.println("Getting stats Match ID: " + matchId);

            Match match = redisTemplate.opsForValue().get("liveGames::" + matchId);
            if (match == null) {
                System.err.println("Match not found for ID: " + matchId);
                return;
            }

            // Ensure gameStatistics is initialized
            if (match.getGameStatistics() == null) {
                match.setGameStatistics(new HashMap<>());
            }

            // Update match statistics
            Integer half = stats.getHalf(); // Ensure this field exists
            match.addGameStatistics(half, stats);

            // Save updated match to Redis
            redisTemplate.opsForValue().set("liveGames::" + matchId, match);
            System.out.println("Updated GameStatistics for Match: " + match);
        } catch (Exception e) {
            System.err.println("Error processing GameStatistics: " + stats);
            e.printStackTrace();
            throw e;
        }
    }


    @KafkaListener(id = "events", topics = "events", containerFactory = "customKafkaListenerContainerFactory")
    public void listen(ConsumerRecord<String, String> record) throws JsonProcessingException {
        try {
            System.out.println("Hello from Kafka!");
            Map<String, String> event = objectMapper.readValue(
                    record.value(),
                    new TypeReference<Map<String, String>>() {}
            );
            System.out.println("Received Event: " + event);

            String matchId = event.get("game_id");

            // Fetch Match object from Redis
            Match match = redisTemplate.opsForValue().get("liveGames::" + matchId);
            if (match == null) {
                System.err.println("Match not found for ID: " + matchId);
                return;
            }

            // Initialize events list if null
            if (match.getEvents() == null) {
                match.setEvents(new ArrayList<>());
            }

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
                this.matchPersistenceProducer.sendMatchForPersistence(match);
                removeMatchFromCache(matchId);
            }

            // Add event to the match
            match.getEvents().add(event);
            System.out.println("Event added to Match: " + match);

            // Save updated Match to Redis
            updateMatch(matchId, match);
            System.out.println("Updated Match saved to Redis: " + match);
        } catch (Exception e) {
            System.err.println("Error processing event: " + record.value());
            e.printStackTrace();
            throw e;
        }
    }


    @CachePut(value = "liveGames", keyGenerator = "customKeyGenerator")
    public void updateMatch(String id, Match match) {
        System.out.println("Updating match in Redis: " + match);
        redisTemplate.opsForValue().set("liveGames::" + id, match);
    }

    @CacheEvict(value = "liveGames", keyGenerator = "customKeyGenerator")
    public void removeMatchFromCache(String id) {
        System.out.println("Removing match from Redis cache for ID: " + id);
    }

    @Override
    @Cacheable(value = "liveGames", keyGenerator = "customKeyGenerator")
    public Match getLiveById(String id) {
        System.out.println("Fetching live game from redis for id " + id);
        return null;
    }


    @Override
    public Map<Integer, GameStatistics> getGameStatistics(String id) {
        Match game = matchCacheService.getLiveById(id);
        System.out.println("Getting game statistics for game: " + id);
        System.out.println(game);
        return (game != null) ? game.getGameStatistics() : new HashMap<>();
    }

    @Override
    public boolean existsNewEvent(String id, Long lastEventId) {
        Match game = matchCacheService.getLiveById(id);
        if (game == null)
            return false;
        List<Map<String, String>> events = game.getEvents();
        System.out.println("Checking for new events in game: " + id);
        System.out.println(events);
        return events.stream().anyMatch(event -> event.get("id").compareTo(lastEventId.toString()) > 0);
    }

    @Override
    public List<Map<String, String>> getNewEvents(String id, Long lastEventId) {
        Match game = matchCacheService.getLiveById(id);
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
    public String getCurrentMVP(String id) {
        Match game = matchCacheService.getLiveById(id);
        return (game != null) ? game.getCurrentMvp() : null;
    }

    @Override
    public List<String> getTopStats(String id) {
        Match game = matchCacheService.getLiveById(id);
        return (game != null) ? game.getTopStats() : null;
    }

    @Override
    public Map<String, String> getBasicInfo(String id) {
        Match game = matchCacheService.getLiveById(id);
        if (game == null) {
            return null;
        }
        Map<String, String> basicInfo = game.getBasicInfo();
        basicInfo.put("home_score", String.valueOf(game.getHomeTeam().getScore()));
        basicInfo.put("away_score", String.valueOf(game.getAwayTeam().getScore()));
        return basicInfo;
    }
}
