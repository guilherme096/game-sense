package ies.gamesense.live_game_service.entities;

public class GameTeam {

    private Long id;

    private String name;
    private int score;
    private boolean stared;
    private String image;

    public GameTeam() {
    }

    public GameTeam(String name, int score, String image) {
        this.name = name;
        this.score = score;
        this.stared = false;
        this.image = "";
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

    public void setStared (boolean stared) {
        this.stared = stared;
    }

    public boolean getStared() {
        return stared;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }
}
