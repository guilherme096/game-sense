package ies.gamesense.player_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Optional;

import ies.gamesense.player_service.model.Player;
import ies.gamesense.player_service.model.PlayerGameStats;
import ies.gamesense.player_service.model.Injury;

import ies.gamesense.player_service.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // GET /api/v1/player/health
    @Operation(summary = "Health check")
    @GetMapping("/health")
    public String healthCheck() {
        return "OK";
    }

    // GET /api/v1/player
    @Operation(summary = "Get all players")
    @GetMapping("/")
    public List<Player> getPlayers() {
        return playerService.getAllPlayers();
    }

    // GET /api/v1/player/{id}
    @Operation(summary = "Get player by id")
    @GetMapping("/{id}")
    public Player getPlayer(@PathVariable Long id) {
        return playerService.getPlayerById(id);
    }

    // POST /api/v1/player
    @Operation(summary = "Create a new player")
    @PostMapping
    public Player createPlayer(@RequestBody Player player) {
        return playerService.createPlayer(player);
    }

    // PUT /api/v1/player/{id}
    @Operation(summary = "Update a player")
    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        return playerService.updatePlayer(id, player);
    }

    // GET /api/v1/player/{clubId}
    @Operation(summary = "Get players by club id")
    @GetMapping("/{clubId}")
    public List<Player> getPlayersByClub(@PathVariable Long clubId) {
        return playerService.getPlayersByClub(clubId);
    }

    // GET /api/v1/player/{id}/statistics/{gameId}
    @Operation(summary = "Get statistic of a player by game id")
    @GetMapping("/{id}/statistics/{gameId}")
    public Optional<PlayerGameStats> getPlayerStatisticsbyGameId(@PathVariable Long id, @PathVariable Long gameId) {
        return playerService.getPlayerStatisticsbyGameId(id, gameId);
    }

    // GET /api/v1/player/{id}/injuries
    @Operation(summary = "Get injuries by player id")
    @GetMapping("/{id}/injuries")
    public List<Injury> getPlayerInjuries(@PathVariable Long id) {
        return playerService.getPlayerInjuries(id);
    }

    // GET /api/v1/player/search
    @Operation(summary = "Search players")
    @GetMapping("/search")
    public List<Player> searchPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) String position) {
        return playerService.searchPlayers(name, age, position);
    }
}
