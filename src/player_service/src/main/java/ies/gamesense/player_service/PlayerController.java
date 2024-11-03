package ies.gamesense.player_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // GET /api/v1/player/players
    @GetMapping("/players")
    public Iterable<Player> getPlayers() {
        return playerService.getPlayers();
    }

    // GET /api/v1/player/1
    @GetMapping("/{id}")
    public Player getPlayer(@PathVariable Long id) {
        return playerService.getPlayer(id);
    }

    // GET /api/v1/player/1/goals
    @GetMapping("/{id}/goals")
    public int getPlayerGoals(@PathVariable Long id) {
        return playerService.getPlayerGoals(id);
    }

    // GET /api/v1/player/1/assists
    @GetMapping("/{id}/assists")
    public int getPlayerAssists(@PathVariable Long id) {
        return playerService.getPlayerAssists(id);
    }

    // GET /api/v1/player/1/fouls
    @GetMapping("/{id}/fouls")
    public int getPlayerFouls(@PathVariable Long id) {
        return playerService.getPlayerFouls(id);
    }

    // GET /api/v1/player/1/yellow-cards
    @GetMapping("/{id}/yellow-cards")
    public int getPlayerYellowCards(@PathVariable Long id) {
        return playerService.getPlayerYellowCards(id);
    }

    // GET /api/v1/player/1/red-cards
    @GetMapping("/{id}/red-cards")
    public int getPlayerRedCards(@PathVariable Long id) {
        return playerService.getPlayerRedCards(id);
    }

    // GET /api/v1/player/search?name=John&club=Barcelona&goals=10&assists=5&fouls=3&yellowCards=2&redCards=1
    @GetMapping("/search")
    public Iterable<Player> searchPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String club,
            @RequestParam(required = false) Integer goals,
            @RequestParam(required = false) Integer assists,
            @RequestParam(required = false) Integer fouls,
            @RequestParam(required = false) Integer yellowCards,
            @RequestParam(required = false) Integer redCards) {
        return playerService.searchPlayers(name, club, goals, assists, fouls, yellowCards, redCards);
    }
}
