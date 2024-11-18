package ies.gamesense.live_game_service.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import ies.gamesense.live_game_service.entities.GameStatistics;
import ies.gamesense.live_game_service.entities.Live;
import jakarta.annotation.PostConstruct;

@Service
public class LiveServiceImpl implements LiveService {

    @Value("classpath:static/mock_games.json")
    private Resource jsonLiveGames;

    private Map<Long, Live> liveGames;

    @PostConstruct
    public void init() {
        this.liveGames = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Parse the JSON file into a List<Live>
            List<Live> games = mapper.readValue(jsonLiveGames.getInputStream(),
                    mapper.getTypeFactory().constructCollectionType(List.class, Live.class));
    
            // Check if the parsed list is null or empty
            if (games == null || games.isEmpty()) {
                System.err.println("No games found in the JSON file: " + jsonLiveGames.getFilename());
                return;
            }
    
            // Populate the liveGames map
            games.forEach(game -> {
                if (game.getId() == null) {
                    System.err.println("Game with missing ID detected. Skipping: " + game);
                } else {
                    this.liveGames.put(game.getId(), game);
                }
            });
    
            // Log success
            System.out.println("Loaded " + liveGames.size() + " live games from " + jsonLiveGames.getFilename());
        } catch (IOException e) {
            // Handle and log specific error
            System.err.println("Error reading or parsing the JSON file: " + jsonLiveGames.getFilename());
            e.printStackTrace();
        }
    }

    @Override
    public List<Live> getLiveGames() {
        return new ArrayList<>(this.liveGames.values());
    }
    

    @Override
    public Live getLiveById(Long id) {
        Live game = this.liveGames.get(id);
        if (game == null) {
            System.err.println("Live game not found for ID: " + id);
        }
        return game;
    }

    @Override
    public GameStatistics getGameStatistics(Long id) {
        Live game = getLiveById(id);
        return (game != null) ? game.getGameStatistics() : null;
    }

    @Override
    public boolean existsNewEvent(Long id, Long lastEventId) {
        Live game = getLiveById(id);
        if (game == null) return false;
        List<Map<String, String>> events = game.getEvents();
        return events.stream().anyMatch(event -> Long.parseLong(event.get("id")) > lastEventId);
    }

    @Override
    public List<Map<String, String>> getNewEvents(Long id, Long lastEventId) {
        Live game = getLiveById(id);
        if (game == null) return null;

        List<Map<String, String>> newEvents = new ArrayList<>();
        for (Map<String, String> event : game.getEvents()) {
            Long eventId = Long.parseLong(event.get("id"));
            if (eventId > lastEventId) {
                newEvents.add(event);
            }
        }
        return newEvents;
    }

    @Override
    public void createLive(Live live) {
        this.liveGames.put(live.getId(), live);
    }

    @Override
    public String getCurrentMVP(Long id) {
        Live game = getLiveById(id);
        return (game != null) ? game.getCurrentMVP() : null;
    }

    @Override
    public List<String> getTopStats(Long id) {
        Live game = getLiveById(id);
        return (game != null) ? game.getTopStats() : null;
    }
}
