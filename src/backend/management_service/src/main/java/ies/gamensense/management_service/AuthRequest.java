package ies.gamensense.management_service;

public class AuthRequest {

    // Data class for login requests

    private String username;
    private String password;
    private Boolean isPremium;

    public AuthRequest() {
    }

    public AuthRequest(String username, String password, Boolean isPremium) {
        this.username = username;
        this.password = password;
        this.isPremium = isPremium;
    }

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

    public Boolean getIsPremium() {
        return isPremium;
    }

    public void setIsPremium(Boolean isPremium) {
        this.isPremium = isPremium;
    }
}
