package ies.gamesense.league_service.repositories;
import ies.gamesense.league_service.entities.League;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {
    @Query("SELECT l FROM League l WHERE l.id = :id")
    Optional<League> findByIdCustom(@Param("id") Long id);
}
