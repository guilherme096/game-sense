package ies.gamesense.player_service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;

@Entity
@IdClass(PlayerGameStatsId.class)
public class PlayerGameStats {

    @Id
    @ManyToOne //(fetch = FetchType.LAZY) // Ensure this is lazily fetched if needed
    @JoinColumn(name = "player_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private Player player;

    @Id
    @Column(name = "game_id", nullable = false)
    private Long game_id;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "minutes_played", nullable = false)
    private int minutesPlayed;

    @Column(name = "goals", nullable = false)
    private int goals;

    @Column(name = "assists", nullable = false)
    private int assists;

    @Column(name = "fouls", nullable = false)
    private int fouls;

    @Column(name = "yellow_cards", nullable = false)
    private int yellowCards;

    @Column(name = "red_cards", nullable = false)
    private int redCards;

    @Column(name = "saves", nullable = false)
    private int saves;

    public PlayerGameStats() {}

    public PlayerGameStats(Player player, Long game_id, int rating, int minutesPlayed, int goals, int assists,
                           int fouls, int yellowCards, int redCards, int saves) {
        this.player = player;
        this.game_id = game_id;
        this.rating = rating;
        this.minutesPlayed = minutesPlayed;
        this.goals = goals;
        this.assists = assists;
        this.fouls = fouls;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.saves = saves;
    }


    // Getters and Setters
    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Long getGameId() {
        return game_id;
    }

    public void setGameId(Long game_id) {
        this.game_id = game_id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getMinutesPlayed() {
        return minutesPlayed;
    }

    public void setMinutesPlayed(int minutesPlayed) {
        this.minutesPlayed = minutesPlayed;
    }

    public int getGoals() {
        return goals;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getFouls() {
        return fouls;
    }

    public void setFouls(int fouls) {
        this.fouls = fouls;
    }

    public int getYellowCards() {
        return yellowCards;
    }

    public void setYellowCards(int yellowCards) {
        this.yellowCards = yellowCards;
    }

    public int getRedCards() {
        return redCards;
    }

    public void setRedCards(int redCards) {
        this.redCards = redCards;
    }

    public int getSaves() {
        return saves;
    }

    public void setSaves(int saves) {
        this.saves = saves;
    }

    @Override
    public String toString() {
        return "PlayerGameStats{" +
                "player=" + player +
                ", game=" + game_id +
                ", minutesPlayed=" + minutesPlayed +
                ", goals=" + goals +
                ", assists=" + assists +
                ", fouls=" + fouls +
                ", yellowCards=" + yellowCards +
                ", redCards=" + redCards +
                ", saves=" + saves +
                '}';
    }
}
