package ies.gamsense.club_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import ies.gamsense.club_service.model.Club;
import ies.gamsense.club_service.repository.ClubRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ClubServiceImpl implements ClubService {

    // Temporarily using a JSON file to store player data for demonstration purposes
    @Value("classpath:mockdata/clubs.json")
    private Resource jsonClubs;

    private Map<Long, Club> clubs;

    @PostConstruct
    public void init() {
        this.clubs = new HashMap<>();

        ObjectMapper mapper = new ObjectMapper();
        List<Club> clubList = new ArrayList<>();

        try {
            clubList = mapper.readValue(jsonClubs.getInputStream(),
                    mapper.getTypeFactory().constructCollectionType(List.class, Club.class));
            clubList.forEach(player -> {
                this.clubs.put(player.getId(), player);
                clubRepository.save(player); // Save each club to the repository
            });
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(clubList);
    }

    @Autowired
    private ClubRepository clubRepository;

    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    public Optional<Club> getClubById(Long id) {
        return clubRepository.findById(id);
    }

    public List<Club> getClubsByName(String name) {
        return clubRepository.findByName(name);
    }

    public Club starClub(Long clubId) {
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new IllegalArgumentException("Club not found"));        
        if (!club.isStarred()) {
            club.setStarred(true);
            return clubRepository.save(club);
        }
        return club;
    }    
}
