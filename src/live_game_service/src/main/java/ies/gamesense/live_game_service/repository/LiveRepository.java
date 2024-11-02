package ies.gamesense.live_game_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.gamesense.live_game_service.entities.Live;

@Repository
public interface LiveRepository extends JpaRepository<Live, Long> {
}