package ies.gamesense.live_game_service.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Team {

    @JsonProperty("name")
    private String name;

    @JsonProperty("id")
    private String id;

    @JsonProperty("starting_squad")
    private List<String> startingSquad;

    @JsonProperty("subs_squad")
    private List<String> subsSquad;

    private boolean stared;

    @JsonProperty("image")
    private String image;

    private int score;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getStartingSquad() {
        return startingSquad;
    }

    public void setStartingSquad(List<String> startingSquad) {
        this.startingSquad = startingSquad;
    }

    public List<String> getSubsSquad() {
        return subsSquad;
    }

    public void setSubsSquad(List<String> subsSquad) {
        this.subsSquad = subsSquad;
    }

    public boolean isStared() {
        return stared;
    }

    public void setStared(boolean stared) {
        this.stared = stared;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
