package ies.gamesense.player_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;
    
}
