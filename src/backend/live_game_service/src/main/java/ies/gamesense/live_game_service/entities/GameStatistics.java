package ies.gamesense.live_game_service.entities;

import java.util.Map;

public class GameStatistics {
    private Map<String, Map<String, Integer>> first_Half;

    public GameStatistics() {
    }

    public GameStatistics(Map<String,Map<String, Integer>> first_Half) {
        this.first_Half = first_Half;
    }


    public Map<String, Map<String, Integer>> getFirst_Half() {
        return first_Half;
    }

    public void setFirst_Half(Map<String,Map<String, Integer>> first_Half) {
        this.first_Half = first_Half;
    }
}
