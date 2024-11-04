package ies.gamesense.league_service.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Country is mandatory")
    private String country;

    private boolean isStarred;

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LeagueStanding> leagueStandings;

    public Club() {}

    public Club(String name, String country) {
        this.name = name;
        this.country = country;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCountry() { return country; }
    public boolean isStarred() { return isStarred; }
    public List<LeagueStanding> getLeagueStandings() { return leagueStandings; }

    public void setName(String name) { this.name = name; }
    public void setCountry(String country) { this.country = country; }
    public void setStarred(boolean isStarred) { this.isStarred = isStarred; }
    public void setLeagueStandings(List<LeagueStanding> leagueStandings) { this.leagueStandings = leagueStandings; }

    @Override
    public String toString() {
        return "Club [id=" + id + ", name=" + name + ", country=" + country + "]";
    }

    public void setId(long id) { this.id = id;
    }
}
