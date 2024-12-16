package ies.gamesense.league_service.services;

import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.League_Club;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LeagueService {

    List<League> getAllLeagues();

    League getLeagueById(Long id);

    League createLeague(League league);

    void updateLeague(long homeTeamId,long awayTeamId,int homeTeamScore,int awayTeamScore,long leagueId);

    List<League_Club> getLeagueStandings(Long leagueId);

    League_Club createLeagueClub(Long leagueId, League_Club leagueClub);

    League_Club getLeagueClubByClubId(Long clubId);
}
