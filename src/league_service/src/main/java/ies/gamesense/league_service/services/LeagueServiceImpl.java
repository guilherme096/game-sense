package ies.gamesense.league_service.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ies.gamesense.league_service.entities.Club;
import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.LeagueStanding;
import ies.gamesense.league_service.repositories.ClubRepository;
import ies.gamesense.league_service.repositories.LeagueRepository;
import ies.gamesense.league_service.repositories.LeagueStandingRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import java.io.InputStream;

import java.io.IOException;
import java.util.*;

@Service
public class LeagueServiceImpl implements LeagueService {

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private LeagueStandingRepository leagueStandingRepository;

    @PostConstruct
    public void init() {
        loadMockData();
    }

    private void loadMockData() {
        ObjectMapper mapper = new ObjectMapper();
        try (InputStream inputStream = new ClassPathResource("static/mock_leagues.json").getInputStream()) {
            JsonNode rootNode = mapper.readTree(inputStream);

            // Parse League information
            League league = new League();
            league.setId(rootNode.get("id").asLong());
            league.setName(rootNode.get("name").asText());

            // Save the league to the repository
            leagueRepository.save(league);

            // Parse standings and related clubs
            for (JsonNode standingNode : rootNode.get("standings")) {
                // Parse club details
                JsonNode clubNode = standingNode.get("club");
                Club club = new Club();
                club.setId(clubNode.get("id").asLong());
                club.setName(clubNode.get("name").asText());
                club.setCountry(clubNode.get("country").asText());
                club.setStarred(clubNode.get("isStarred").asBoolean());

                // Save the club to the repository if it doesn't already exist
                clubRepository.save(club);

                // Parse LeagueStanding details
                LeagueStanding standing = new LeagueStanding();
                standing.setLeague(league);
                standing.setClub(club);
                standing.setPoints(standingNode.get("points").asInt());
                standing.setMatchesPlayed(standingNode.get("matchesPlayed").asInt());
                standing.setGoalsScored(standingNode.get("goalsScored").asInt());
                standing.setGoalsConceded(standingNode.get("goalsConceded").asInt());

                // Save the league standing to the repository
                leagueStandingRepository.save(standing);
            }
        } catch (IOException e) {
            System.out.println("Failed to load mock_leagues.json. Please check the file path and content.");
        }
    }

    @Override
    public League getLeagueById(Long id) {
        return leagueRepository.findById(id).orElse(null);
    }

    @Override
    public void createLeague(League league) {
        leagueRepository.save(league);
    }

    @Override
    public void updateLeague(League league) {
        if (leagueRepository.existsById(league.getId())) {
            leagueRepository.save(league);
        }
    }

    @Override
    public void deleteLeague(Long id) {
        if (leagueRepository.existsById(id)) {
            leagueRepository.deleteById(id);
        }
    }

    @Override
    public boolean existsLeague(Long id) {
        return leagueRepository.existsById(id);
    }

    @Override
    public List<Club> getAllClubs(Long leagueId) {
        Optional<League> league = leagueRepository.findById(leagueId);
        return league.map(value -> value.getStandings().stream().map(LeagueStanding::getClub).toList()).orElse(null);
    }

    @Override
    public void addClub(Long leagueId, Club club, int points, int matchesPlayed, int goalsScored, int goalsConceded) {
        Optional<League> league = leagueRepository.findById(leagueId);
        if (league.isPresent()) {
            // Save the club if it doesn't already exist
            if (club.getId() == null || !clubRepository.existsById(club.getId())) {
                clubRepository.save(club);
            }

            // Create and save LeagueStanding for this club in the league
            LeagueStanding standing = new LeagueStanding(league.get(), club, points, matchesPlayed, goalsScored, goalsConceded);
            leagueStandingRepository.save(standing);
        }
    }

    @Override
    public void removeClub(Long leagueId, Long clubId) {
        Optional<League> league = leagueRepository.findById(leagueId);
        if (league.isPresent()) {
            // Remove LeagueStanding entry for the club in this league
            leagueStandingRepository.deleteByLeagueIdAndClubId(leagueId, clubId);
        }
    }

    @Override
    public Iterable<League> getLeagues() {
        return null;
    }

    @Override
    public List<LeagueStanding> getLeagueStandings(Long leagueId) {
        return leagueStandingRepository.findByLeagueId(leagueId);
    }
}
