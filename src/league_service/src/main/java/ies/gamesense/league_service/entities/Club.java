package ies.gamesense.league_service.entities;

public class Club {
    private Long id;
    private String name;
    private String country;
    private boolean starred;

    // Getters, Setters, Constructors, and toString methods

    public Club() {
    }

    public Club(String name, String country, boolean starred) {
        this.name = name;
        this.country = country;
        this.starred = starred;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public boolean isStarred() {
        return starred;
    }

    public void setStarred(boolean starred) {
        this.starred = starred;
    }

    @Override
    public String toString() {
        return "Club [id=" + id + ", name=" + name + ", country=" + country + ", starred=" + starred + "]";
    }
}
