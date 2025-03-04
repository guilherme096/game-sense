package ies.gamesense.player_service.service;

import ies.gamesense.player_service.repository.PlayerRepository;
import ies.gamesense.player_service.repository.PlayerGameStatsRepository;
import ies.gamesense.player_service.repository.InjuryRepository;
import ies.gamesense.player_service.model.Player;
import ies.gamesense.player_service.model.PlayerGameStats;
import ies.gamesense.player_service.model.Injury;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerGameStatsRepository playerGameStatsRepository;

    @Autowired
    private InjuryRepository injuryRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository, PlayerGameStatsRepository playerGameStatsRepository, InjuryRepository injuryRepository) {
        this.playerRepository = playerRepository;
        this.playerGameStatsRepository = playerGameStatsRepository;
        this.injuryRepository = injuryRepository;
    }

    @Override
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public Player getPlayerById(Long id) {
        return playerRepository.findById(id).orElse(null);
    }

    @Override
    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public Player updatePlayer(Long id, Player player) {
        Player existingPlayer = getPlayerById(id);
        player.setId(existingPlayer.getId());
        return playerRepository.save(player);
    }

    @Override
    public List<Player> getPlayersByClub(Long clubId) {
        return playerRepository.findByClubId(clubId);
    }

    @Override
    public Optional<PlayerGameStats> getPlayerStatisticsbyGameId(Long id, Long gameId) {
        return playerGameStatsRepository.findByPlayerIdAndGameId(id, gameId);
    }

    @Override
    public List<PlayerGameStats> getPlayerStatistics(Long id) {
        return playerGameStatsRepository.findByPlayerId(id);
    }

    @Override
    public List<Injury> getPlayerInjuries(Long id) {
        return injuryRepository.findByPlayerId(id);
    }

    @Override
    public List<Player> searchPlayers(String name, Integer age, String position, String surname) {
        return playerRepository.findPlayersByCriteria(name, age, position, surname);
    }
}
