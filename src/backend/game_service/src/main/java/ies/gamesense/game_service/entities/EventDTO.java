package ies.gamesense.game_service.entities;

public class EventDTO {
    private String type;
    private int minute;
    private String playerName;

    public EventDTO() {
    }

    public EventDTO(String type, int minute, String playerName) {
        this.type = type;
        this.minute = minute;
        this.playerName = playerName;
    }

    // Getters and setters

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getMinute() {
        return minute;
    }

    public void setMinute(int minute) {
        this.minute = minute;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    @Override
    public String toString() {
        return "EventDTO{" +
                "type='" + type + '\'' +
                ", minute=" + minute +
                ", playerName='" + playerName + '\'' +
                '}';
    }
}
