package ies.gamesense.live_game_service.services;

import java.util.List;
import java.util.Map;

import ies.gamesense.live_game_service.entities.GameStatistics;
import ies.gamesense.live_game_service.entities.Live;

public interface LiveService {
    Live getLiveById(Long id);

    void createLive(Live live);

    GameStatistics getGameStatistics(Long id);

    boolean existsNewEvent(Long id, Long lastEventId);

    List<Map<String, String>> getNewEvents(Long id, Long lastEventId);

}