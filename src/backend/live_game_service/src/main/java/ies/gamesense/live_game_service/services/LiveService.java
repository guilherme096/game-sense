package ies.gamesense.live_game_service.services;

import java.util.List;
import java.util.Map;

import ies.gamesense.live_game_service.entities.GameStatistics;
import ies.gamesense.live_game_service.entities.Match;

public interface LiveService {

    List<Match> getLiveGames();

    Match getLiveById(String id);

    Map<Integer, GameStatistics> getGameStatistics(String id);

    boolean existsNewEvent(String id, Long lastEventId);

    List<Map<String, String>> getNewEvents(String id, Long lastEventId);

    String getCurrentMVP(String id);

    List<String> getTopStats(String id);

    Map<String, String> getBasicInfo(String id);
}
