package ies.gamesense.player_service.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import ies.gamesense.player_service.model.Player;
import jakarta.annotation.PostConstruct;

@Service
public class PlayerServiceImpl implements PlayerService {

    // Temporarily using a JSON file to store player data for demonstration purposes
    @Value("classpath:static/mock_players.json")
    private Resource jsonPlayers;

    private Map<Long, Player> players;

    @PostConstruct
    public void init() {
        this.players = new HashMap<>();

        ObjectMapper mapper = new ObjectMapper();
        List<Player> playerList = new ArrayList<>();

        // Parse the JSON file and populate the players map
        try {
            playerList = mapper.readValue(jsonPlayers.getInputStream(),
                    mapper.getTypeFactory().constructCollectionType(List.class, Player.class));
            playerList.forEach(player -> this.players.put(player.getId(), player));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Player> getAllPlayers() {
        return new ArrayList<>(players.values());
    }

    
    @Override
    public Player getPlayerById(Long id) {
        return this.players.get(id);
    }

    @Override
    public int getPlayerGoals(Long id) {
        Player player = this.getPlayerById(id);
        return (player != null) ? player.getGoals() : -1;
    }

    @Override
    public int getPlayerAssists(Long id) {
        Player player = this.getPlayerById(id);
        return (player != null) ? player.getAssists() : -1;
    }

    @Override
    public int getPlayerFouls(Long id) {
        Player player = this.getPlayerById(id);
        return (player != null) ? player.getFouls() : -1;
    }

    @Override
    public int getPlayerYellowCards(Long id) {
        Player player = this.getPlayerById(id);
        return (player != null) ? player.getYellowCards() : -1;
    }

    @Override
    public int getPlayerRedCards(Long id) {
        Player player = this.getPlayerById(id);
        return (player != null) ? player.getRedCards() : -1;
    }

    @Override
    public List<Player> searchPlayers(String name, Integer age, String club, String position, Integer goals,
            Integer assists, Integer fouls, Integer yellowCards, Integer redCards) {

        List<Player> filteredPlayers = new ArrayList<>();

        for (Player player : players.values()) {
            if ((name == null || player.getName().equals(name)) &&
                (age == null || player.getAge() == age) &&
                (club == null || player.getClub().equals(club)) &&
                (position == null || player.getPosition().equals(position)) &&
                (goals == null || player.getGoals() == goals) &&
                (assists == null || player.getAssists() == assists) &&
                (fouls == null || player.getFouls() == fouls) &&
                (yellowCards == null || player.getYellowCards() == yellowCards) &&
                (redCards == null || player.getRedCards() == redCards)) {

                filteredPlayers.add(player);
            }
        }

        return filteredPlayers;
    }
}
