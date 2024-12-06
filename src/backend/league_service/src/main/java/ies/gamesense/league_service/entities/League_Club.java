package ies.gamesense.league_service.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@IdClass(LeagueClubId.class)
public class League_Club {

    @Id
    @ManyToOne
    @JoinColumn(name = "league_id", nullable = false)
    @JsonBackReference
    private League league;

    @Id
    @Column(name = "club_id", nullable = false)
    private int club_id;

    @Column(name = "matches_played", nullable = false)
    private int matchesPlayed;

    @Column(name = "wins", nullable = false)
    private int wins;

    @Column(name = "goals_scored", nullable = false)
    private int goalsScored;

    @Column(name = "goals_conceded", nullable = false)
    private int goalsConceded;

    @Column(name = "losses", nullable = false)
    private int losses;

    @Column(name = "goal_difference", nullable = false)
    private int goal_difference;

    @Column(name = "place", nullable = false)
    private int place;

    @Column(name = "points", nullable = false)
    private int points;

    @Column(name = "draws", nullable = false)
    private int draws;

    public League_Club() {
    }

    public League_Club(League league, int club_id, int matchesPlayed, int wins, int goalsScored, int goalsConceded, int losses, int goal_difference, int place, int points, int draws) {
        this.league = league;
        this.club_id = club_id;
        this.matchesPlayed = matchesPlayed;
        this.wins = wins;
        this.goalsScored = goalsScored;
        this.goalsConceded = goalsConceded;
        this.losses = losses;
        this.goal_difference = goal_difference;
        this.place = place;
        this.points = points;
        this.draws = draws;
    }


    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public int getClub_id() {
        return club_id;
    }

    public void setClub_id(int club_id) {
        this.club_id = club_id;
    }

    public int getMatchesPlayed() {
        return matchesPlayed;
    }

    public void setMatchesPlayed(int matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getGoalsScored() {
        return goalsScored;
    }

    public void setGoalsScored(int goalsScored) {
        this.goalsScored = goalsScored;
    }

    public int getGoalsConceded() {
        return goalsConceded;
    }

    public void setGoalsConceded(int goalsConceded) {
        this.goalsConceded = goalsConceded;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }

    public int getGoal_difference() {
        return goal_difference;
    }

    public void setGoal_difference(int goal_difference) {
        this.goal_difference = goal_difference;
    }

    public int getPlace() {
        return place;
    }

    public void setPlace(int place) {
        this.place = place;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getDraws() {
        return draws;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    @Override
    public String toString() {
        return "League_Club [club_id=" + club_id + ", league_id=" + league.getId() + ", matchesPlayed=" + matchesPlayed
                + ", wins=" + wins + ", goalsScored=" + goalsScored + ", goalsConceded=" + goalsConceded + ", losses="
                + losses + ", goal_difference=" + goal_difference + ", place=" + place + ", points=" + points
                + ", draws=" + draws + "]";
    }
}
