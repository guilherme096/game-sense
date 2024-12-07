package ies.gamensense.management_service;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/management")
public class AuthController {
    // Handles the authentication request
    // Validates the credentials and generates a JWT token
    // Sets the token in a cookie

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody AuthRequest request, HttpServletResponse response) {
        System.out.println("AAAAAAAAAAAAAAAAAAAAA");

        if ("user".equals(request.getUsername()) && "password".equals(request.getPassword())) {
            String token = jwtUtil.generateToken(request.getUsername(), Map.of("role", "USER"));

            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);  // Set to true in production with HTTPS
            cookie.setPath("/");
            cookie.setMaxAge(36000);  
            response.addCookie(cookie);

            System.out.println("Authentication successful, cookie set with token");

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
