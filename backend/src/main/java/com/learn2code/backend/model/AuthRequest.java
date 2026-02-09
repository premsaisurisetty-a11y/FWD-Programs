package com.learn2code.backend.model;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
    private String name; // For registration
}
