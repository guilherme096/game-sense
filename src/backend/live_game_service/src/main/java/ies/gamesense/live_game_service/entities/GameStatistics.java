package ies.gamesense.live_game_service.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class GameStatistics {

    @JsonProperty("first_half")
    private Map<String, Map<String, Integer>> firstHalf;

    @JsonProperty("second_half")
    private Map<String, Map<String, Integer>> secondHalf;

    @JsonProperty("overall")
    private Map<String, Map<String, Integer>> overall;

    public GameStatistics() {
    }

    public GameStatistics(Map<String, Map<String, Integer>> firstHalf, Map<String, Map<String, Integer>> secondHalf, Map<String, Map<String, Integer>> overall) {
        this.firstHalf = firstHalf;
        this.secondHalf = secondHalf;
        this.overall = overall;
    }

    public Map<String, Map<String, Integer>> getFirstHalf() {
        return firstHalf;
    }

    public void setFirstHalf(Map<String, Map<String, Integer>> firstHalf) {
        this.firstHalf = firstHalf;
    }

    public Map<String, Map<String, Integer>> getSecondHalf() {
        return secondHalf;
    }

    public void setSecondHalf(Map<String, Map<String, Integer>> secondHalf) {
        this.secondHalf = secondHalf;
    }

    public Map<String, Map<String, Integer>> getOverall() {
        return overall;
    }

    public void setOverall(Map<String, Map<String, Integer>> overall) {
        this.overall = overall;
    }
}
