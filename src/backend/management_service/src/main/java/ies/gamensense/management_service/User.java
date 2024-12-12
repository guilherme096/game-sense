package ies.gamensense.management_service;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username", nullable = false)
    @NotBlank(message = "Username is required")
    private String username;
    
    @Column(name = "password", nullable = false)
    @NotBlank(message = "Password is required")
    private String password;
    
    @Column(name = "favourite_team")
    private String favouriteTeam;

    @Column(name = "is_premium", nullable = false)
    private boolean isPremium;

    // Default constructor
    public User() {}

    public User(String username, String password, String favouriteTeam, boolean isPremium) {
        this.username = username;
        this.password = password;
        this.favouriteTeam = favouriteTeam;
        this.isPremium = isPremium;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFavouriteTeam() {
        return favouriteTeam;
    }

    public void setFavoriteTeam(String favouriteTeam) {
        this.favouriteTeam = favouriteTeam;
    }

    public boolean isPremium() {
        return isPremium;
    }

    public void setPremium(boolean premium) {
        isPremium = premium;
    }
}

