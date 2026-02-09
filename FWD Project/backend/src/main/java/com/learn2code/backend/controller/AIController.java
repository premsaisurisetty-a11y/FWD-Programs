package com.learn2code.backend.controller;

import com.learn2code.backend.model.AIRequest;
import com.learn2code.backend.service.GeminiService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final GeminiService geminiService;

    public AIController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/evaluate")
    public Map<String, Object> evaluate(@RequestBody AIRequest request) {
        return geminiService.evaluateCode(request.getProblemTitle(), request.getProblemDesc(), request.getUserCode());
    }

    @PostMapping("/hint")
    public String getHint(@RequestBody AIRequest request) {
        return geminiService.getHint(request.getProblemTitle(), request.getProblemDesc(), request.getUserCode());
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody AIRequest request) {
        // Use problem context if available
        String context = "";
        if (request.getProblemTitle() != null) {
            context = "User is working on problem: " + request.getProblemTitle() + ". " + request.getProblemDesc();
        }

        String response = geminiService.chat(request.getMessage(), context);
        return Map.of("response", response);
    }
}
