package ies.gamesense.league_service.repositories;
import ies.gamesense.league_service.entities.League_Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LeagueClubRepository extends JpaRepository<League_Club, Integer> {
    @Query("SELECT lc FROM League_Club lc WHERE lc.league.id = :leagueId")
    List<League_Club> findByLeagueId(@Param("leagueId") Long leagueId);
}