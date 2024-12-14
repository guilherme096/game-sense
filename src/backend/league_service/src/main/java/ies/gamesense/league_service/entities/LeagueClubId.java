package ies.gamesense.league_service.entities;

import java.io.Serializable;
import java.util.Objects;

public class LeagueClubId implements Serializable {
    private long league;
    private long club_id;

    public LeagueClubId() {}

    public LeagueClubId(long league, long club_id) {
        this.league = league;
        this.club_id = club_id;
    }

    // Getters, setters, equals, and hashCode methods
    public long getLeague() {
        return league;
    }

    public void setLeague(long league) {
        this.league = league;
    }

    public long getClub_id() {
        return club_id;
    }

    public void setClub_id(long club_id) {
        this.club_id = club_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LeagueClubId that = (LeagueClubId) o;
        return league == that.league && club_id == that.club_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(league, club_id);
    }
}
