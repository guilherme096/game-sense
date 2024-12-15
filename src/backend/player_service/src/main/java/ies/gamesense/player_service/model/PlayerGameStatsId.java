package ies.gamesense.player_service.model;

import java.io.Serializable;

public class PlayerGameStatsId implements Serializable {
    private long player;
    private long game_id ;

    public PlayerGameStatsId() {}

    public PlayerGameStatsId(long player, long game_id) {
        this.player = player;
        this.game_id = game_id;
    }

    // Getters, setters, equals, and hashCode methods
    public long getPlayer() {
        return player;
    }

    public void setPlayer(long player) {
        this.player = player;
    }

    public long getGame_id() {
        return game_id;
    }

    public void setGame_id(long game_id) {
        this.game_id = game_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlayerGameStatsId that = (PlayerGameStatsId) o;
        return player == that.player && game_id == that.game_id;
    }

    @Override
    public int hashCode() {
        return Long.hashCode(player) + Long.hashCode(game_id);
    }
}
