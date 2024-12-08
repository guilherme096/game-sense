package ies.gamesense.league_service.repositories;
import ies.gamesense.league_service.entities.League_Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LeagueClubRepository extends JpaRepository<League_Club, Integer> {
    List<League_Club> findByLeagueId(Long leagueId);
}
