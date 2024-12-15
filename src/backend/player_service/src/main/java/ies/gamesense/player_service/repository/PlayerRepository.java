package ies.gamesense.player_service.repository;

import ies.gamesense.player_service.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByClubId(Long clubId);

    @Query("SELECT p FROM Player p WHERE "
            + "(:name IS NULL OR p.name LIKE %:name%) AND "
            + "(:age IS NULL OR p.age = :age) AND "
            + "(:position IS NULL OR p.position LIKE %:position%)")
    List<Player> findPlayersByCriteria(@Param("name") String name,
                                       @Param("age") Integer age,
                                       @Param("position") String position);


}
