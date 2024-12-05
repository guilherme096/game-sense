package ies.gamesense.player_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.JoinColumn;

@Entity
public class PlayerGameStats {

    @Id
    @ManyToOne
    @NotNull
    @JoinColumn(name = "player_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_player_game_stats_player"))
    private Long player_id;

    @Id
    @ManyToOne
    @NotNull
    @JoinColumn(name = "game_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_player_game_stats_game"))
    private Long game_id;

    @NotNull
    @Column(name = "rating", nullable = false)
    private int rating;

    @NotNull
    @Column(name = "minutes_played", nullable = false)
    private int minutesPlayed;

    @NotNull
    @Column(name = "goals", nullable = false)
    private int goals;

    @NotNull
    @Column(name = "assists", nullable = false)
    private int assists;

    @NotNull
    @Column(name = "fouls", nullable = false)
    private int fouls;

    @NotNull
    @Column(name = "yellow_cards", nullable = false)
    private int yellowCards;

    @NotNull
    @Column(name = "red_cards", nullable = false)
    private int redCards;

    @NotNull
    @Column(name = "saves", nullable = false)
    private int saves;

    public PlayerGameStats() {
    }

    public PlayerGameStats(Long player_id, Long game_id, int rating, int minutesPlayed, int goals, int assists, int fouls,
                           int yellowCards, int redCards, int saves) {
        this.player_id = player_id;
        this.game_id = game_id;
        this.minutesPlayed = minutesPlayed;
        this.goals = goals;
        this.assists = assists;
        this.fouls = fouls;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.saves = saves;
    }

    // Getters and Setters
    public Long getPlayerId() {
        return player_id;
    }

    public void setPlayerId(Long player_id) {
        this.player_id = player_id;
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
                "player=" + player_id +
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
