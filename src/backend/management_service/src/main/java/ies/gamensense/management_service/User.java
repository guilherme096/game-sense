package ies.gamensense.management_service;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username", nullable = false)
    @NotBlank(message = "Username is required")
    private String username;
    
    @Column(name = "password", nullable = false)
    @NotBlank(message = "Password is required")
    @Size(min = 5, max = 20, message = "Password must be between 5 to 20 characters long")
    private String password;
    
    @Column(name = "favorite_team")
    private String favoriteTeam;

    @Column(name = "is_premium", nullable = false)
    @NotBlank(message = "Premium status is required")
    private boolean isPremium;

    // Default constructor
    public User() {}

    public User(String username, String password, String favoriteTeam, boolean isPremium) {
        this.username = username;
        this.password = password;
        this.favoriteTeam = favoriteTeam;
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

    public String getFavoriteTeam() {
        return favoriteTeam;
    }

    public void setFavoriteTeam(String favoriteTeam) {
        this.favoriteTeam = favoriteTeam;
    }

    public boolean isPremium() {
        return isPremium;
    }

    public void setPremium(boolean premium) {
        isPremium = premium;
    }
}

