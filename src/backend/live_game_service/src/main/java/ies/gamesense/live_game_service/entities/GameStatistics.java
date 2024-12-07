package ies.gamesense.live_game_service.entities;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GameStatistics {
    @JsonProperty("home_team_stats")
    private Map<String, Object> homeTeamStats;
    @JsonProperty("away_team_stats")
    private Map<String, Object> awayTeamStats;

    @JsonProperty("game_id")
    private String matchId;

    public String getMatchId() {
        return matchId;
    }

    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

    public Map<String, Object> getHomeTeamStats() {
        return homeTeamStats;
    }

    public void setHomeTeamStats(Map<String, Object> homeTeamStats) {
        this.homeTeamStats = homeTeamStats;
    }

    public Map<String, Object> getAwayTeamStats() {
        return awayTeamStats;
    }

    public void setAwayTeamStats(Map<String, Object> awayTeamStats) {
        this.awayTeamStats = awayTeamStats;
    }

    @Override
    public String toString() {
        return "GameStatistics{" +
                "homeTeamStats=" + homeTeamStats +
                ", awayTeamStats=" + awayTeamStats +
                '}';
    }

    public GameStatistics(Map<String, Object> homeTeamStats, Map<String, Object> awayTeamStats) {
        this.homeTeamStats = homeTeamStats;
        this.awayTeamStats = awayTeamStats;
    }

    public GameStatistics() {
    }

    public void updateStats(Map<String, Object> homeTeamStats, Map<String, Object> awayTeamStats) {
        this.homeTeamStats = homeTeamStats;
        this.awayTeamStats = awayTeamStats;
    }

}
