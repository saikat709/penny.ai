package com.penny.controllers;

import com.penny.gemini.GeminiService;
import com.penny.gemini.PennyAiAssistant;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping(value = "/stream-test", produces = MediaType.TEXT_HTML_VALUE)
    public String chatStreamTestPage() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/chat-stream-test.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    @PostMapping("/chat")
    public String chat(@RequestParam String prompt) {
        return geminiService.askPennyAssistant(prompt);
    }

}
