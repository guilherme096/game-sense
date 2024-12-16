package ies.gamesense.game_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ies.gamesense.game_service.entities.GameEvents;

import java.util.List;

@Repository
public interface GameEventsRepository extends JpaRepository<GameEvents, Long> {  
    @Query("SELECT ge FROM GameEvents ge WHERE ge.game_id = ?1")
    public List<GameEvents> findByGame_id(Long id);
}

