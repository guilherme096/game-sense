package ies.gamesense.league_service.entities;

import java.util.List;

public class League {
    private Long id;
    private String name;
    private List<LeagueStanding> standings;

    // Getters, Setters, Constructors, and toString methods
    public League() {
    }

    public League(String name, List<LeagueStanding> standings) {
        this.name = name;
        this.standings = standings;
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

    public List<LeagueStanding> getStandings() {
        return standings;
    }

    public void setStandings(List<LeagueStanding> standings) {
        this.standings = standings;
    }

    @Override
    public String toString() {
        return "League [id=" + id + ", name=" + name + ", standings=" + standings + "]";
    }
}
