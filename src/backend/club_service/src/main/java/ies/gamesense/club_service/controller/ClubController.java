package ies.gamesense.club_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ies.gamesense.club_service.model.Club;
import ies.gamesense.club_service.model.Game;
import ies.gamesense.club_service.service.ClubService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/club")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping("/")
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

    @GetMapping("/search") 
    @Operation(summary = "Search Clubs by Name")
    public ResponseEntity<List<Club>> searchClubsByName(@RequestParam String name) {
        List<Club> clubs = clubService.getClubsByName(name);
        return new ResponseEntity<>(clubs, HttpStatus.OK);
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
}
