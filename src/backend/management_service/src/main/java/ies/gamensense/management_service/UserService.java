package ies.gamensense.management_service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private List<AuthRequest> users;

    public UserService() {
        loadUsers();
    }

    private void loadUsers() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("users.json");
            users = objectMapper.readValue(inputStream, new TypeReference<List<AuthRequest>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to load users from JSON file", e);
        }
    }

    public Optional<AuthRequest> validateUser(String username, String password) {
        return users.stream()
                .filter(user -> user.getUsername().equals(username) && user.getPassword().equals(password))
                .findFirst();
    }
}
