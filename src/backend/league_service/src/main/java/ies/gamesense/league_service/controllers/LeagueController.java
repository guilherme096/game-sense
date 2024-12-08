package ies.gamesense.league_service.controllers;

import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.League_Club;
import ies.gamesense.league_service.services.LeagueService;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/league")
public class LeagueController {

    @Autowired
    private LeagueService leagueService;

    // Health check
    @Operation(summary = "Health check")
    @GetMapping("/health")
    public String healthCheck() {
        return "OK";
    }

    // Get all leagues
    @Operation(summary = "Get all leagues")
    @GetMapping("/")
    public ResponseEntity<List<League>> getAllLeagues() {
        try {
            List<League> leagues = leagueService.getAllLeagues();
            return new ResponseEntity<>(leagues, HttpStatus.OK);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get a league by ID
    @Operation(summary = "Get a league by ID")
    @GetMapping("/{id}")
    public ResponseEntity<League> getLeagueById(@PathVariable Long id) {
        try {
            League league = leagueService.getLeagueById(id);
            return new ResponseEntity<>(league, HttpStatus.OK);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get league_clubs by league ID
    @Operation(summary = "Get league_clubs by league ID")
    @GetMapping("/{id}/clubs")
    public ResponseEntity<List<League_Club>> getLeagueClubs(@PathVariable Long id) {
        try {
            List<League_Club> leagueClubs = leagueService.getLeagueStandings(id);
            return new ResponseEntity<>(leagueClubs, HttpStatus.OK);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create a new league
    @Operation(summary = "Create a new league")
    @PostMapping("/create")
    public ResponseEntity<League> createLeague(@RequestBody League league) {
        try {
            League createdLeague = leagueService.createLeague(league);
            return new ResponseEntity<>(createdLeague, HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Create a new league_club
    @Operation(summary = "Create a new league_club")
    @PostMapping("/{id}/clubs/create")
    public ResponseEntity<League_Club> createLeagueClub(@PathVariable Long id, @RequestBody League_Club leagueClub) {
        try {
            League_Club createdLeagueClub = leagueService.createLeagueClub(id, leagueClub);
            return new ResponseEntity<>(createdLeagueClub, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a league
    @Operation(summary = "Update a league")
    @PutMapping("/update")
    public ResponseEntity<League> updateLeague(@RequestBody League league) {
        try {
            League updatedLeague = leagueService.updateLeague(league);
            return new ResponseEntity<>(updatedLeague, HttpStatus.OK);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
