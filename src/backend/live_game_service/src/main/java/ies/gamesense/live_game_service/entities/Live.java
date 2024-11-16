package ies.gamesense.live_game_service.entities;

import java.util.List;
import java.util.Map;

public class Live {
    private Long id;

    private GameTeam homeTeam;
    private GameTeam awayTeam;
    private String referee;
    private String kickoffTime;
    private String stadium;
    private GameStatistics gameStatistics;
    private String currentMVP;
    private List<String> topStats;

    private List<Map<String, String>> events;

    public Live(GameTeam homeTeam, GameTeam awayTeam, GameStatistics gameStatistics, List<Map<String, String>> events,
            String referee, String kickoffTime, String stadium, String currentMVP, List<String> topStats) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.referee = referee;
        this.kickoffTime = kickoffTime;
        this.gameStatistics = gameStatistics;
        this.stadium = stadium;
        this.events = events;
        this.currentMVP = currentMVP;
        this.topStats = topStats;
    }

    public Live() {
    }

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

    public void setId(Long id) {
        this.id = id;
    }

    public GameTeam getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(GameTeam homeTeam) {
        this.homeTeam = homeTeam;
    }

    public GameTeam getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(GameTeam awayTeam) {
        this.awayTeam = awayTeam;
    }

    public GameStatistics getGameStatistics() {
        return gameStatistics;
    }

    public void setGameStatistics(GameStatistics gameStatistics) {
        this.gameStatistics = gameStatistics;
    }

    public List<Map<String, String>> getEvents() {
        return events;
    }

    public void setEvents(List<Map<String, String>> events) {
        this.events = events;
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

    public String getCurrentMVP() {
        return currentMVP;
    }

    public void setCurrentMVP(String currentMVP) {
        this.currentMVP = currentMVP;
    }

    public List<String> getTopStats() {
        return topStats;
    }

    public void setTopStats(List<String> topStats) {
        this.topStats = topStats;
    }
}
