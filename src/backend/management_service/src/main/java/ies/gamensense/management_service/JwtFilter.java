package ies.gamensense.management_service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;



@Component
public class JwtFilter extends OncePerRequestFilter {

    // Intercept requests, extract JWT from cookies, validate JWT tokens

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Check if the request is for the /authenticate endpoint
        if (request.getRequestURI().equals("/api/v1/management/authenticate")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    token = cookie.getValue();
                }
            }
        }

        try {
            if (token != null) {
                String username = jwtUtil.validateToken(token);
                SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(username, null, List.of())
                );
            } else {
                // If there's no token, set the response to 401 Unauthorized
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                // Return an error message in the response body
                ObjectMapper mapper = new ObjectMapper();
                String errorMessage = "Invalid or missing JWT token";
                mapper.writeValue(response.getOutputStream(), Map.of("message", errorMessage));
                return;
            }
        } catch (Exception e) {
            System.err.println("Invalid JWT Token: " + e.getMessage());
            // Set the response to 401 Unauthorized
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            // Return an error message in the response body
            ObjectMapper mapper = new ObjectMapper();
            String errorMessage = "Invalid or missing JWT token";
            mapper.writeValue(response.getOutputStream(), Map.of("message", errorMessage));
            return;
        }

        filterChain.doFilter(request, response);
    }
}