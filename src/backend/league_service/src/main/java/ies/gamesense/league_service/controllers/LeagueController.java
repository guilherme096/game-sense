package ies.gamesense.league_service.controllers;

import ies.gamesense.league_service.entities.Club;
import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.LeagueStanding;
import ies.gamesense.league_service.services.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api/v1/league")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
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

    @GetMapping("/{id}/detailed-standings")
    public ResponseEntity<List<LeagueStanding>> getLeagueStandingsWithDetails(@PathVariable Long id) {
        List<LeagueStanding> standings = leagueService.getLeagueStandingsWithDetails(id);
        if (standings != null) {
            return new ResponseEntity<>(standings, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user/{userId}/favorite")
    public ResponseEntity<Club> getFavoriteTeam(@PathVariable Long userId) {
        Club favoriteTeam = leagueService.getFavoriteTeam(userId);
        if (favoriteTeam != null) {
            return new ResponseEntity<>(favoriteTeam, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/user/{userId}/favorite/{teamId}")
    public ResponseEntity<Void> setFavoriteTeam(@PathVariable Long userId, @PathVariable Long teamId) {
        leagueService.setFavoriteTeam(userId, teamId);
        return ResponseEntity.ok().build();
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
        List<LeagueStanding> standings = leagueService.getLeagueStandingsWithDetails(id);
        if (standings != null) {
            return new ResponseEntity<>(standings, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
