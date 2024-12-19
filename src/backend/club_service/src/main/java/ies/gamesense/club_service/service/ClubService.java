
package ies.gamesense.club_service.service;

import ies.gamesense.club_service.model.Club;
import ies.gamesense.club_service.model.Player;
import ies.gamesense.club_service.model.Game;

import java.util.List;
import java.util.Optional;

public interface ClubService {
    List<Club> getAllClubs();
    Club getClubById(Long id);
    List<Club> getClubsByName(String name);
    List<Game> getLastGamesByClubId(Long clubId);
    Optional<Game> getNextGameByClubId(Long clubId);
}
