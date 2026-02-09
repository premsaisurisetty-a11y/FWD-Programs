package com.learn2code.backend.service;

import com.learn2code.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    // In-memory storage for demo purposes
    private final Map<String, User> users = new HashMap<>();

    public User register(String email, String password, String name) {
        if (users.containsKey(email)) {
            throw new RuntimeException("User already exists");
        }
        User user = new User(UUID.randomUUID().toString(), email, password, name, null);
        users.put(email, user);
        return user;
    }

    public User login(String email, String password) {
        User user = users.get(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        throw new RuntimeException("Invalid credentials");
    }

    public User googleLogin(String email, String name, String picture) {
        if (!users.containsKey(email)) {
            // Auto-register
            User user = new User(UUID.randomUUID().toString(), email, null, name, picture);
            users.put(email, user);
            return user;
        }
        return users.get(email);
    }
}
