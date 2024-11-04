package ies.gamesense.player_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ies.gamesense.player_service.model.Player;
import ies.gamesense.player_service.service.PlayerService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // GET /api/v1/player/players
    @GetMapping("/players")
    public List<Player> getPlayers() {
        return playerService.getAllPlayers();
    }

    // GET /api/v1/player/{id}
    @GetMapping("/{id}")
    public Player getPlayer(@PathVariable Long id) {
        return playerService.getPlayerById(id);
    }

    // GET /api/v1/player/{id}/goals
    @GetMapping("/{id}/goals")
    public int getPlayerGoals(@PathVariable Long id) {
        return playerService.getPlayerGoals(id);
    }

    // GET /api/v1/player/{id}/assists
    @GetMapping("/{id}/assists")
    public int getPlayerAssists(@PathVariable Long id) {
        return playerService.getPlayerAssists(id);
    }

    // GET /api/v1/player/{id}/fouls
    @GetMapping("/{id}/fouls")
    public int getPlayerFouls(@PathVariable Long id) {
        return playerService.getPlayerFouls(id);
    }

    // GET /api/v1/player/{id}/yellow-cards
    @GetMapping("/{id}/yellow-cards")
    public int getPlayerYellowCards(@PathVariable Long id) {
        return playerService.getPlayerYellowCards(id);
    }

    // GET /api/v1/player/{id}/red-cards
    @GetMapping("/{id}/red-cards")
    public int getPlayerRedCards(@PathVariable Long id) {
        return playerService.getPlayerRedCards(id);
    }

    // GET /api/v1/player/search
    @GetMapping("/search")
    public List<Player> searchPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) String club,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) Integer goals,
            @RequestParam(required = false) Integer assists,
            @RequestParam(required = false) Integer fouls,
            @RequestParam(required = false) Integer yellowCards,
            @RequestParam(required = false) Integer redCards) {
        return playerService.searchPlayers(name, age, club, position, goals, assists, fouls, yellowCards, redCards);
    }
}
