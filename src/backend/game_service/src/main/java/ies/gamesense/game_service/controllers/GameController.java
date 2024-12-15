package ies.gamesense.game_service.controllers;

import org.springframework.web.bind.annotation.RestController;

import ies.gamesense.game_service.services.GameService;
import io.swagger.v3.oas.annotations.Operation;
import ies.gamesense.game_service.entities.Game;
import ies.gamesense.game_service.entities.TeamStats;
import ies.gamesense.game_service.entities.GameEvents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/v1/game")
public class GameController {
    
    @Autowired
    private GameService gameService;

    // Health check endpoint
    @Operation(summary = "Health check")
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("OK");
    }

    // Get all games
    @Operation(summary = "Get all games")
    @GetMapping("/")
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> games = gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    // Get game by id
    @Operation(summary = "Get game by id")
    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Game game = gameService.getGameById(id);
        return ResponseEntity.ok(game);
    }

    // Create game
    @Operation(summary = "Create game")
    @PostMapping("/")
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        Game newGame = gameService.createGame(game);
        return ResponseEntity.ok(newGame);
    }

    // Get games by club
    @Operation(summary = "Get games by club")
    @GetMapping("/club/{id}")
    public ResponseEntity<List<Game>> getGamesByClub(@PathVariable Long id) {
        List<Game> games = gameService.getGamesByClub(id);
        return ResponseEntity.ok(games);
    }

    // Get game first half stats
    @Operation(summary = "Get game first half stats")
    @GetMapping("{id}/stats/first_half")
    public ResponseEntity<List<TeamStats>> getGameFirstHalfStats(@PathVariable Long id) {
        List<TeamStats> stats = gameService.getGameFirstHalfStats(id);
        return ResponseEntity.ok(stats);
    }

    // Get game second half stats
    @Operation(summary = "Get game second half stats")
    @GetMapping("{id}/stats/second_half")
    public ResponseEntity<List<TeamStats>> getGameSecondHalfStats(@PathVariable Long id) {
        List<TeamStats> stats = gameService.getGameSecondHalfStats(id);
        return ResponseEntity.ok(stats);
    }

    // Get game events
    @Operation(summary = "Get game events")
    @GetMapping("{id}/events")
    public ResponseEntity<List<GameEvents>> getGameEvents(@PathVariable Long id) {
        return ResponseEntity.ok(gameService.getGameEvents(id));
    }
}
