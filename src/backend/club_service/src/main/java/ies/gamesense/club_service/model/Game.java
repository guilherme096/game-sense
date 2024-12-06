package ies.gamesense.club_service.model;

public class Game {
    private Long id;
    private String homeTeam;
    private String homeTeamLogo;
    private String awayTeam;
    private String awayTeamLogo;
    private String date;
    private String league;
    private String score;
    private String result;

    // Default constructor
    public Game() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(String homeTeam) {
        this.homeTeam = homeTeam;
    }

    public String getHomeTeamLogo() {
        return homeTeamLogo;
    }

    public void setHomeTeamLogo(String homeTeamLogo) {
        this.homeTeamLogo = homeTeamLogo;
    }

    public String getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(String awayTeam) {
        this.awayTeam = awayTeam;
    }

    public String getAwayTeamLogo() {
        return awayTeamLogo;
    }

    public void setAwayTeamLogo(String awayTeamLogo) {
        this.awayTeamLogo = awayTeamLogo;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getLeague() {
        return league;
    }

    public void setLeague(String league) {
        this.league = league;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "Game{" +
                "id=" + id +
                ", homeTeam='" + homeTeam + '\'' +
                ", homeTeamLogo='" + homeTeamLogo + '\'' +
                ", awayTeam='" + awayTeam + '\'' +
                ", awayTeamLogo='" + awayTeamLogo + '\'' +
                ", date='" + date + '\'' +
                ", league='" + league + '\'' +
                ", score='" + score + '\'' +
                ", result='" + result + '\'' +
                '}';
    }

}