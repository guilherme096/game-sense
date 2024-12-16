package ies.gamesense.game_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.gamesense.game_service.entities.TeamStats;

@Repository
public interface TeamStatsRepository extends JpaRepository<TeamStats, Long> {   
    
}
