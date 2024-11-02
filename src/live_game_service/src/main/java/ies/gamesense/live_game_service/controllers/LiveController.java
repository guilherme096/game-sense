package ies.gamesense.live_game_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.gamesense.live_game_service.entities.Live;
import ies.gamesense.live_game_service.services.LiveService;

/**
 * LiveController
 */
@RestController
@RequestMapping("/api/v1/live")
public class LiveController {
    
    @Autowired
    private LiveService liveService;


    @GetMapping("/{id}")
    public ResponseEntity<Live> getLiveGame(@PathVariable("id") long id) {
        Live game = liveService.getLiveById(id);
        Boolean gameExists = game != null;
        return new ResponseEntity<>(game, gameExists ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

}