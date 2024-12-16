package ies.gamesense.game_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.gamesense.game_service.entities.Half;

@Repository
public interface HalfRepository extends JpaRepository<Half, Long> {   
    
}
