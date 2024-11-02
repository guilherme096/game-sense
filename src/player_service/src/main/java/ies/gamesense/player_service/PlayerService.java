package ies.gamesense.player_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;


    public Iterable<Player> getPlayers() {

        return playerRepository.findAll();
    }

    public Player getPlayer(Long id) {

            // mock data
            playerRepository.save(new Player("Antony", "Brazil", "Man. United", 20, 5, 3, 2, 1));
            
        return playerRepository.findById(id).orElse(null);
    }

    public int getPlayerGoals(Long id) {

        return playerRepository.findById(id).map(Player::getGoals).orElse(-1);
    }

    public int getPlayerAssists(Long id) {
        return playerRepository.findById(id).map(Player::getAssists).orElse(-1);
    }

    public int getPlayerFouls(Long id) {
        return playerRepository.findById(id).map(Player::getFouls).orElse(-1);
    }

    public int getPlayerYellowCards(Long id) {
        return playerRepository.findById(id).map(Player::getYellowCards).orElse(-1);
    }

    public int getPlayerRedCards(Long id) {
        return playerRepository.findById(id).map(Player::getRedCards).orElse(-1);
    }

    public Iterable<Player> searchPlayers(String name, String club, Integer goals, Integer assists, Integer fouls, Integer yellowCards, Integer redCards) {
        Specification<Player> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("name"), name));
        }
        if (club != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("club"), club));
        }
        if (goals != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("goals"), goals));
        }
        if (assists != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("assists"), assists));
        }
        if (fouls != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("fouls"), fouls));
        }
        if (yellowCards != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("yellowCards"), yellowCards));
        }
        if (redCards != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("redCards"), redCards));
        }

        return playerRepository.findAll(spec);
    }   
}
