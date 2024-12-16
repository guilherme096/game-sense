package ies.gamesense.game_service.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "referee")
    private String referee;

    @Column(name = "kickoff_time")
    private String kickoffTime;

    @Column(name = "stadium")
    private String stadium;

    @Column(name = "home_club_id")
    private Long homeClubId;

    @Column(name = "away_club_id")
    private Long awayClubId;

    @Column(name = "first_half")
    private Long firstHalfId;

    @Column(name = "second_half")
    private Long secondHalfId;

    public Game() {
    }

    public Game(String referee, String kickoffTime, String stadium, Long homeClubId, Long awayClubId, Long firstHalfId, Long secondHalfId) {
        this.referee = referee;
        this.kickoffTime = kickoffTime;
        this.stadium = stadium;
        this.homeClubId = homeClubId;
        this.awayClubId = awayClubId;
        this.firstHalfId = firstHalfId;
        this.secondHalfId = secondHalfId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferee() {
        return referee;
    }

    public void setReferee(String referee) {
        this.referee = referee;
    }

    public String getKickoffTime() {
        return kickoffTime;
    }

    public void setKickoffTime(String kickoffTime) {
        this.kickoffTime = kickoffTime;
    }

    public String getStadium() {
        return stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public Long getHomeClubId() {
        return homeClubId;
    }

    public void setHomeClubId(Long homeClubId) {
        this.homeClubId = homeClubId;
    }
    
    public Long getAwayClubId() {
        return awayClubId;
    }

    public void setAwayClubId(Long awayClubId) {
        this.awayClubId = awayClubId;
    }

    public Long getFirstHalfId() {
        return firstHalfId;
    }
    
    public void setFirstHalfId(Long firstHalfId) {
        this.firstHalfId = firstHalfId;
    }

    public Long getSecondHalfId() {
        return secondHalfId;
    }

    public void setSecondHalfId(Long secondHalfId) {
        this.secondHalfId = secondHalfId;
    }
}
