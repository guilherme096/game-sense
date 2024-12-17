package ies.gamesense.league_service.repositories;
import ies.gamesense.league_service.entities.League;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {
}
