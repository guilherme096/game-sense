package ies.gamesense.live_game_service.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ies.gamesense.live_game_service.entities.GameStatistics;
import ies.gamesense.live_game_service.entities.Match;
import ies.gamesense.live_game_service.services.LiveService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1/live")
public class LiveController {

    @Autowired
    private LiveService liveService;

    @Operation(summary = "Get all live games")
    @GetMapping("/")
    public List<Match> getLiveGames() {
        return liveService.getLiveGames();

    }

    @Operation(summary = "Get live game by id")
    @GetMapping("/{id}")
    public ResponseEntity<Match> getLiveGame(@PathVariable("id") String id) {
        Match game = liveService.getLiveById(id);
        if (game == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(game);
    }

    @Operation(summary = "Get game statistics by game id")
    @GetMapping("/{id}/statistics")
    public ResponseEntity<GameStatistics> getGameStatistics(@PathVariable("id") String id) {
        GameStatistics stats = liveService.getGameStatistics(id);
        if (stats == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(stats);
    }

    @Operation(summary = "Get new events for live game")
    @GetMapping("/{id}/ping")
    public ResponseEntity<List<Map<String, String>>> getNewEvents(
            @PathVariable("id") String id,
            @RequestParam("lastEventId") long lastEventId) {
        List<Map<String, String>> events = liveService.getNewEvents(id, lastEventId);
        if (events == null || events.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(events);
    }

    @Operation(summary = "Get current MVP of the game")
    @GetMapping("/{id}/currentMVP")
    public ResponseEntity<String> getCurrentMVP(@PathVariable("id") String id) {
        String mvp = liveService.getCurrentMVP(id);
        if (mvp == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No MVP found.");
        }
        return ResponseEntity.ok(mvp);
    }

    @Operation(summary = "Get top stats of the game")
    @GetMapping("/{id}/topStats")
    public ResponseEntity<List<String>> getTopStats(@PathVariable("id") String id) {
        List<String> topStats = liveService.getTopStats(id);
        if (topStats == null || topStats.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(topStats);
    }
}
