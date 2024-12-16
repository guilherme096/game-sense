package ies.gamesense.game_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ies.gamesense.game_service.entities.Game;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {  
    @Query("SELECT g FROM Game g WHERE g.homeClubId = ?1 or g.awayClubId = ?1")
    public List<Game> findByClubId(Long id);
}
