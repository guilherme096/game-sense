package ies.gamesense.league_service.repositories;

import ies.gamesense.league_service.entities.Club;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository<Club, Long> {
}
