package com.learn2code.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Map<String, Object> evaluateCode(String problemTitle, String problemDesc, String userCode) {
        String prompt = String.format(
                """
                        Evaluate the following code for the problem "%s".
                        Problem Description: %s
                        User Code: %s

                        Respond only in JSON format with status, message, and constructive feedback.
                        JSON Schema: { status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Compilation Error", message: "string", feedback: "string" }
                        """,
                problemTitle, problemDesc, userCode);

        return callGemini(prompt, true);
    }

    public String getHint(String problemTitle, String problemDesc, String userCode) {
        String prompt = String.format("""
                The user is stuck on "%s".
                Problem: %s
                Current Code: %s
                Give a subtle hint without providing the full solution. Keep it encouraging and under 100 words.
                """, problemTitle, problemDesc, userCode);

        Map<String, Object> response = callGemini(prompt, false);
        return (String) response.getOrDefault("text", "Try breaking the problem down.");
    }

    public String chat(String message, String context) {
        String prompt = String.format("""
                Context: %s
                User: %s
                AI:
                """, context != null ? context : "You are a helpful coding assistant.", message);

        Map<String, Object> response = callGemini(prompt, false);
        return (String) response.getOrDefault("text", "I'm not sure how to respond to that.");
    }

    private Map<String, Object> callGemini(String prompt, boolean expectJson) {
        try {
            // Construct request body
            Map<String, Object> contentPart = new HashMap<>();
            contentPart.put("text", prompt);

            Map<String, Object> content = new HashMap<>();
            content.put("parts", Collections.singletonList(contentPart));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", Collections.singletonList(content));

            if (expectJson) {
                Map<String, Object> generationConfig = new HashMap<>();
                generationConfig.put("response_mime_type", "application/json");
                requestBody.put("generationConfig", generationConfig);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            String url = apiUrl + "?key=" + apiKey;
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode candidate = root.path("candidates").get(0);
            JsonNode contentNode = candidate.path("content").path("parts").get(0);
            String text = contentNode.path("text").asText();

            if (expectJson) {
                return objectMapper.readValue(text, Map.class);
            } else {
                return Collections.singletonMap("text", text);
            }

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("status", "Runtime Error");
            error.put("message", "AI Service Unavailable");
            error.put("feedback", "Error communicating with Gemini: " + e.getMessage());
            // Add 'text' key so the chat method can return the error message
            error.put("text", "Error communicating with Gemini: " + e.getMessage());
            return error;
        }
    }
}
