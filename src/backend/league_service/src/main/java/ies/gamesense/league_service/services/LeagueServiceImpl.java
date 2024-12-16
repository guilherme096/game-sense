package ies.gamesense.league_service.services;

import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.LeagueClubId;
import ies.gamesense.league_service.entities.League_Club;
import ies.gamesense.league_service.repositories.LeagueRepository;
import ies.gamesense.league_service.repositories.LeagueClubRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        return leagueRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "League not found"));
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
    public void updateLeague(long homeTeamId, long awayTeamId, int homeTeamScore, int awayTeamScore, long leagueId) {
        if (!leagueRepository.existsById(leagueId)) {
            throw new RuntimeException("League not found with ID: " + leagueId);
        }
        if (!leagueClubRepository.existsById(new LeagueClubId(leagueId, homeTeamId)) || !leagueClubRepository.existsById(new LeagueClubId(leagueId, awayTeamId))) {
            throw new RuntimeException("League Club not found with club ID: " + homeTeamId + " or " + awayTeamId);
        }
        League_Club homeTeam = leagueClubRepository.findById(new LeagueClubId(leagueId, homeTeamId)).get();
        League_Club awayTeam = leagueClubRepository.findById(new LeagueClubId(leagueId, awayTeamId)).get();

        homeTeam.setGoalsScored(homeTeam.getGoalsScored() + homeTeamScore);
        homeTeam.setGoalsConceded(homeTeam.getGoalsConceded() + awayTeamScore);
        awayTeam.setGoalsScored(awayTeam.getGoalsScored() + awayTeamScore);
        awayTeam.setGoalsConceded(awayTeam.getGoalsConceded() + homeTeamScore);

        if (homeTeamScore > awayTeamScore) {
            homeTeam.setWins(homeTeam.getWins() + 1);
            awayTeam.setLosses(awayTeam.getLosses() + 1);
        } else if (homeTeamScore < awayTeamScore) {
            awayTeam.setWins(awayTeam.getWins() + 1);
            homeTeam.setLosses(homeTeam.getLosses() + 1);
        } else {
            homeTeam.setDraws(homeTeam.getDraws() + 1);
            awayTeam.setDraws(awayTeam.getDraws() + 1);
        }

        homeTeam.setMatchesPlayed(homeTeam.getMatchesPlayed() + 1);
        awayTeam.setMatchesPlayed(awayTeam.getMatchesPlayed() + 1);

        homeTeam.setGoal_difference(homeTeam.getGoalsScored() - homeTeam.getGoalsConceded());
        awayTeam.setGoal_difference(awayTeam.getGoalsScored() - awayTeam.getGoalsConceded());

        homeTeam.setPoints(homeTeam.getWins() * 3 + homeTeam.getDraws());
        awayTeam.setPoints(awayTeam.getWins() * 3 + awayTeam.getDraws());

        leagueClubRepository.save(homeTeam);
        leagueClubRepository.save(awayTeam);

        // sort league standings
        List<League_Club> leagueClubs = leagueClubRepository.findByLeagueId(leagueId);
        leagueClubs.sort((a, b) -> {
            if (a.getPoints() != b.getPoints()) {
                return b.getPoints() - a.getPoints();
            } else if (a.getGoal_difference() != b.getGoal_difference()) {
                return b.getGoal_difference() - a.getGoal_difference();
            } else {
                return b.getGoalsScored() - a.getGoalsScored();
            }
        });

        for (int i = 0; i < leagueClubs.size(); i++) {
            leagueClubs.get(i).setPlace(i + 1);
            leagueClubRepository.save(leagueClubs.get(i));
        }

        return;
    }

    @Override
    public List<League_Club> getLeagueStandings(Long leagueId) {
        return leagueClubRepository.findByLeagueId(leagueId);
    }

    @Override
    public League_Club createLeagueClub(Long leagueId, League_Club leagueClub) {
        League league = leagueRepository.findById(leagueId)
                .orElseThrow(() -> new RuntimeException("League not found with ID: " + leagueId));
        leagueClub.setLeague(league);
        return leagueClubRepository.save(leagueClub);
    }
}
