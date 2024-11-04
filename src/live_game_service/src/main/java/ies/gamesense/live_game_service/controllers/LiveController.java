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
import ies.gamesense.live_game_service.entities.Live;
import ies.gamesense.live_game_service.services.LiveService;
import io.swagger.v3.oas.annotations.Operation;

/**
 * LiveController
 */
@RestController
@RequestMapping("/api/v1/live")
public class LiveController {

    @Autowired
    private LiveService liveService;

    @Operation(summary = "Get live game by id")
    @GetMapping("/{id}")
    public ResponseEntity<Live> getLiveGame(@PathVariable("id") long id) {
        Live game = liveService.getLiveById(id);
        Boolean gameExists = game != null;
        return new ResponseEntity<>(game, gameExists ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Get game statistics by game id")
    @GetMapping("/{id}/statistics")
    public ResponseEntity<GameStatistics> getGameStatistics(@PathVariable("id") long id) {
        GameStatistics gameStatistics = liveService.getGameStatistics(id);
        Boolean gameStatisticsExists = gameStatistics != null;
        return new ResponseEntity<>(gameStatistics, gameStatisticsExists ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Get new events for live game")
    @GetMapping("/{id}/ping")
    public ResponseEntity<List<Map<String, String>>> ping(@PathVariable("id") long id,
            @RequestParam("lastEventId") long lastEventId) {
        List<Map<String, String>> response = null;
        if (liveService.existsNewEvent(id, lastEventId)) {
            response = liveService.getNewEvents(id, lastEventId);
        }
        return new ResponseEntity<>(response, response != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

}