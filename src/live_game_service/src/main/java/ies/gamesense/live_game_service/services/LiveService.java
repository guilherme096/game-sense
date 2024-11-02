package ies.gamesense.live_game_service.services;

import ies.gamesense.live_game_service.entities.Live;

public interface LiveService {
    Live getLiveById(Long id);
}