package ies.gamesense.league_service.entities;

public class LeagueStanding {
    private Club club;
    private int matchesPlayed;
    private int goalsScored;
    private int goalsConceded;
    private int wins;
    private int draws;
    private int losses;

    // Getters, Setters, Constructors, and toString methods

    public LeagueStanding() {
    }

    public LeagueStanding(Club club, int matchesPlayed, int goalsScored, int goalsConceded, int wins, int draws, int losses) {
        this.club = club;
        this.matchesPlayed = matchesPlayed;
        this.goalsScored = goalsScored;
        this.goalsConceded = goalsConceded;
        this.wins = wins;
        this.draws = draws;
        this.losses = losses;
    }

    public int getGoalDifference() {
        return goalsScored - goalsConceded;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getDraws() {
        return draws;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }


    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
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
        return "LeagueStanding [club=" + club + ", matchesPlayed=" + matchesPlayed + ", goalsScored=" + goalsScored + ", goalsConceded=" + goalsConceded + "]";
    }

}
