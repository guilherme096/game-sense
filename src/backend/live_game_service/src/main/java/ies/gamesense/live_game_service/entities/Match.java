package ies.gamesense.live_game_service.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Match implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonProperty("match_id")
    private String matchId;

    @JsonProperty("home_team")
    private Team homeTeam;

    @JsonProperty("away_team")
    private Team awayTeam;

    @JsonProperty("match_start_time")
    private String matchStartTime;

    @JsonProperty("basic_info")
    private Map<String, String> basicInfo = new HashMap<>();

    private Map<Integer, GameStatistics> gameStatistics = new java.util.HashMap<>();

    private List<Map<String, String>> events = new ArrayList<>();

    private String currentMvp;

    private List<String> topStats = new ArrayList<>();

    private String referee = "Unknown";

    private String stadium = "Unknown";

    private int minute = 0;

    private boolean ended = false;

    public void endMatch() {
        this.ended = true;
    }

    public boolean isEnded() {
        return this.ended;
    }

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

    public void addGameStatistics(Integer half, GameStatistics stats) {
        System.out.println("Adding stats for half " + half + ": " + stats.toString());
        this.gameStatistics.put(half, stats);
        System.out.println("Game statistics updated: " + this.gameStatistics.toString());
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

    public Map<String, String> getBasicInfo() {
        if (basicInfo.isEmpty()) {
            basicInfo.put("match_id", this.matchId);
            basicInfo.put("home_team", this.homeTeam.getName());
            basicInfo.put("home_team_image", this.homeTeam.getImage());
            basicInfo.put("away_team_image", this.awayTeam.getImage());
            basicInfo.put("away_team", this.awayTeam.getName());
            basicInfo.put("match_start_time", this.matchStartTime);
            basicInfo.put("minute", Integer.toString(this.minute));
            basicInfo.put("home_team_id", this.homeTeam.getId());
            basicInfo.put("away_team_id", this.awayTeam.getId());
            basicInfo.put("referee", this.referee);
            basicInfo.put("stadium", this.stadium);
            basicInfo.put("currentMVP", this.currentMvp);
            basicInfo.put("kickoffTime", this.matchStartTime);

            return basicInfo;

        }
        return basicInfo;
    }

    public void setBasicInfo(Map<String, String> basicInfo) {
        this.basicInfo = basicInfo;
    }

    @Override
    public String toString() {
        return "Match{" +
                "matchId='" + matchId + '\'' +
                ", homeTeam=" + homeTeam +
                ", awayTeam=" + awayTeam +
                ", matchStartTime='" + matchStartTime + '\'' +
                ", gameStatistics=" + gameStatistics +

                '}';
    }

    public MatchDTO toDTO() {
        List<EventDTO> eventDTOS = new ArrayList<>();
        for (Map<String, String> event : this.events) {
            eventDTOS.add(
                    new EventDTO(event.get("type"), Integer.parseInt(event.get("minute")), event.get("playerName")));
        }
        return new MatchDTO(this.matchId, this.homeTeam.getId(), this.homeTeam.getName(), this.homeTeam.getImage(),
                this.homeTeam.getScore(), this.awayTeam.getId(), this.awayTeam.getName(), this.awayTeam.getImage(),
                this.matchStartTime, this.basicInfo, eventDTOS, this.currentMvp, this.topStats, this.referee,
                this.stadium, this.minute,
                this.ended);
    }

    public long stringToLongId(String input) {
        long result = 0;
        for (int i = 0; i < input.length(); i++) {
            result = result * 31 + input.charAt(i);
        }
        return Math.abs(result);
    }
}
