package ies.gamesense.league_service.entities;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "league")
public class League {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "logo", nullable = false)
    private String logo;

    @OneToMany(mappedBy = "league", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<League_Club> leagueClubs;

    public League() {
    }

    public League(String name, String logo) {
        this.name = name;
        this.logo = logo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Set<League_Club> getLeagueClubs() {
        return leagueClubs;
    }

    public void setLeagueClubs(Set<League_Club> leagueClubs) {
        this.leagueClubs = leagueClubs;
    }

    @Override
    public String toString() {
        return "League [id=" + id + ", name=" + name + ", logo=" + logo + "]";
    }
}
