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

    // idk about this one either; how to make connection between user and club?
    private boolean isStarred;

    public Club() {}

    public Club(String name, String country, String league) {
        this.name = name;
        this.country = country;
    }
    
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCountry() { return country; }
    public boolean isStarred() { return isStarred; }

    public void setName(String name) { this.name = name; }
    public void setCountry(String country) { this.country = country; }
    public void setStarred(boolean isStarred) { this.isStarred = isStarred; }

    @Override
    public String toString() {
        return "Club [id=" + id + ", name=" + name + ", country=" + country + "]";
    }
}
