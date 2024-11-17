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
    private Integer minutePlayed;
    private GameStatistics gameStatistics;
    private String currentMVP;
    private List<String> topStats;
    private List<Map<String, String>> events;

    public Live() {
    }

    public Live(Long id, GameTeam homeTeam, GameTeam awayTeam, String referee, String kickoffTime, String stadium,
                Integer minutePlayed, GameStatistics gameStatistics, String currentMVP, List<String> topStats,
                List<Map<String, String>> events) {
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.referee = referee;
        this.kickoffTime = kickoffTime;
        this.stadium = stadium;
        this.minutePlayed = minutePlayed;
        this.gameStatistics = gameStatistics;
        this.currentMVP = currentMVP;
        this.topStats = topStats;
        this.events = events;
    }

    public Long getId() {
        return id;
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

    public Integer getMinutePlayed() {
        return minutePlayed;
    }

    public void setMinutePlayed(Integer minutePlayed) {
        this.minutePlayed = minutePlayed;
    }

    public GameStatistics getGameStatistics() {
        return gameStatistics;
    }

    public void setGameStatistics(GameStatistics gameStatistics) {
        this.gameStatistics = gameStatistics;
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

    public List<Map<String, String>> getEvents() {
        return events;
    }

    public void setEvents(List<Map<String, String>> events) {
        this.events = events;
    }

}
