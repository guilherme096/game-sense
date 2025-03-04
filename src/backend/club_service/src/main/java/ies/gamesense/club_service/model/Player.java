package ies.gamesense.club_service.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Player {
    private Long id;
    private String name;
    private Boolean injured;

    @JsonProperty("injury_history")
    private List<Injury> injuries;

    public Player() {}

    public Player(Long id, String name, Boolean injured, List<Injury> injuries) {
        this.id = id;
        this.name = name;
        this.injured = injured;
        this.injuries = injuries;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getInjured() {
        return injured;
    }

    public void setInjured(Boolean injured) {
        this.injured = injured;
    }

    public List<Injury> getInjuries() {
        return injuries;
    }

    public void setInjuries(List<Injury> injuries) {
        this.injuries = injuries;
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", injured=" + injured +
                ", injuries=" + (injuries != null ? injuries.toString() : "[]") +
                '}';
    }

}