package ies.gamesense.league_service.controllers;

import ies.gamesense.league_service.entities.Club;
import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.LeagueStanding;
import ies.gamesense.league_service.services.LeagueService;
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

    // Get a league by ID
    @GetMapping("/{id}")
    public ResponseEntity<League> getLeagueById(@PathVariable Long id) {
        League league = leagueService.getLeagueById(id);
        if (league != null) {
            return new ResponseEntity<>(league, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Create a new league
    @PostMapping
    public ResponseEntity<League> createLeague(@RequestBody League league) {
        leagueService.createLeague(league);
        return new ResponseEntity<>(league, HttpStatus.CREATED);
    }

    // Update an existing league
    @PutMapping("/{id}")
    public ResponseEntity<League> updateLeague(@PathVariable Long id, @RequestBody League updatedLeague) {
        if (leagueService.existsLeague(id)) {
            updatedLeague.setId(id);
            leagueService.updateLeague(updatedLeague);
            return new ResponseEntity<>(updatedLeague, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a league by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeague(@PathVariable Long id) {
        if (leagueService.existsLeague(id)) {
            leagueService.deleteLeague(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get all clubs in a league
    @GetMapping("/{id}/clubs")
    public ResponseEntity<List<Club>> getAllClubs(@PathVariable Long id) {
        List<Club> clubs = leagueService.getAllClubs(id);
        if (clubs != null) {
            return new ResponseEntity<>(clubs, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Add a club to a league with standings information
    @PostMapping("/{id}/clubs")
    public ResponseEntity<Void> addClubToLeague(
            @PathVariable Long id,
            @RequestBody Club club,
            @RequestParam int points,
            @RequestParam int matchesPlayed,
            @RequestParam int goalsScored,
            @RequestParam int goalsConceded) {

        if (leagueService.existsLeague(id)) {
            leagueService.addClub(id, club, points, matchesPlayed, goalsScored, goalsConceded);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Remove a club from a league
    @DeleteMapping("/{id}/clubs/{clubId}")
    public ResponseEntity<Void> removeClubFromLeague(@PathVariable Long id, @PathVariable Long clubId) {
        if (leagueService.existsLeague(id)) {
            leagueService.removeClub(id, clubId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get league standings
    @GetMapping("/{id}/standings")
    public ResponseEntity<List<LeagueStanding>> getLeagueStandings(@PathVariable Long id) {
        List<LeagueStanding> standings = leagueService.getLeagueStandings(id);
        if (standings != null) {
            return new ResponseEntity<>(standings, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
