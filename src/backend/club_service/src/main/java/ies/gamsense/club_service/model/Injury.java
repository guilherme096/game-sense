package ies.gamsense.club_service.model;

public class Injury {
    private String date; 
    private String description; 
    private String severity; 
    private Integer gamesOut; 

    public Injury() {}

    public Injury(String date, String description, String severity, Integer gamesOut) {
        this.date = date;
        this.description = description;
        this.severity = severity;
        this.gamesOut = gamesOut;
    }
    
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
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
                "date='" + date + '\'' +
                ", description='" + description + '\'' +
                ", severity='" + severity + '\'' +
                ", gamesOut=" + gamesOut +
                '}';
    }
}
