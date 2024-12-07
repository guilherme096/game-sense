package ies.gamesense.player_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ies.gamesense.player_service.model.PlayerGameStats;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerGameStatsRepository extends JpaRepository<PlayerGameStats, Long> {
    PlayerGameStats findByPlayerIdAndGameId(Long playerId, Long gameId);
} 