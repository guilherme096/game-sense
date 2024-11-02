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

    private String homeName;
    private String awayName;
    private int homeScore;
    private int awayScore;
    private int time;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getHomeName() {
        return homeName;
    }

    public void setHomeName(String homeName) {
        this.homeName = homeName;
    }

    public String getAwayName() {
        return awayName;
    }

    public void setAwayName(String awayName) {
        this.awayName = awayName;
    }

    public int getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(int homeScore) {
        this.homeScore = homeScore;
    }

    public int getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(int awayScore) {
        this.awayScore = awayScore;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    // toString
    @Override
    public String toString() {
        return "Live [awayName=" + awayName + ", awayScore=" + awayScore + ", homeName=" + homeName + ", homeScore="
                + homeScore + ", id=" + id + ", time=" + time + "]";
    }
}
