package ies.gamesense.league_service.services;

import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.League_Club;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies.gamesense.league_service.repositories.LeagueClubRepository;
import ies.gamesense.league_service.repositories.LeagueRepository;

import java.util.*;

@Service
public class LeagueServiceImpl implements LeagueService {

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private LeagueClubRepository leagueClubRepository;


    private final Map<Integer, League> leagues = new HashMap<>();
    private final Map<Integer, List<League_Club>> leagueClubs = new HashMap<>();

    @Override
    public League getLeagueById(int id) {
        return leagueRepository.findById(id).orElse(null);
    }

    @Override
    public League createLeague(League league) {
        league.setId(leagues.size() + 1); 
        leagues.put(league.getId(), league);
        return leagueRepository.save(league);
    }

    @Override
    public League updateLeague(League league) {
        if (leagues.containsKey(league.getId())) {
            leagues.put(league.getId(), league);    
            return leagueRepository.save(league);
        }
        throw new IllegalArgumentException("League not found: " + league.getId());
    }

    @Override
    public List<League_Club> getLeagueStandings(int leagueId) {
        return leagueClubRepository.findByLeagueId(leagueId);
    }

    
    @Override
    public League_Club createLeagueClub(int leagueId, League_Club leagueClub) {
        // Fetch the league entity from the database
        League league = leagueRepository.findById(leagueId)
                .orElseThrow(() -> new IllegalArgumentException("League not found: " + leagueId));
        
        // Set the league for the leagueClub entity
        leagueClub.setLeague(league);
        
        // Save the League_Club entity
        return leagueClubRepository.save(leagueClub);
    }




}
