package ies.gamesense.game_service.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "half")
public class Half {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "half_id")
    private Long halfId;

    @Column(name = "home_club_stats")
    private Long homeClubStatsId;

    @Column(name = "away_club_stats")
    private Long awayClubStatsId;

    public Half() {
    }

    public Half(Long homeClubStatsId, Long awayClubStatsId) {
        this.homeClubStatsId = homeClubStatsId;
        this.awayClubStatsId = awayClubStatsId;
    }

    public Long getHalfId() {
        return halfId;
    }

    public void setHalfId(Long halfId) {
        this.halfId = halfId;
    }

    public Long getHomeClubStatsId() {
        return homeClubStatsId;
    }

    public void setHomeClubStatsId(Long homeClubStatsId) {
        this.homeClubStatsId = homeClubStatsId;
    }
    
    public Long getAwayClubStatsId() {
        return awayClubStatsId;
    }

    public void setAwayClubStatsId(Long awayClubStatsId) {
        this.awayClubStatsId = awayClubStatsId;
    }
}
