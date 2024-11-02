package ies.gamesense.live_game_service.entities;

public class GameTeam {
    private final String name;
    private final int id;
    private int score;

    public GameTeam(String name, int id, int score) {
        this.name = name;
        this.id = id;
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

}
