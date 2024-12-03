package ies.gamesense.league_service.services;

import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.League_Club;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LeagueService {

    League getLeagueById(int id);

    League createLeague(League league);

    League updateLeague(League league);

    List<League_Club> getLeagueStandings(int leagueId);

    League_Club createLeagueClub(int leagueId, League_Club leagueClub);

}
