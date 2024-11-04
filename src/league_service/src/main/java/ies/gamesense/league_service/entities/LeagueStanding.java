package ies.gamesense.league_service.entities;

import jakarta.persistence.*;

@Entity
public class LeagueStanding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "league_id", nullable = false)
    private League league;

    @ManyToOne
    @JoinColumn(name = "club_id", nullable = false)
    private Club club;

    private int points;
    private int matchesPlayed;
    private int goalsScored;
    private int goalsConceded;

    public LeagueStanding() {}

    public LeagueStanding(League league, Club club, int points, int matchesPlayed, int goalsScored, int goalsConceded) {
        this.league = league;
        this.club = club;
        this.points = points;
        this.matchesPlayed = matchesPlayed;
        this.goalsScored = goalsScored;
        this.goalsConceded = goalsConceded;
    }

    public Long getId() { return id; }
    public League getLeague() { return league; }
    public Club getClub() { return club; }
    public int getPoints() { return points; }
    public int getMatchesPlayed() { return matchesPlayed; }
    public int getGoalsScored() { return goalsScored; }
    public int getGoalsConceded() { return goalsConceded; }

    public void setLeague(League league) { this.league = league; }
    public void setClub(Club club) { this.club = club; }
    public void setPoints(int points) { this.points = points; }
    public void setMatchesPlayed(int matchesPlayed) { this.matchesPlayed = matchesPlayed; }
    public void setGoalsScored(int goalsScored) { this.goalsScored = goalsScored; }
    public void setGoalsConceded(int goalsConceded) { this.goalsConceded = goalsConceded; }

    @Override
    public String toString() {
        return "LeagueStanding [id=" + id + ", club=" + club.getName() + ", points=" + points + ", matchesPlayed=" + matchesPlayed
                + ", goalsScored=" + goalsScored + ", goalsConceded=" + goalsConceded + "]";
    }
}

