package ies.gamesense.league_service.repositories;

import ies.gamesense.league_service.entities.LeagueStanding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface LeagueStandingRepository extends JpaRepository<LeagueStanding, Long> {
    List<LeagueStanding> findByLeagueId(Long leagueId);
    void deleteByLeagueIdAndClubId(Long leagueId, Long clubId);
}