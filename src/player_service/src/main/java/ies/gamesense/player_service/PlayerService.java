package ies.gamesense.player_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    public Iterable<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public Player getPlayer(Long id) {
        return playerRepository.findById(id).orElse(null);
    }

    public Iterable<Player> searchPlayers(String name, String club) {
        if (name != null && club != null) {
            return playerRepository.findByNameAndClub(name, club);
        } else if (name != null) {
            return playerRepository.findByName(name);
        } else if (club != null) {
            return playerRepository.findByClub(club);
        } else {
            return playerRepository.findAll();
        }
    }
}
