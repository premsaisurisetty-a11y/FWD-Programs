package com.learn2code.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AIRequest {
    private String problemTitle;
    private String problemDesc;
    private String userCode;
    private String message; // For chat feature
}
