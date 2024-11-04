package ies.gamesense.league_service.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class League {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "League name is mandatory")
    private String name;

    @OneToMany(mappedBy = "league", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LeagueStanding> standings;

    public League() {}

    public League(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public List<LeagueStanding> getStandings() { return standings; }

    public void setName(String name) { this.name = name; }
    public void setStandings(List<LeagueStanding> standings) { this.standings = standings; }

    @Override
    public String toString() {
        return "League [id=" + id + ", name=" + name + "]";
    }

    public void setId(long id) { this.id = id; }
}
