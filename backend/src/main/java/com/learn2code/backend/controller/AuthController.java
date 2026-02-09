package com.learn2code.backend.controller;

import com.learn2code.backend.model.AuthRequest;
import com.learn2code.backend.model.User;
import com.learn2code.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            User user = authService.register(request.getEmail(), request.getPassword(), request.getName());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            User user = authService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    // Simplified Google Login (Simulating verification for now)
    @PostMapping("/google")
    public ResponseEntity<?> google(@RequestBody Map<String, String> payload) {
        // In a real app, verify 'credential' JWT with Google here!
        // For this demo, we trust the frontend extracted details (INSECURE for prod)
        String email = payload.get("email");
        String name = payload.get("name");
        String picture = payload.get("picture");

        User user = authService.googleLogin(email, name, picture);
        return ResponseEntity.ok(user);
    }
}
