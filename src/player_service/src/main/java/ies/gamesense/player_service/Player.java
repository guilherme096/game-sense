package ies.gamesense.player_service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Country is mandatory")
    private String country;

    private String club;
    private int goals;
    private int assists;
    private int fouls;
    private int yellowCards;
    private int redCards;

    public Player() {
    }

    public Player(String name, String country, String club, int goals, int assists, int fouls, int yellowCards, int redCards) {
        this.name = name;
        this.country = country;
        this.club = club;
        this.goals = goals;
        this.assists = assists;
        this.fouls = fouls;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public String getClub() {
        return club;
    }

    public int getGoals() {
        return goals;
    }

    public int getAssists() {
        return assists;
    }

    public int getFouls() {
        return fouls;
    }

    public int getYellowCards() {
        return yellowCards;
    }

    public int getRedCards() {
        return redCards;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setClub(String club) {
        this.club = club;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public void setFouls(int fouls) {
        this.fouls = fouls;
    }

    public void setYellowCards(int yellowCards) {
        this.yellowCards = yellowCards;
    }

    public void setRedCards(int redCards) {
        this.redCards = redCards;
    }

    @Override
    public String toString() {
        return "Player[" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", country='" + country + '\'' +
                ", club='" + club + '\'' +
                ", goals=" + goals + '\'' +
                ", assists=" + assists + '\'' +
                ", fouls=" + fouls + '\'' +
                ", yellowCards=" + yellowCards + '\''+
                ", redCards=" + redCards +
                ']';
    }
}
