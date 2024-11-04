package ies.gamesense.league_service.entities;

public class LeagueStanding {
    private Club club;
    private int points;
    private int matchesPlayed;
    private int goalsScored;
    private int goalsConceded;

    // Getters, Setters, Constructors, and toString methods

    public LeagueStanding() {
    }

    public LeagueStanding(Club club, int points, int matchesPlayed, int goalsScored, int goalsConceded) {
        this.club = club;
        this.points = points;
        this.matchesPlayed = matchesPlayed;
        this.goalsScored = goalsScored;
        this.goalsConceded = goalsConceded;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getMatchesPlayed() {
        return matchesPlayed;
    }

    public void setMatchesPlayed(int matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
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

    @Override
    public String toString() {
        return "LeagueStanding [club=" + club + ", points=" + points + ", matchesPlayed=" + matchesPlayed + ", goalsScored=" + goalsScored + ", goalsConceded=" + goalsConceded + "]";
    }

}
