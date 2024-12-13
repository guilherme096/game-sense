package ies.gamensense.management_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            System.out.println("User created: " + savedUser.getUsername());
            return savedUser;
        } catch (Exception e) {
            System.err.println("Error creating user: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public Optional<User> validateUser(String username, String password) {
        return getUserDetails(username)
            .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }
    

    public Optional<User> getUserDetails(String username) {
        return userRepository.findAll().stream()
            .filter(user -> user.getUsername().equals(username))
            .findFirst();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }
}

