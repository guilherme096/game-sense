package ies.gamsense.club_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.gamsense.club_service.model.Club;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

    Club findByName(String name);
    
}
