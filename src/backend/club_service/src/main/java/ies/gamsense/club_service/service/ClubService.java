package ies.gamsense.club_service.service;

import ies.gamsense.club_service.model.Club;
import ies.gamsense.club_service.model.Player;
import ies.gamsense.club_service.model.Game;

import java.util.List;
import java.util.Optional;

public interface ClubService {
    List<Club> getAllClubs();
    Club getClubById(Long id);
    List<Club> getClubsByName(String name);
    void starClub(Long id);
    List<Player> getPlayersByClubId(Long clubId);
    List<Game> getLastGamesByClubId(Long clubId);
    Optional<Game> getNextGameByClubId(Long clubId);
}
