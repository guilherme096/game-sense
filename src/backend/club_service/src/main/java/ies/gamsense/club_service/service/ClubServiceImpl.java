package ies.gamsense.club_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import ies.gamsense.club_service.model.Club;
import ies.gamsense.club_service.model.Players;
import ies.gamsense.club_service.model.Game;
import ies.gamsense.club_service.repository.ClubRepository;

import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Collections;

@Service
public class ClubServiceImpl implements ClubService {

    @Value("classpath:mockdata/clubs.json")
    private Resource jsonClubs;

    private Map<Long, Club> clubs;

    @Autowired
    private ClubRepository clubRepository;

    @PostConstruct
    public void init() {
        this.clubs = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();

        try {
            List<Club> clubList = mapper.readValue(
                jsonClubs.getInputStream(),
                mapper.getTypeFactory().constructCollectionType(List.class, Club.class)
            );

            clubList.forEach(club -> {
                this.clubs.put(club.getId(), club);
                clubRepository.save(club);
            });

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    @Override
    public Optional<Club> getClubById(Long id) {
        return clubRepository.findById(id);
    }

    @Override
    public List<Club> getClubsByName(String name) {
        return clubRepository.findByName(name);
    }

    @Override
    public Club starClub(Long clubId) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new IllegalArgumentException("Club not found"));
        if (!club.isStarred()) {
            club.setStarred(true);
            return clubRepository.save(club);
        }
        return club;
    }

    @Override
    public List<Players> getPlayersByClubId(Long clubId) {
        Club club = this.clubs.get(clubId);
        return club != null ? club.getPlayers() : Collections.emptyList();
    }

    @Override
    public List<Game> getLastGamesByClubId(Long clubId) {
        Club club = this.clubs.get(clubId);
        return club != null ? club.getLastGames() : Collections.emptyList();
    }

    @Override
    public Optional<Game> getNextGameByClubId(Long clubId) {
        Club club = this.clubs.get(clubId);
        return club != null ? Optional.ofNullable(club.getNextGame()) : Optional.empty();
    }
}
