package ies.gamesense.player_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/players")
    public Iterable<Player> getPlayers() {
        return playerService.getPlayers();
    }

    @GetMapping("/{id}")
    public Player getPlayer(@PathVariable Long id) {
        return playerService.getPlayer(id);
    }

    // GET /api/v1/player/search?name=John&club=Barcelona
    @GetMapping("/search")
    public Iterable<Player> searchPlayers(@RequestParam(required = false) String name, @RequestParam(required = false) String club) {
        return playerService.searchPlayers(name, club);
    }
}
