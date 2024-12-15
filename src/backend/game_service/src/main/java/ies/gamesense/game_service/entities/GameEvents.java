package ies.gamesense.game_service.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "game_events")
public class GameEvents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "game_id")
    private Long game_id;

    @Column(name = "type")
    private String type;

    @Column(name = "minute")
    private Integer minute;

    @Column(name = "player_id")
    private Long player_id;

    @Column(name = "event_club_id")
    private Long event_club_id;

    public GameEvents() {
    }

    public GameEvents(Long game_id, String type, Integer minute, Long player_id, Long event_club_id) {
        this.game_id = game_id;
        this.type = type;
        this.minute = minute;
        this.player_id = player_id;
        this.event_club_id = event_club_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGame_id() {
        return game_id;
    }

    public void setGame_id(Long game_id) {
        this.game_id = game_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getMinute() {
        return minute;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    public Long getPlayer_id() {
        return player_id;
    }

    public void setPlayer_id(Long player_id) {
        this.player_id = player_id;
    }

    public Long getEvent_club_id() {
        return event_club_id;
    }

    public void setEvent_club_id(Long event_club_id) {
        this.event_club_id = event_club_id;
    }
}
