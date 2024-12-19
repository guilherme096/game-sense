package ies.gamesense.game_service.services;

import java.util.List;

import org.springframework.stereotype.Service;

import ies.gamesense.game_service.entities.Game;
import ies.gamesense.game_service.entities.GameEvents;
import ies.gamesense.game_service.entities.MatchDTO;
import ies.gamesense.game_service.entities.TeamStats;

@Service
public interface GameService {

    public List<Game> getAllGames();

    public Game getGameById(Long id);

    public Game createGame(Game game);

    public List<Game> getGamesByClub(Long id);

    public List<TeamStats> getGameFirstHalfStats(Long id);

    public List<TeamStats> getGameSecondHalfStats(Long id);

    public List<GameEvents> getGameEvents(Long id);

    public Game matchAdapter(MatchDTO matchDTO);
}
