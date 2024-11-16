package ies.gamesense.live_game_service.entities;

import java.util.HashMap;
import java.util.Map;

public class GameStatistics {
    private Map<String, Integer> discreeteStats = new HashMap<>();
    private Map<String, Double> realStats = new HashMap<>();

    public GameStatistics() {
    }

    public GameStatistics(Map<String, Integer> discreeteStats, Map<String, Double> realStats) {
        this.discreeteStats = discreeteStats;
        this.realStats = realStats;
    }

    public void addDiscreeteStat(String key, Integer value) {
        discreeteStats.put(key, value);
    }

    public void addRealStat(String key, Double value) {
        realStats.put(key, value);
    }

    public Map<String, Integer> getDiscreeteStats() {
        return discreeteStats;
    }

    public Map<String, Double> getRealStats() {
        return realStats;
    }

    public void setDiscreeteStats(Map<String, Integer> discreeteStats) {
        this.discreeteStats = discreeteStats;
    }

    public void setRealStats(Map<String, Double> realStats) {
        this.realStats = realStats;
    }

    public Integer getDiscreeteStat(String key) {
        return discreeteStats.get(key);
    }

    public Double getRealStat(String key) {
        return realStats.get(key);
    }

    public void setDiscreeteStat(String key, Integer value) {
        discreeteStats.put(key, value);
    }

    public void setRealStat(String key, Double value) {
        realStats.put(key, value);
    }
}
