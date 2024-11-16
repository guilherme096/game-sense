package ies.gamesense.player_service.model;

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

    @NotBlank(message = "Age is mandatory")
    private int age;

    @NotBlank(message = "Country is mandatory")
    private String country;

    private String club;
    private String position;
    private int goals;
    private int assists;
    private int fouls;
    private int yellowCards;
    private int redCards;

    public Player() {
    }

    public Player(String name, int age, String country, String club, String position, int goals, int assists, int fouls, int yellowCards, int redCards) {
        this.name = name;
        this.age = age;
        this.country = country;
        this.club = club;
        this.position = position;
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

    public int getAge() {
        return age;
    }

    public String getCountry() {
        return country;
    }

    public String getClub() {
        return club;
    }

    public String getPosition() {
        return position;
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

    public void setClub(String club) {
        this.club = club;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public void setPosition(String position) {
        this.position = position;
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
                ", age=" + age + '\'' +
                ", country='" + country + '\'' +
                ", club='" + club + '\'' +
                ", position='" + position + '\'' +
                ", goals=" + goals + '\'' +
                ", assists=" + assists + '\'' +
                ", fouls=" + fouls + '\'' +
                ", yellowCards=" + yellowCards + '\''+
                ", redCards=" + redCards +
                ']';
    }
}
