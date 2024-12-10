package ies.gamesense.live_game_service.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Match implements Serializable {

    @JsonProperty("match_id")
    private String matchId;

    @JsonProperty("home_team")
    private Team homeTeam;

    @JsonProperty("away_team")
    private Team awayTeam;

    @JsonProperty("match_start_time")
    private String matchStartTime;

    private Map<Integer, GameStatistics> gameStatistics = new java.util.HashMap<>();

    private List<Map<String, String>> events = new ArrayList<>();

    private String currentMvp;

    private List<String> topStats = new ArrayList<>();

    private String referee = "Unknown";

    private String stadium = "Unknown";

    private int minute = 0;

    // Getters and Setters
    public String getMatchId() {
        return matchId;
    }

    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

    public Team getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    public Team getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
    }

    public String getMatchStartTime() {
        return matchStartTime;
    }

    public void setMatchStartTime(String matchStartTime) {
        this.matchStartTime = matchStartTime;
    }

    public Map<Integer, GameStatistics> getGameStatistics() {
        return this.gameStatistics;
    }

    public void setGameStatistics(Map<Integer, GameStatistics> gameStatistics) {
        this.gameStatistics = gameStatistics;
    }

    public void addGameStatistics(int half, GameStatistics stats) {
        this.gameStatistics.put(half, stats);
    }

    public List<Map<String, String>> getEvents() {
        return events;
    }

    public void setEvents(List<Map<String, String>> events) {
        this.events = events;
    }

    public String getCurrentMvp() {
        return currentMvp;
    }

    public void setCurrentMvp(String currentMvp) {
        this.currentMvp = currentMvp;
    }

    public List<String> getTopStats() {
        return topStats;
    }

    public void setTopStats(List<String> topStats) {
        this.topStats = topStats;
    }

    public String getReferee() {
        return referee;
    }

    public void setReferee(String referee) {
        this.referee = referee;
    }

    public String getStadium() {
        return stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public int getMinute() {
        return minute;
    }

    public void setMinute(int minute) {
        this.minute = minute;
    }

    @Override
    public String toString() {
        return "Match{" +
                "matchId='" + matchId + '\'' +
                ", homeTeam=" + homeTeam +
                ", awayTeam=" + awayTeam +
                ", matchStartTime='" + matchStartTime + '\'' +
                '}';
    }
}
