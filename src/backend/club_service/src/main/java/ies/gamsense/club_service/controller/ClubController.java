package ies.gamsense.club_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ies.gamsense.club_service.model.Club;
import ies.gamsense.club_service.model.Players;
import ies.gamsense.club_service.model.Game;
import ies.gamsense.club_service.service.ClubService;

import io.swagger.v3.oas.annotations.Operation;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/clubs")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @GetMapping("/")
    @Operation(summary = "Get all Clubs")
    public List<Club> getAllClubs() {
        return clubService.getAllClubs();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a Club by ID")
    public Optional<Club> getClubById(@PathVariable Long id) {
        return clubService.getClubById(id);
    }

    @GetMapping(params = "name")
    @Operation(summary = "Search Clubs by Name")
    public List<Club> getClubsByName(@RequestParam String name) {
        return clubService.getClubsByName(name);
    }

    @PutMapping("/{id}/star")
    @Operation(summary = "Star a Club")
    public Club starClub(@PathVariable Long id) {
        return clubService.starClub(id);
    }

    @GetMapping("/{id}/players")
    @Operation(summary = "Get Players of a Club")
    public List<Players> getPlayersByClubId(@PathVariable Long id) {
        return clubService.getPlayersByClubId(id);
    }

    @GetMapping("/{id}/games/last")
    @Operation(summary = "Get Last Games of a Club")
    public List<Game> getLastGamesByClubId(@PathVariable Long id) {
        return clubService.getLastGamesByClubId(id);
    }

    @GetMapping("/{id}/games/next")
    @Operation(summary = "Get Next Game of a Club")
    public Optional<Game> getNextGameByClubId(@PathVariable Long id) {
        return clubService.getNextGameByClubId(id);
    }
}
