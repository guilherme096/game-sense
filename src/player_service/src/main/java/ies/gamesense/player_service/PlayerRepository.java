package ies.gamesense.player_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    Iterable<Player> findByNameAndClub(String name, String club);
    Iterable<Player> findByName(String name);
    Iterable<Player> findByClub(String club);
}