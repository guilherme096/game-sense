package ies.gamesense.player_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ies.gamesense.player_service.model.Injury;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InjuryRepository extends JpaRepository<Injury, Long> {
    List<Injury> findByPlayerId(Long id);
}
