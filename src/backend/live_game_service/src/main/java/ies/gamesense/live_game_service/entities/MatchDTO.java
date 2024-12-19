package ies.gamesense.live_game_service.entities;

import java.util.List;
import java.util.Map;

public class MatchDTO {
    private String matchId;
    private String homeTeamId;
    private String homeTeamName;
    private String homeTeamImage;
    private int homeTeamScore;
    private String awayTeamId;
    private String awayTeamName;
    private String awayTeamImage;
    private String matchStartTime;
    private Map<String, String> basicInfo;
    private List<EventDTO> events;
    private String currentMvp;
    private List<String> topStats;
    private String referee;
    private String stadium;
    private int minute;
    private boolean ended;

    public MatchDTO() {
    }

    public MatchDTO(String matchId, String homeTeamId, String homeTeamName, String homeTeamImage, int homeTeamScore,
            String awayTeamId, String awayTeamName, String awayTeamImage, String matchStartTime,
            Map<String, String> basicInfo, List<EventDTO> events, String currentMvp, List<String> topStats,
            String referee, String stadium, int minute, boolean ended) {
        this.matchId = matchId;
        this.homeTeamId = homeTeamId;
        this.homeTeamName = homeTeamName;
        this.homeTeamImage = homeTeamImage;
        this.homeTeamScore = homeTeamScore;
        this.awayTeamId = awayTeamId;
        this.awayTeamName = awayTeamName;
        this.awayTeamImage = awayTeamImage;
        this.matchStartTime = matchStartTime;
        this.basicInfo = basicInfo;
        this.events = events;
        this.currentMvp = currentMvp;
        this.topStats = topStats;
        this.referee = referee;
        this.stadium = stadium;
        this.minute = minute;
        this.ended = ended;
    }

    // Getters and setters

    public String getMatchId() {
        return matchId;
    }

    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

    public String getHomeTeamId() {
        return homeTeamId;
    }

    public void setHomeTeamId(String homeTeamId) {
        this.homeTeamId = homeTeamId;
    }

    public String getHomeTeamName() {
        return homeTeamName;
    }

    public void setHomeTeamName(String homeTeamName) {
        this.homeTeamName = homeTeamName;
    }

    public String getHomeTeamImage() {
        return homeTeamImage;
    }

    public void setHomeTeamImage(String homeTeamImage) {
        this.homeTeamImage = homeTeamImage;
    }

    public int getHomeTeamScore() {
        return homeTeamScore;
    }

    public void setHomeTeamScore(int homeTeamScore) {
        this.homeTeamScore = homeTeamScore;
    }

    public String getAwayTeamId() {
        return awayTeamId;
    }

    public void setAwayTeamId(String awayTeamId) {
        this.awayTeamId = awayTeamId;
    }

    public String getAwayTeamName() {
        return awayTeamName;
    }

    public void setAwayTeamName(String awayTeamName) {
        this.awayTeamName = awayTeamName;
    }

    public String getAwayTeamImage() {
        return awayTeamImage;
    }

    public void setAwayTeamImage(String awayTeamImage) {
        this.awayTeamImage = awayTeamImage;
    }

    public String getMatchStartTime() {
        return matchStartTime;
    }

    public void setMatchStartTime(String matchStartTime) {
        this.matchStartTime = matchStartTime;
    }

    public Map<String, String> getBasicInfo() {
        return basicInfo;
    }

    public void setBasicInfo(Map<String, String> basicInfo) {
        this.basicInfo = basicInfo;
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

    public boolean isEnded() {
        return ended;
    }

    public void setEnded(boolean ended) {
        this.ended = ended;
    }

    public List<EventDTO> getEvents() {
        return events;
    }

    public void setEvents(List<EventDTO> events) {
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

    @Override
    public String toString() {
        return "MatchDTO{" +
                "matchId='" + matchId + '\'' +
                ", homeTeamId='" + homeTeamId + '\'' +
                ", homeTeamName='" + homeTeamName + '\'' +
                ", homeTeamImage='" + homeTeamImage + '\'' +
                ", homeTeamScore=" + homeTeamScore +
                ", awayTeamId='" + awayTeamId + '\'' +
                ", awayTeamName='" + awayTeamName + '\'' +
                ", awayTeamImage='" + awayTeamImage + '\'' +
                ", matchStartTime='" + matchStartTime + '\'' +
                ", basicInfo=" + basicInfo +
                ", events=" + events +
                ", currentMvp=" + currentMvp +
                ", topStats=" + topStats +
                ", referee='" + referee + '\'' +
                ", stadium='" + stadium + '\'' +
                ", minute=" + minute +
                ", ended=" + ended +
                '}';
    }

}