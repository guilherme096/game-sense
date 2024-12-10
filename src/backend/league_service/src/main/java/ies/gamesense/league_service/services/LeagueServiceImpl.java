package ies.gamesense.league_service.services;

import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.League_Club;
import ies.gamesense.league_service.repositories.LeagueRepository;
import ies.gamesense.league_service.repositories.LeagueClubRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeagueServiceImpl implements LeagueService {

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private LeagueClubRepository leagueClubRepository;

    public LeagueServiceImpl(LeagueRepository leagueRepository, LeagueClubRepository leagueClubRepository) {
        this.leagueRepository = leagueRepository;
        this.leagueClubRepository = leagueClubRepository;
    }

    @Override
    public List<League> getAllLeagues() {
        return leagueRepository.findAll();
    }

    @Override
    public League getLeagueById(Long id) {
        League league = leagueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("League not found with ID: " + id));
        return league;
    }

    @Override
    public League_Club getLeagueClubByClubId(Long clubId) {
        League_Club leagueClub = leagueClubRepository.findByClubId(clubId);
        if (leagueClub == null) {
            throw new RuntimeException("League Club not found with club ID: " + clubId);
        }
        return leagueClub;
    }

    @Override
    public League createLeague(League league) {
        return leagueRepository.save(league);
    }

    @Override
    public League updateLeague(League league) {
        if (!leagueRepository.existsById(league.getId())) {
            throw new RuntimeException("League not found with ID: " + league.getId());
        }
        return leagueRepository.save(league);
    }

    @Override
    public List<League_Club> getLeagueStandings(Long leagueId) {
        return leagueClubRepository.findByLeagueId(leagueId);
    }

    @Override
    public League_Club createLeagueClub(Long leagueId, League_Club leagueClub) {
        Long leagueId_ = leagueRepository.findById(leagueId)
                .orElseThrow(() -> new RuntimeException("League not found with ID: " + leagueId)).getId();
        leagueClub.setLeagueId(leagueId_);
        return leagueClubRepository.save(leagueClub);
    }
}
