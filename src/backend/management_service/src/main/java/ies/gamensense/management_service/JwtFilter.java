package ies.gamensense.management_service;

import java.io.IOException;
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

        System.out.println(request.getRequestURI());

        if (request.getRequestURI().equals("/api/v1/management/register") || request.getRequestURI().equals("/api/v1/management/authenticate")) {
            filterChain.doFilter(request, response);
            return;
    }

        String token = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    token = cookie.getValue();
                }
            }
        }

        try {
            if (token != null) {
                String username = jwtUtil.validateToken(token);
                request.setAttribute("username", username); // Pass the username for further use
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(username, null, null));
            } else {
                throw new RuntimeException("Missing or invalid JWT token");
            }
        } catch (Exception e) {
            System.err.println("JWT validation failed: " + e.getMessage());
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(),
                    Map.of("message", "Invalid or missing JWT token"));
            return;
        }
    

        filterChain.doFilter(request, response);
    }
}