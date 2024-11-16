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

    // temporarlly using a json file to store the games
    // demonstration purposes only
    @Value("classpath:static/mock_games.json")
    private Resource jsonLiveGames;

    private Map<Long, Live> liveGames;

    @PostConstruct
    public void init() {
        this.liveGames = new HashMap<>();

        ObjectMapper mapper = new ObjectMapper();
        List<Live> games = new ArrayList<>();

        // parse the json file and populate the liveGames map
        try {
            games = mapper.readValue(jsonLiveGames.getInputStream(),
                    mapper.getTypeFactory().constructCollectionType(List.class, Live.class));
            games.forEach(game -> this.liveGames.put(game.getId(), game));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Override
    public Live getLiveById(Long id) {
        return this.liveGames.get(id);
    }

    @Override
    public GameStatistics getGameStatistics(Long id) {
        return this.getLiveById(id).getGameStatistics();
    }

    @Override
    public boolean existsNewEvent(Long id, Long lastEventId) {
        return true;
    }

    // returns the new events since the lastEventId
    @Override
    public List<Map<String, String>> getNewEvents(Long id, Long lastEventId) {
        List<Map<String, String>> events = this.getLiveById(id).getEvents();
        List<Map<String, String>> newEvents = new ArrayList<>();

        for (Map<String, String> event : events) {
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
