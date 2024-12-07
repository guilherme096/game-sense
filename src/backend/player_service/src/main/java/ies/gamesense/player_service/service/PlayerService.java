package ies.gamesense.player_service.service;

import java.util.List;

import ies.gamesense.player_service.model.Player;
import ies.gamesense.player_service.model.PlayerGameStats;
import ies.gamesense.player_service.model.Injury;

public interface PlayerService {
    List<Player> getAllPlayers();

    Player getPlayerById(Long id);

    Player createPlayer(Player player);

    Player updatePlayer(Long id, Player player);

    List<Player> getPlayersByClub(Long clubId);

    PlayerGameStats getPlayerStatisticsbyGameId(Long id, Long gameId);

    List<Injury> getPlayerInjuries(Long id);

    List<Player> searchPlayers(String name, Integer age, String club, String position);
}
