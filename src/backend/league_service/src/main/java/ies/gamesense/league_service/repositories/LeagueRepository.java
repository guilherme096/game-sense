package ies.gamesense.league_service.repositories;
import ies.gamesense.league_service.entities.League;
import ies.gamesense.league_service.entities.League_Club;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueRepository extends JpaRepository<League, Integer> {
    League findByName(String name);
    boolean existsByName(String name);    
}
