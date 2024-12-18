package ies.gamesense.club_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import ies.gamesense.club_service.model.Club;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    List<Club> findByNameIgnoreCase(String name);
}
