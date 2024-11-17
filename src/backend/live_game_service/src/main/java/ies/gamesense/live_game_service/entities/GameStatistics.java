package ies.gamesense.live_game_service.entities;

import java.util.Map;

public class GameStatistics {
    private Map<String, Map<String, Map<String, Integer>>> gameStatistics;

    public GameStatistics() {
    }

    public GameStatistics(Map<String, Map<String, Map<String, Integer>>> gameStatistics) {
        this.gameStatistics = gameStatistics;
    }

    public Map<String, Map<String, Map<String, Integer>>> getGameStatistics() {
        return gameStatistics;
    }

    public void setGameStatistics(Map<String, Map<String, Map<String, Integer>>> gameStatistics) {
        this.gameStatistics = gameStatistics;
    }
}
