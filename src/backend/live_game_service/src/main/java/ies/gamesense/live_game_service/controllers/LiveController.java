package ies.gamesense.live_game_service.controllers;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

import org.apache.catalina.connector.Response;
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

    @Operation(summary = "Health check")
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("OK");
    }

    @Operation(summary = "Get all live games")
    @GetMapping("/")
    public List<Map<String, String>> getLiveGames() {
        List<Match> matches = liveService.getLiveGames();
        List<Map<String, String>> basicInfo = new ArrayList<>();

        for (Match match : matches) {
            basicInfo.add(liveService.getBasicInfo(match.getMatchId()));
        }

        return basicInfo;
    }

    @Operation(summary = "Get live game by id")
    @GetMapping("/{id}")
    public ResponseEntity<Match> getLiveGame(@PathVariable("id") String id) {
        Match game = liveService.getLiveById(id);
        if (game == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // return only the game without the events squad and stats
        return ResponseEntity.ok(game);
    }

    @Operation(summary = "Get game statistics by game id")
    @GetMapping("/{id}/statistics/ping")
    public ResponseEntity<Map<Integer, GameStatistics>> getGameStatistics(@PathVariable("id") String id,
            @RequestParam("lastHalf") Integer lastEventId) {
        Map<Integer, GameStatistics> stats = liveService.getGameStatistics(id);
        System.out.println("stats: " + stats);
        if (stats == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        if (lastEventId == null) {
            return ResponseEntity.badRequest().body(null);
        } else {
            GameStatistics lastStats = stats.get(lastEventId);
            if (lastStats == null) {
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
            }
            return ResponseEntity.ok(stats);
        }
    }

    @Operation(summary = "Get new events for live game")
    @GetMapping("/{id}/ping")
    public ResponseEntity<List<Map<String, String>>> getNewEvents(
            @PathVariable("id") String id,
            @RequestParam("lastEventId") long lastEventId) {
        List<Map<String, String>> events = liveService.getNewEvents(id, lastEventId);
        if (events == null || events.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
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

    @Operation(summary = "Get game basic info (score,teams,id,minute)")
    @GetMapping("/{id}/basicInfo")
    public ResponseEntity<Map<String, String>> getBasicInfo(@PathVariable("id") String id) {
        Map<String, String> basicInfo = liveService.getBasicInfo(id);
        if (basicInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(basicInfo);
    }

}
