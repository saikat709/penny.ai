package com.penny.controllers;

import com.penny.gemini.GeminiService;
import com.penny.models.UserEntity;
import com.penny.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    private final GeminiService geminiService;
    private final UserRepository userRepository;

    public GeminiController(GeminiService geminiService, UserRepository userRepository) {
        this.geminiService = geminiService;
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String getGeminiReply(@RequestParam String message){
        UserEntity usr = userRepository.findFirstByOrderByIdAsc().orElseThrow(() -> new IllegalStateException("No users found"));
        return geminiService.askPennyAssistant(message, usr.getId());
    }
}