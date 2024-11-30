package ies.gamsense.club_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ies.gamsense.club_service.model.Club;
import ies.gamsense.club_service.service.ClubService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Optional;

@Tag(name = "Club Service API", description = "API for Club Service operations")
@RestController
@RequestMapping("/api/v1/clubs")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @Operation(summary = "Get all Clubs")
    @GetMapping("/")
    public List<Club> getAllClubs() {
        return clubService.getAllClubs();
    }

    @Operation(summary = "Get a Club by ID")
    @GetMapping("/{id}")
    public Optional<Club> getClubById(@Parameter(description = "ID of the club") @PathVariable Long id) {
        return clubService.getClubById(id);
    }

    @Operation(summary = "Search Clubs by Name")
    @GetMapping(params = "name")
    public List<Club> getClubsByName(@Parameter(description = "Name of the club") @RequestParam String name) {
        return clubService.getClubsByName(name);
    }

    @Operation(summary = "Star a Club")
    @PutMapping("/{id}/star")
    public Club starClub(@Parameter(description = "ID of the club you want to star") Long clubId) {
        return clubService.starClub(clubId);
    }
}
