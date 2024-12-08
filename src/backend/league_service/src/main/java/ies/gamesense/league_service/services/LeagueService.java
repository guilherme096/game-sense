package ies.gamesense.league_service.services;

import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.League_Club;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LeagueService {

    League getLeagueById(Long id);

    League createLeague(League league);

    League updateLeague(League league);

    List<League_Club> getLeagueStandings(Long leagueId);

    League_Club createLeagueClub(Long leagueId, League_Club leagueClub);

}
