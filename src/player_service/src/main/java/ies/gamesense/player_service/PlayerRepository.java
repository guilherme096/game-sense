package ies.gamesense.player_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>, JpaSpecificationExecutor<Player>{
    Iterable<Player> findByNameAndClub(String name, String club);
    Iterable<Player> findByName(String name);
    Iterable<Player> findByClub(String club);
    Iterable<Player> findByGoals(int goals);
    Iterable<Player> findByAssists(int assists);
    Iterable<Player> findByFouls(int fouls);
    Iterable<Player> findByYellowCards(int yellowCards);
    Iterable<Player> findByRedCards(int redCards);
}