package ies.gamesense.player_service.repository;

import ies.gamesense.player_service.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByClubId(Long clubId);
    List<Player> findPlayersByCriteria(String name, Integer age, String club, String position);
}
