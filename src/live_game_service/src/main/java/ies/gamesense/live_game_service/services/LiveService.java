package ies.gamesense.live_game_service.services;

import ies.gamesense.live_game_service.entities.GameStatistics;
import ies.gamesense.live_game_service.entities.Live;

public interface LiveService {
    Live getLiveById(Long id);

    void createLive(Live live);

    GameStatistics getGameStatistics(Long id);

}