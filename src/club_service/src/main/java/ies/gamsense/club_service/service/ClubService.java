package ies.gamsense.club_service.service;

import ies.gamsense.club_service.model.Club;

import java.util.List;
import java.util.Optional;


public interface ClubService {

    List<Club> getAllClubs();
    Optional<Club> getClubById(Long id);
    List<Club> getClubsByName(String name);
    Club starClub(Long id);
}