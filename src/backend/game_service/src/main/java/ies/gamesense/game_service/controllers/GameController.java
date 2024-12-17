package ies.gamesense.game_service.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.gamesense.game_service.entities.Game;
import ies.gamesense.game_service.entities.GameEvents;
import ies.gamesense.game_service.entities.MatchDTO;
import ies.gamesense.game_service.entities.TeamStats;
import ies.gamesense.game_service.services.GameService;
import io.swagger.v3.oas.annotations.Operation;

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
        if (games.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(games); // 200 OK
    }

    // Get game by id
    @Operation(summary = "Get game by id")
    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Optional<Game> game = Optional.ofNullable(gameService.getGameById(id));
        if (game.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // 404 Not Found
        }
        return ResponseEntity.ok(game.get()); // 200 OK
    }

    // Create game
    @Operation(summary = "Create game")
    @PostMapping("/")
    public ResponseEntity<Game> createGame(@RequestBody MatchDTO game) {
        System.out.println(game);
        Game newGame = gameService.matchAdapter(game);
        return ResponseEntity.ok(gameService.createGame(newGame));
    }

    // Get games by club
    @Operation(summary = "Get games by club")
    @GetMapping("/club/{id}")
    public ResponseEntity<List<Game>> getGamesByClub(@PathVariable Long id) {
        List<Game> games = gameService.getGamesByClub(id);
        if (games.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        }
        return ResponseEntity.ok(games); // 200 OK
    }

    // Get game first half stats
    @Operation(summary = "Get game first half stats")
    @GetMapping("/{id}/stats/first_half")
    public ResponseEntity<List<TeamStats>> getGameFirstHalfStats(@PathVariable Long id) {
        try {
            List<TeamStats> stats = gameService.getGameFirstHalfStats(id);
            if (stats.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }
            return ResponseEntity.ok(stats); // 200 OK
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // 404 Not Found
        }
    }

    // Get game second half stats
    @Operation(summary = "Get game second half stats")
    @GetMapping("/{id}/stats/second_half")
    public ResponseEntity<List<TeamStats>> getGameSecondHalfStats(@PathVariable Long id) {
        try {
            List<TeamStats> stats = gameService.getGameSecondHalfStats(id);
            if (stats.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
            }
            return ResponseEntity.ok(stats); // 200 OK
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // 404 Not Found
        }
    }

    // Get game events
    @Operation(summary = "Get game events")
    @GetMapping("/{id}/events")
    public ResponseEntity<List<GameEvents>> getGameEvents(@PathVariable Long id) {
        List<GameEvents> events = gameService.getGameEvents(id);
        if (events.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        }
        return ResponseEntity.ok(events); // 200 OK
    }
}
