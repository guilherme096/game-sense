package ies.gamesense.game_service.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies.gamesense.game_service.entities.Game;
import ies.gamesense.game_service.entities.GameEvents;
import ies.gamesense.game_service.entities.Half;
import ies.gamesense.game_service.entities.MatchDTO;
import ies.gamesense.game_service.entities.TeamStats;
import ies.gamesense.game_service.repositories.GameEventsRepository;
import ies.gamesense.game_service.repositories.GameRepository;
import ies.gamesense.game_service.repositories.HalfRepository;
import ies.gamesense.game_service.repositories.TeamStatsRepository;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private HalfRepository halfRepository;

    @Autowired
    private TeamStatsRepository teamStatsRepository;

    @Autowired
    private GameEventsRepository gameEventsRepository;

    public GameServiceImpl(GameRepository gameRepository, HalfRepository halfRepository,
            TeamStatsRepository teamStatsRepository, GameEventsRepository gameEventsRepository) {
        this.gameRepository = gameRepository;
        this.halfRepository = halfRepository;
        this.teamStatsRepository = teamStatsRepository;
        this.gameEventsRepository = gameEventsRepository;
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).orElse(null);
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public List<Game> getGamesByClub(Long id) {
        return gameRepository.findByClubId(id);
    }

    public List<TeamStats> getGameFirstHalfStats(Long id) {
        Game game = gameRepository.findById(id)
                .orElse(null);

        Long firstHalfId = game.getFirstHalfId();

        Half half = halfRepository.findById(firstHalfId)
                .orElse(null);

        Optional<TeamStats> homeClubStats = teamStatsRepository.findById(half.getHomeClubStatsId());
        Optional<TeamStats> awayClubStats = teamStatsRepository.findById(half.getAwayClubStatsId());

        return List.of(homeClubStats.orElse(null), awayClubStats.orElse(null));
    }

    public List<TeamStats> getGameSecondHalfStats(Long id) {
        Game game = gameRepository.findById(id)
                .orElse(null);

        Long secondHalfId = game.getSecondHalfId();

        Half half = halfRepository.findById(secondHalfId)
                .orElse(null);

        Optional<TeamStats> homeClubStats = teamStatsRepository.findById(half.getHomeClubStatsId());
        Optional<TeamStats> awayClubStats = teamStatsRepository.findById(half.getAwayClubStatsId());

        return List.of(homeClubStats.orElse(null), awayClubStats.orElse(null));
    }

    public List<GameEvents> getGameEvents(Long id) {
        return gameEventsRepository.findByGame_id(id);
    }

    public Game matchAdapter(MatchDTO matchDTO) {
        Game game = new Game();
        game.parseFromMatchDTO(matchDTO);
        return game;
    }
}
