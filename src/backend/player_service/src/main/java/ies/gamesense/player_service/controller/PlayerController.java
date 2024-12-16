package ies.gamesense.player_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ies.gamesense.player_service.model.Player;
import ies.gamesense.player_service.model.PlayerGameStats;
import ies.gamesense.player_service.model.Injury;
import ies.gamesense.player_service.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // Health check endpoint
    @Operation(summary = "Health check")
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("OK");
    }

    // Get all players
    @Operation(summary = "Get all players")
    @GetMapping("/")
    public ResponseEntity<List<Player>> getPlayers() {
        List<Player> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }

    // Get player by ID
    @Operation(summary = "Get player by id")
    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Long id) {
        try {
            Player player = playerService.getPlayerById(id);
            return ResponseEntity.ok(player);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Create a new player
    @Operation(summary = "Create a new player")
    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Player createdPlayer = playerService.createPlayer(player);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPlayer);
    }

    // Update a player by ID
    @Operation(summary = "Update a player")
    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        try {
            Player updatedPlayer = playerService.updatePlayer(id, player);
            return ResponseEntity.ok(updatedPlayer);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get players by club ID
    @Operation(summary = "Get players by club id")
    @GetMapping("/club/{clubId}")
    public ResponseEntity<List<Player>> getPlayersByClub(@PathVariable Long clubId) {
        List<Player> players = playerService.getPlayersByClub(clubId);
        if (players.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(players);
    }

    // Get player's statistics by game ID
    @Operation(summary = "Get statistic of a player by game id")
    @GetMapping("/{id}/statistics/{gameId}")
    public ResponseEntity<Optional<PlayerGameStats>> getPlayerStatisticsbyGameId(@PathVariable Long id, @PathVariable Long gameId) {
        Optional<PlayerGameStats> stats = playerService.getPlayerStatisticsbyGameId(id, gameId);
        if (stats.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(stats);
        }
        return ResponseEntity.ok(stats);
    }

    // Get player's statistics
    @Operation(summary = "Get statistics of a player")
    @GetMapping("/{id}/statistics")
    public ResponseEntity<List<PlayerGameStats>> getPlayerStatistics(@PathVariable Long id) {
        List<PlayerGameStats> stats = playerService.getPlayerStatistics(id);
        if (stats.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(stats);
    }

    // Get injuries by player ID
    @Operation(summary = "Get injuries by player id")
    @GetMapping("/{id}/injuries")
    public ResponseEntity<List<Injury>> getPlayerInjuries(@PathVariable Long id) {
        List<Injury> injuries = playerService.getPlayerInjuries(id);
        if (injuries.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(injuries);
    }

    // Search players by criteria
    @Operation(summary = "Search players")
    @GetMapping("/search")
    public ResponseEntity<List<Player>> searchPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) String surname, 
            @RequestParam(required = false) String position) {
        List<Player> players = playerService.searchPlayers(name, age, position, surname);
        if (players.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(players);
    }
}
