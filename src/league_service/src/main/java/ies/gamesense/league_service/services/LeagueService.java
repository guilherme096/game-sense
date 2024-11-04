package ies.gamesense.league_service.services;

import ies.gamesense.league_service.entities.Club;
import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.LeagueStanding;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LeagueService {

    League getLeagueById(Long id);
    void createLeague(League league);
    void updateLeague(League league);
    void deleteLeague(Long id);
    boolean existsLeague(Long id);
    List<Club> getAllClubs(Long id);
    void addClub( Long id, Club club, int points, int matchesPlayed, int goalsScored, int goalsConceded);
    void removeClub(Long id, Long clubId);
    List<LeagueStanding> getLeagueStandings(Long leagueId);
}
