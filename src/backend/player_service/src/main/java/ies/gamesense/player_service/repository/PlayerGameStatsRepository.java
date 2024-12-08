package ies.gamesense.player_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ies.gamesense.player_service.model.PlayerGameStats;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.springframework.data.repository.query.Param;

@Repository
public interface PlayerGameStatsRepository extends JpaRepository<PlayerGameStats, Long> {
    @Query("SELECT pg FROM PlayerGameStats pg WHERE pg.player_id = :playerId AND pg.game_id = :gameId")
    Optional<PlayerGameStats> findByPlayerIdAndGameId(@Param("playerId") Long playerId, @Param("gameId") Long gameId);
} 