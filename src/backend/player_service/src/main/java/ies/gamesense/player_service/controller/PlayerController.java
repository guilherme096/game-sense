package ies.gamesense.player_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ies.gamesense.player_service.model.Player;
import ies.gamesense.player_service.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // GET /api/v1/player
    @Operation(summary = "Get all players")
    @GetMapping
    public List<Player> getPlayers() {
        return playerService.getAllPlayers();
    }

    // GET /api/v1/player/{id}
    @Operation(summary = "Get player by id")
    @GetMapping("/{id}")
    public Player getPlayer(@PathVariable Long id) {
        return playerService.getPlayerById(id);
    }

    // GET /api/v1/player/{id}/{statistics}
    @Operation(summary = "Get statistic by player id")
    @GetMapping("/{id}/{statistics}")
    public Map<String, Object> getPlayerStatistics(@PathVariable Long id, @PathVariable String statistics) {
        Object result = playerService.getPlayerStatistics(id, statistics);
        Map<String, Object> response = new HashMap<>();
        response.put(statistics, result);
        return response;
    }

    // GET /api/v1/player/search
    @Operation(summary = "Search players")
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
