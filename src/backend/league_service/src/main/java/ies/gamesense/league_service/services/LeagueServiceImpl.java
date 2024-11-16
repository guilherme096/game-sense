package ies.gamesense.league_service.services;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ies.gamesense.league_service.entities.Club;
import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.LeagueStanding;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeagueServiceImpl implements LeagueService {

    @Value("classpath:static/mock_leagues.json")
    private Resource jsonLeagues;

    private final Map<Long, League> leagues = new HashMap<>();
    private Map<Long, Club> userFavoriteTeams = new HashMap<>(); // Mock storage for user favorite teams

    @PostConstruct
    public void init() {
        ObjectMapper mapper = new ObjectMapper();

        try {
            // Load JSON data and check if file exists
            if (!jsonLeagues.exists()) {
                throw new IOException("JSON file not found: " + jsonLeagues.getFilename());
            }

            JsonNode rootNode = mapper.readTree(jsonLeagues.getInputStream());

            League league = new League();
            league.setId(rootNode.get("id").asLong());
            league.setName(rootNode.get("name").asText());

            List<LeagueStanding> standings = new ArrayList<>();

            for (JsonNode standingNode : rootNode.get("standings")) {
                Club club = new Club();
                JsonNode clubNode = standingNode.get("club");
                club.setId(clubNode.get("id").asLong());
                club.setName(clubNode.get("name").asText());
                club.setCountry(clubNode.get("country").asText());
                club.setStarred(clubNode.get("starred").asBoolean());

                LeagueStanding standing = new LeagueStanding();
                standing.setClub(club);
                standing.setMatchesPlayed(standingNode.get("matchesPlayed").asInt());
                standing.setGoalsScored(standingNode.get("goalsScored").asInt());
                standing.setGoalsConceded(standingNode.get("goalsConceded").asInt());

                standings.add(standing);
            }

            league.setStandings(standings);
            leagues.put(league.getId(), league);

        } catch (IOException e) {
            System.err.println("Failed to load or parse mock_leagues.json: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Unexpected error during initialization: " + e.getMessage());
            e.printStackTrace();
        }
    }



    @Override
    public League getLeagueById(Long id) {
        return leagues.get(id);
    }

    @Override
    public void createLeague(League league) {
        leagues.put(league.getId(), league);
    }

    @Override
    public void updateLeague(League league) {
        if (leagues.containsKey(league.getId())) {
            leagues.put(league.getId(), league);
        }
    }

    @Override
    public void deleteLeague(Long id) {
        leagues.remove(id);
    }

    @Override
    public boolean existsLeague(Long id) {
        return leagues.containsKey(id);
    }

    @Override
    public List<Club> getAllClubs(Long leagueId) {
        League league = leagues.get(leagueId);
        if (league != null) {
            List<Club> clubs = new ArrayList<>();
            for (LeagueStanding standing : league.getStandings()) {
                clubs.add(standing.getClub());
            }
            return clubs;
        }
        return null;
    }

    @Override
    public void addClub(Long leagueId, Club club, int points, int matchesPlayed, int goalsScored, int goalsConceded) {
        League league = leagues.get(leagueId);
        if (league != null) {
            LeagueStanding standing = new LeagueStanding();
            standing.setClub(club);
            standing.setMatchesPlayed(matchesPlayed);
            standing.setGoalsScored(goalsScored);
            standing.setGoalsConceded(goalsConceded);
            league.getStandings().add(standing);
        }
    }

    @Override
    public void removeClub(Long leagueId, Long clubId) {
        League league = leagues.get(leagueId);
        if (league != null) {
            league.getStandings().removeIf(standing -> standing.getClub().getId().equals(clubId));
        }
    }

    @Override
    public List<LeagueStanding> getLeagueStandingsWithDetails(Long leagueId) {
        League league = leagues.get(leagueId);
        if (league != null) {
            return league.getStandings();
        }
        return null;
    }

    @Override
    public void setFavoriteTeam(Long userId, Long teamId) {
        Club favoriteTeam = null;
        for (League league : leagues.values()) {
            for (LeagueStanding standing : league.getStandings()) {
                if (standing.getClub().getId().equals(teamId)) {
                    favoriteTeam = standing.getClub();
                    break;
                }
            }
        }
        if (favoriteTeam != null) {
            userFavoriteTeams.put(userId, favoriteTeam);
        }
        else {
            System.out.println("Club not found: " + teamId);
        }
    }

    @Override
    public Club getFavoriteTeam(Long userId) {
        return userFavoriteTeams.get(userId);
    }
}
