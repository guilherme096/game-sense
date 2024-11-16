package ies.gamesense.player_service.service;

import java.util.List;

import ies.gamesense.player_service.model.Player;

public interface PlayerService {

    List<Player> getAllPlayers();

    Player getPlayerById(Long id);

    Object getPlayerStatistics(Long id, String statistics);

    List<Player> searchPlayers(String name, Integer age, String club, String position, Integer goals,
                               Integer assists, Integer fouls, Integer yellowCards, Integer redCards);

}
