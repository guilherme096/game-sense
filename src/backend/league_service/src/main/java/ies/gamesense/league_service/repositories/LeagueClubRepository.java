package ies.gamesense.league_service.repositories;

import ies.gamesense.league_service.entities.League_Club;
import ies.gamesense.league_service.entities.LeagueClubId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LeagueClubRepository extends JpaRepository<League_Club, LeagueClubId> {

    // Corrected query: Referencing league.id instead of league_id
    @Query("SELECT l FROM League_Club l WHERE l.league.id = :league_id")
    List<League_Club> findByLeagueId(@Param("league_id") Long league_id);

    // Corrected query for club_id
    @Query("SELECT l FROM League_Club l WHERE l.club_id = :club_id")
    League_Club findByClubId(@Param("club_id") Long club_id);
}
