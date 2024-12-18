package ies.gamesense.club_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ies.gamesense.club_service.model.Club;
import ies.gamesense.club_service.model.Game;
import ies.gamesense.club_service.model.Injury;
import ies.gamesense.club_service.model.Player;
import ies.gamesense.club_service.repository.ClubRepository;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Value("classpath:mockdata/clubs.json")
    private Resource jsonClubs; // Path to the mock clubs JSON file


    public ClubServiceImpl(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    @Override
    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    @Override
    public Club getClubById(Long id) {
        return clubRepository.findById(id).orElse(null);
    }

    @Override
    public List<Club> getClubsByName(String name) {
        return (List<Club>) clubRepository.findByName(name);
    }

    @Override
    public List<Game> getLastGamesByClubId(Long clubId) {
        Club club = getClubById(clubId);
        return club != null ? club.getLastGames() : Collections.emptyList();
    }

    @Override
    public Optional<Game> getNextGameByClubId(Long clubId) {
        Club club = getClubById(clubId);
        return club != null ? Optional.ofNullable(club.getNextGame()) : Optional.empty();
    }
}
