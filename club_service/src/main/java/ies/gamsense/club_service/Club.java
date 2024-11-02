package ies.gamsense.club_service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;
    
    @NotBlank(message = "Country is mandatory")
    private String country;

    // idk about this one; maybe put league id, not sure
    @NotBlank(message = "League is mandatory")
    private String league;

    public Club() {
    }

    public Club(String name, String country, String league) {
        this.name = name;
        this.country = country;
        this.league = league;
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

    public String getLeague() {
        return league;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setLeague(String league) {
        this.league = league;
    }

    @Override
    public String toString() {
        return "Club [id=" + id + ", name=" + name + ", country=" + country + ", league=" + league + "]";
    }
}
