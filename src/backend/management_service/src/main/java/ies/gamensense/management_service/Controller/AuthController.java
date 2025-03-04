package ies.gamensense.management_service.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.gamensense.management_service.Jwt.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import ies.gamensense.management_service.Models.User;
import ies.gamensense.management_service.Service.UserService;
import ies.gamensense.management_service.Models.AuthRequest;

@RestController
@RequestMapping("/api/v1/management")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody AuthRequest request, HttpServletResponse response) {
        Optional<User> user = userService.validateUser(request.getUsername(), request.getPassword());

        if (user.isPresent()) {
            String token = jwtUtil.generateToken(request.getUsername());

            // Set JWT as a cookie
            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false); // Set to true if using HTTPS
            cookie.setPath("/");
            cookie.setMaxAge(3600);
            response.addCookie(cookie);
            
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("token", token);
            responseBody.put("username", request.getUsername());
            responseBody.put("message", "Login successful");

            return ResponseEntity.ok(responseBody);
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
        cookie.setPath("/"); // Match the original cookie path
        cookie.setDomain("localhost"); // Match the original cookie domain
        cookie.setMaxAge(0); 
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    } 

    @GetMapping("/username")
    public ResponseEntity<Map<String, String>> getCurrentUsername(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    try {
                        String username = jwtUtil.validateToken(cookie.getValue());
                        return ResponseEntity.ok(Map.of("username", username));
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                            .body(Map.of("message", "Invalid or expired token"));
                    }
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("message", "No authentication token found"));
    }

    @GetMapping("/user-info")
    public ResponseEntity<User> getUserDetails(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    try {
                        String username = jwtUtil.validateToken(cookie.getValue());
                        Optional<User> user = userService.getUserDetails(username);
                        if (user.isPresent()) {
                            return ResponseEntity.ok(user.get());
                        }
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                            .body(null);
                    }
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(null);
    }

    @PostMapping("/become-premium")
    public ResponseEntity<String> becomePremium(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    try {
                        String username = jwtUtil.validateToken(cookie.getValue());
                        if (username != null) {
                            Optional<User> userOpt = userService.getUserDetails(username);
                            if (userOpt.isPresent()) {
                                User user = userOpt.get();
                                if (!user.getPremium()) {
                                    user.setPremium(true); // Set the user to premium
                                    userService.save(user); // Save the updated user
                                    return ResponseEntity.ok("User upgraded to premium.");
                                } else {
                                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                        .body("User is already premium.");
                                }
                            } else {
                                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                    .body("User not found.");
                            }
                        } else {
                            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("Invalid token.");
                        }
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Token validation failed.");
                    }
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body("No authentication token found.");
    }

    @PostMapping("/cancel-premium")
    public ResponseEntity<Map<String, String>> cancelPremium(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    try {
                        String username = jwtUtil.validateToken(cookie.getValue());
                        if (username != null) {
                            Optional<User> userOpt = userService.getUserDetails(username);
                            if (userOpt.isPresent()) {
                                User user = userOpt.get();
                                if (user.getPremium()) {
                                    user.setPremium(false); 
                                    userService.save(user); 
                                    return ResponseEntity.ok(Map.of("message", "Premium subscription canceled successfully."));
                                } else {
                                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                            .body(Map.of("message", "User is not a premium member."));
                                }
                            } else {
                                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(Map.of("message", "User not found."));
                            }
                        } else {
                            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                    .body(Map.of("message", "Invalid token."));
                        }
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("message", "Token validation failed."));
                    }
                }
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "No authentication token found."));
    }

    @PutMapping("/update-favorite-team") 
    public ResponseEntity<Map<String, String>> updateFavoriteTeam(HttpServletRequest request, @RequestBody Map<String, String> body) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    try {
                        String username = jwtUtil.validateToken(cookie.getValue());
                        if (username != null) {
                            Optional<User> userOpt = userService.getUserDetails(username);
                            if (userOpt.isPresent()) {
                                User user = userOpt.get();
                                user.setFavoriteTeam(body.get("team"));
                                userService.save(user);
                                return ResponseEntity.ok(Map.of("message", "Favorite team updated successfully."));
                            } else {
                                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(Map.of("message", "User not found."));
                            }
                        } else {
                            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                    .body(Map.of("message", "Invalid token."));
                        }
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("message", "Token validation failed."));
                    }
                }
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "No authentication token found."));
    }
}

