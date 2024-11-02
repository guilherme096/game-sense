package ies.gamesense.live_game_service.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Live {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private GameTeam homeTeam;
    private GameTeam awayTeam;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    // in the future this should receive and event of type GameEvent -> Goal
    public void incrementTeamScore(int teamId) {
        if (homeTeam.getId() == teamId) {
            homeTeam.setScore(homeTeam.getScore() + 1);
        } else if (awayTeam.getId() == teamId) {
            awayTeam.setScore(awayTeam.getScore() + 1);
        }
    }

}
