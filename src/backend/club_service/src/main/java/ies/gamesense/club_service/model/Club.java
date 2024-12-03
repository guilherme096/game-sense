package ies.gamesense.club_service.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;


@Entity
@Table(name = "club")
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "logo", nullable = false)
    private String logo; // URL for the club's logo

    @NotNull
    @Column(name = "country", nullable = false)
    private String country;

    @NotNull
    @Column(name = "country_flag", nullable = false)
    private String countryFlag; // URL for country's flag

    @NotBlank(message = "League is mandatory")
    private String league;

    @JsonProperty("league_position")
    @NotBlank(message = "League Position is mandatory")
    private Integer leaguePosition;

    @NotNull
    @Column(name = "starred", nullable = false)
    private boolean starred;

    @Transient
    private Game nextGame;

    @Transient
    private List<Game> lastGames;

    @Transient
    private List<Player> players;

    public Club() {}

    public Club(String name, String country, String logo, String countryFlag, String league, Integer leaguePosition, boolean starred) {
        this.name = name;
        this.country = country;
        this.logo = logo;
        this.countryFlag = countryFlag;
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

    public List<Player> getPlayers() {
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

    public void setPlayers(List<Player> players) {
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
                ", nextGame=" + (nextGame != null ? nextGame.toString() : "null") +
                ", lastGames=" + lastGames +
                ", players=" + players +
                '}';
    }

}