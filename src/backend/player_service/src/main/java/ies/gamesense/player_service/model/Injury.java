package ies.gamesense.player_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import jakarta.validation.constraints.NotNull;

@Entity
public class Injury {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id; 
    
    @ManyToOne
    @NotNull
    @JoinColumn(name = "player_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_injury_player"))
    private Player player;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Column(name = "description", nullable = false, length = 100)
    private String description;

    @NotNull
    @Column(name = "severity", nullable = false, length = 50)
    private String severity;

    @NotNull
    @Column(name = "games_out", nullable = false)
    private Integer gamesOut;

    public Injury() {}

    public Injury(Player player, LocalDate date, String description, String severity, Integer gamesOut) {
        this.player = player;
        this.date = date;
        this.description = description;
        this.severity = severity;
        this.gamesOut = gamesOut;
    }

    // Getters and Setters
    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public Integer getGamesOut() {
        return gamesOut;
    }

    public void setGamesOut(Integer gamesOut) {
        this.gamesOut = gamesOut;
    }

    @Override
    public String toString() {
        return "Injury{" +
                "player=" + player.getId() +
                ", date=" + date +
                ", description='" + description + '\'' +
                ", severity='" + severity + '\'' +
                ", gamesOut=" + gamesOut +
                '}';
    }
}
