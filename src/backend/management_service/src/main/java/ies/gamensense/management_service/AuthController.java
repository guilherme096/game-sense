package ies.gamensense.management_service;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:80", allowCredentials = "true") // Update to match your nginx port
public class AuthController {
    // Handles the authentication request
    // Validates the credentials and generates a JWT token
    // Sets the token in a cookie

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest request, HttpServletResponse response) {
        if ("user".equals(request.getUsername()) && "password".equals(request.getPassword())) {
            String token = jwtUtil.generateToken(request.getUsername(), Map.of("role", "USER"));

            // Set the token in an HttpOnly cookie
            Cookie cookie = new Cookie("jwt", token);
            cookie.setSecure(true);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setDomain("localhost");
            response.addCookie(cookie);

            // Return JSON response
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("token", token);
            responseBody.put("username", request.getUsername());
            responseBody.put("message", "Login successful");

            return ResponseEntity.ok(responseBody);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid credentials"));
    }
}
