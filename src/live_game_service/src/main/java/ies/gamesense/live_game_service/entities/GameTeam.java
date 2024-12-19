package ies.gamesense.live_game_service.entities;

public class GameTeam {

    private Long id;

    private String name;
    private int score;

    public GameTeam() {
    }

    public GameTeam(String name, int score) {
        this.name = name;
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

}
