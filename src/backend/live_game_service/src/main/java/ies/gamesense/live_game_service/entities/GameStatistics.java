package ies.gamesense.live_game_service.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GameStatistics implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonProperty("home_team_stats")
    private Map<String, Double> homeTeamStats;
    @JsonProperty("away_team_stats")
    private Map<String, Double> awayTeamStats;

    @JsonProperty("half")
    private Integer half;

    @JsonProperty("match_id")
    private String matchId;

    public String getMatchId() {
        System.out.println("Getting stats Match ID: " + matchId);
        return matchId;
    }

    public Integer getHalf() {
        return half;
    }

    public void setHalf(Integer half) {
        this.half = half;
    }

    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

    public Map<String, Double> getHomeTeamStats() {
        return homeTeamStats;
    }

    public void setHomeTeamStats(Map<String, Double> homeTeamStats) {
        this.homeTeamStats = homeTeamStats;
    }

    public Map<String, Double> getAwayTeamStats() {
        return awayTeamStats;
    }

    public void setAwayTeamStats(Map<String, Double> awayTeamStats) {
        this.awayTeamStats = awayTeamStats;
    }

    @Override
    public String toString() {
        return "GameStatistics{" +
                "homeTeamStats=" + homeTeamStats +
                ", awayTeamStats=" + awayTeamStats +
                '}';
    }

    public GameStatistics(Map<String, Double> homeTeamStats,
            Map<String, Double> awayTeamStats) {
        this.homeTeamStats = homeTeamStats;
        this.awayTeamStats = awayTeamStats;
    }

    public GameStatistics() {
    }

    public void updateStats(Map<String, Double> homeTeamStats,
            Map<String, Double> awayTeamStats) {
        this.homeTeamStats = homeTeamStats;
        this.awayTeamStats = awayTeamStats;
    }

}
