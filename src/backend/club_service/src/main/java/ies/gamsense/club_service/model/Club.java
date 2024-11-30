package ies.gamsense.club_service.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;


@Entity
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    private String logo; // URL for the club's logo

    @NotBlank(message = "Country is mandatory")
    private String country;

    private String countryFlag; // URL for country's flag

    @NotBlank(message = "League is mandatory")
    private String league;

    @JsonProperty("league_position")
    @NotNull(message = "League Position is mandatory")
    private Integer leaguePosition;

    @JsonProperty("isStarred")
    private boolean starred;

    @Transient
    private Game nextGame;

    @Transient
    private List<Game> lastGames; 

    @Transient
    private List<Players> players;

    public Club() {}

    public Club(String name, String country, String logo, String coutryFlag, String league, Integer leaguePosition, boolean starred) {
        this.name = name;
        this.country = country;
        this.logo = logo;
        this.countryFlag = coutryFlag;
        this.league = league;
        this.leaguePosition = leaguePosition;
        this.starred = starred;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLogo() {
        return logo;
    }

    public String getCountry() {
        return country;
    }

    public String getCountryFlag() {
        return countryFlag;
    }

    public String getLeague() {
        return league;
    }

    public Integer getLeaguePosition() {
        return leaguePosition;
    }

    public boolean isStarred() {
        return starred;
    }

    public Game getNextGame() {
        return nextGame;
    }

    public List<Game> getLastGames() {
        return lastGames;
    }

    public List<Players> getPlayers() {
        return players;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCountryFlag(String countryFlag) {
        this.countryFlag = countryFlag;
    }

    public void setLeague(String league) {
        this.league = league;
    }

    public void setLeaguePosition(Integer leaguePosition) {
        this.leaguePosition = leaguePosition;
    }

    public void setStarred(boolean starred) {
        this.starred = starred;
    }

    public void setNextGame(Game nextGame) {
        this.nextGame = nextGame;
    }

    public void setLastGames(List<Game> lastGames) {
        this.lastGames = lastGames;
    }

    public void setPlayers(List<Players> players) {
        this.players = players;
    }

    @Override
    public String toString() {
        return "Club{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", logo='" + logo + '\'' +
                ", country='" + country + '\'' +
                ", league='" + league + '\'' +
                ", leaguePosition=" + leaguePosition +
                ", starred=" + starred +
                '}';
    }
}