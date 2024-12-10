package ies.gamsense.club_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ies.gamsense.club_service.model.Club;
import ies.gamsense.club_service.model.Game;
import ies.gamsense.club_service.repository.ClubRepository;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Value("classpath:mockdata/clubs.json")
    private Resource jsonClubs; // Path to the mock clubs JSON file

    private final Map<Long, Club> clubsFromJson = new HashMap<>(); // Map to store club data in memory

    public ClubServiceImpl(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }


    @PostConstruct
    public void init() {
        ObjectMapper mapper = new ObjectMapper();
    
        try {
            // Check if the JSON resource exists
            if (!jsonClubs.exists()) {
                throw new IOException("JSON file not found: " + jsonClubs.getFilename());
            }
    
            // Parse JSON data
            JsonNode rootNode = mapper.readTree(jsonClubs.getInputStream());
    
            if (rootNode.isArray()) {
                for (JsonNode clubNode : rootNode) {
                    Club club = new Club();
                    club.setId(clubNode.get("id").asLong());
    
                    // Parse nextGame
                    JsonNode nextGameNode = clubNode.get("nextGame");
                    if (nextGameNode != null && !nextGameNode.isNull()) {
                        Game nextGame = new Game();
                        nextGame.setId(nextGameNode.get("id").asLong());
                        nextGame.setHomeTeam(nextGameNode.get("homeTeam").asText());
                        nextGame.setHomeTeamLogo(nextGameNode.get("homeTeamLogo").asText());
                        nextGame.setAwayTeam(nextGameNode.get("awayTeam").asText());
                        nextGame.setAwayTeamLogo(nextGameNode.get("awayTeamLogo").asText());
                        nextGame.setDate(nextGameNode.get("date").asText());
                        nextGame.setLeague(nextGameNode.get("league").asText());
                        nextGame.setScore(nextGameNode.get("score").isNull() ? null : nextGameNode.get("score").asText());
                        nextGame.setResult(nextGameNode.get("result").isNull() ? null : nextGameNode.get("result").asText());
                        club.setNextGame(nextGame);
                    }
    
                    // Parse lastGames
                    List<Game> lastGames = new ArrayList<>();
                    for (JsonNode lastGameNode : clubNode.get("lastGames")) {
                        Game lastGame = new Game();
                        lastGame.setId(lastGameNode.get("id").asLong());
                        lastGame.setHomeTeam(lastGameNode.get("homeTeam").asText());
                        lastGame.setHomeTeamLogo(lastGameNode.get("homeTeamLogo").asText());
                        lastGame.setAwayTeam(lastGameNode.get("awayTeam").asText());
                        lastGame.setAwayTeamLogo(lastGameNode.get("awayTeamLogo").asText());
                        lastGame.setDate(lastGameNode.get("date").asText());
                        lastGame.setLeague(lastGameNode.get("league").asText());
                        lastGame.setScore(lastGameNode.get("score").asText());
                        lastGame.setResult(lastGameNode.get("result").asText());
                        lastGames.add(lastGame);
                    }
                    club.setLastGames(lastGames);
    
                    // Store the club in the map
                    clubsFromJson.put(club.getId(), club);
                    
                }
            }

            // Print all clubs after initialization
            clubsFromJson.values().forEach(System.out::println);
    
        } catch (IOException e) {
            System.err.println("Failed to load or parse clubs.json: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Unexpected error during initialization: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    @Override
    public List<Club> getAllClubs() {
        List<Club> clubsFromDb = clubRepository.findAll();

        for (Club club : clubsFromDb) {
            Club jsonClub = clubsFromJson.get(club.getId());
            if (jsonClub != null) {
                club.setNextGame(jsonClub.getNextGame());
                club.setLastGames(jsonClub.getLastGames());
            }
        }

        return clubsFromDb;
    }

    @Override
    public Club getClubById(Long id) {
        Optional<Club> clubFromDb = clubRepository.findById(id);

        if (clubFromDb.isPresent()) {
            Club club = clubFromDb.get();
            Club jsonClub = clubsFromJson.get(id);
            if (jsonClub != null) {
                club.setNextGame(jsonClub.getNextGame());
                club.setLastGames(jsonClub.getLastGames());
            }
            return club;
        }

        return null;
    }

    @Override
    public List<Club> getClubsByName(String name) {
        List<Club> matchingClubs = new ArrayList<>();
        for (Club club : getAllClubs()) {
            if (club.getName().equalsIgnoreCase(name)) {
                matchingClubs.add(club);
            }
        }
        return matchingClubs;
    }

    @Override
    public void starClub(Long clubId) {
        Optional<Club> club = clubRepository.findById(clubId);
        club.ifPresent(c -> {
            c.setStarred(true);
            clubRepository.save(c);
        });
    }

    @Override
    public List<Game> getLastGamesByClubId(Long clubId) {
        Club club = getClubById(clubId);
        return club != null ? club.getLastGames() : Collections.emptyList();
    }

    @Override
    public Optional<Game> getNextGameByClubId(Long clubId) {
        Club club = getClubById(clubId);
        return club != null ? Optional.ofNullable(club.getNextGame()) : Optional.empty();
    }
}
