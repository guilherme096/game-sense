package ies.gamesense.league_service.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.League_Club;
import ies.gamesense.league_service.services.LeagueService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1/league")
public class LeagueController {

    @Autowired
    private LeagueService leagueService;

    // Get a league by ID
    @Operation(summary = "Get a league by ID")
    @GetMapping("/{id}")
    public ResponseEntity<League> getLeagueById(@PathVariable int id) {
        League league = leagueService.getLeagueById(id);
        if (league != null) {
            return new ResponseEntity<>(league, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get league_clubs by league ID
    @Operation(summary = "Get league_clubs by league ID")
    @GetMapping("/{id}/clubs")
    public ResponseEntity<List<League_Club>> getLeagueClubs(@PathVariable int id) {
        List<League_Club> leagueClubs = leagueService.getLeagueStandings(id);
        return new ResponseEntity<>(leagueClubs, HttpStatus.OK);
    }

    // Create a new league
    @Operation(summary = "Create a new league")
    @PostMapping("/create")
    public ResponseEntity<League> createLeague(@RequestBody League league) {
        League createdLeague = leagueService.createLeague(league);
        return new ResponseEntity<>(createdLeague, HttpStatus.CREATED);
    }

    // Create a new league_club
    @Operation(summary = "Create a new league_club")
    @PostMapping("/{id}/clubs/create")
    public ResponseEntity<League_Club> createLeagueClub(@PathVariable int id, @RequestBody League_Club leagueClub) {
        League_Club createdLeagueClub = leagueService.createLeagueClub(id, leagueClub);
        return new ResponseEntity<>(createdLeagueClub, HttpStatus.CREATED);
    }

    // Update a league
    @Operation(summary = "Update a league")
    @PutMapping("/update")
    public ResponseEntity<League> updateLeague(@RequestBody League league) {
        League updatedLeague = leagueService.updateLeague(league);
        return new ResponseEntity<>(updatedLeague, HttpStatus.OK);
    }
}
