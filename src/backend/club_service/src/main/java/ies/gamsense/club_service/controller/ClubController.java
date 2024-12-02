package ies.gamsense.club_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ies.gamsense.club_service.model.Club;
import ies.gamsense.club_service.model.Player;
import ies.gamsense.club_service.model.Game;
import ies.gamsense.club_service.service.ClubService;

import io.swagger.v3.oas.annotations.Operation;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/club")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @GetMapping
    @Operation(summary = "Get all Clubs")
    public ResponseEntity<List<Club>> getAllClubs() {
        List<Club> clubs = clubService.getAllClubs();
        if (clubs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(clubs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a Club by ID")
    public ResponseEntity<Club> getClubById(@PathVariable Long id) {
        Club club = clubService.getClubById(id);
        if (club != null) {
            return new ResponseEntity<>(club, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(params = "name")
    @Operation(summary = "Search Clubs by Name")
    public ResponseEntity<List<Club>> getClubsByName(@RequestParam String name) {
        List<Club> clubs = clubService.getClubsByName(name);
        if (clubs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(clubs, HttpStatus.OK);
    }

    @PutMapping("/{id}/star")
    @Operation(summary = "Star a Club")
    public ResponseEntity<Void> starClub(@PathVariable Long id) {
        Club club = clubService.getClubById(id);
        if (club != null) {
            clubService.starClub(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}/players")
    @Operation(summary = "Get Players of a Club")
    public ResponseEntity<List<Player>> getPlayersByClubId(@PathVariable Long id) {
        List<Player> players = clubService.getPlayersByClubId(id);
        if (players.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @GetMapping("/{id}/games/last")
    @Operation(summary = "Get Last Games of a Club")
    public ResponseEntity<List<Game>> getLastGamesByClubId(@PathVariable Long id) {
        List<Game> games = clubService.getLastGamesByClubId(id);
        if (games.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @GetMapping("/{id}/games/next")
    @Operation(summary = "Get Next Game of a Club")
    public ResponseEntity<Game> getNextGameByClubId(@PathVariable Long id) {
        Optional<Game> game = clubService.getNextGameByClubId(id);
        return game.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/hello")
    @Operation(summary = "Hello endpoint for testing")
    public ResponseEntity<String> hello() {
        return new ResponseEntity<>("Hello from Club Service!", HttpStatus.OK);
    }
}
