package ies.gamesense.live_game_service.services;

import ies.gamesense.live_game_service.entities.Match;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class MatchCacheService {

    @Cacheable(value = "liveGames", key = "#id")
    public Match getLiveById(String id) {
        System.out.println("Fetching Match from Redis: " + id);
        return null;
    }


}
