package ies.gamesense.game_service.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "team_stats")
public class TeamStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_stat_id")
    private Long teamStatId;

    @Column(name = "club_id")
    private Long clubId;

    @Column(name = "possession")
    private int possession;

    @Column(name = "shots")
    private int shots;

    @Column(name = "passes_acc")
    private int passesAcc;

    @Column(name = "tackles")
    private int tackles;

    @Column(name = "fouls")
    private int fouls;

    @Column(name = "corners")
    private int corners;

    @Column(name = "offsides")
    private int offsides;

    @Column(name = "interceptions")
    private int interceptions;

    public TeamStats() {
    }
    
    public TeamStats(Long clubId, int possession, int shots, int passesAcc, int tackles, int fouls, int corners, int offsides, int interceptions) {
        this.clubId = clubId;
        this.possession = possession;
        this.shots = shots;
        this.passesAcc = passesAcc;
        this.tackles = tackles;
        this.fouls = fouls;
        this.corners = corners;
        this.offsides = offsides;
        this.interceptions = interceptions;
    }

    public Long getTeamStatId() {
        return teamStatId;
    }

    public void setTeamStatId(Long teamStatId) {
        this.teamStatId = teamStatId;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public int getPossession() {
        return possession;
    }

    public void setPossession(int possession) {
        this.possession = possession;
    }

    public int getShots() {
        return shots;
    }

    public void setShots(int shots) {
        this.shots = shots;
    }

    public int getPassesAcc() {
        return passesAcc;
    }

    public void setPassesAcc(int passesAcc) {
        this.passesAcc = passesAcc;
    }

    public int getTackles() {
        return tackles;
    }

    public void setTackles(int tackles) {
        this.tackles = tackles;
    }

    public int getFouls() {
        return fouls;
    }

    public void setFouls(int fouls) {
        this.fouls = fouls;
    }

    public int getCorners() {
        return corners;
    }

    public void setCorners(int corners) {
        this.corners = corners;
    }

    public int getOffsides() {
        return offsides;
    }

    public void setOffsides(int offsides) {
        this.offsides = offsides;
    }

    public int getInterceptions() {
        return interceptions;
    }

    public void setInterceptions(int interceptions) {
        this.interceptions = interceptions;
    }
}
