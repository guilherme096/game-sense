package ies.gamesense.player_service.util;

import ies.gamesense.player_service.model.Player;
import java.lang.reflect.Method;

public class PlayerStatiscticHelper {

    public static Object getStatistic(Object player, String statistics) {
        try {
            String methodName = "get" + statistics.substring(0, 1).toUpperCase() + statistics.substring(1);
            Method method = Player.class.getMethod(methodName);
            return method.invoke(player);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid statistic: " + statistics);
        }
    }
    
}
