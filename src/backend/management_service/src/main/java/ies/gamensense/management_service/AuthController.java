package ies.gamensense.management_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/management")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody AuthRequest request) {
        Optional<User> user = userService.validateUser(request.getUsername(), request.getPassword());

        if (user.isPresent()) {
            String token = jwtUtil.generateToken(request.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", request.getUsername());
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        try {
            System.out.println("isPremium: " + user.getPremium());
            if (userService.getUserDetails(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));
            }
            if (user.getUsername() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Username and password are required"));
            }
            User createdUser = userService.createUser(user);
            System.out.println("Created user: " + createdUser);
            // return the properties of the created user
            System.out.println("is premium: " + createdUser.getPremium());

            String token = jwtUtil.generateToken(createdUser.getUsername());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", createdUser.getUsername());
            response.put("message", "Registration successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(Map.of("message", "Error during registration: " + e.getMessage()));
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Set to true in production with HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire the cookie immediately
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }   

    @GetMapping("/username")
    public ResponseEntity<Map<String, String>> getCurrentUsername(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(Map.of("username", username));
    }
}

