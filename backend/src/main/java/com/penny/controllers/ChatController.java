package com.penny.controllers;

import com.penny.gemini.GeminiService;
import com.penny.models.UserEntity;
import com.penny.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final GeminiService geminiService;
    private final UserRepository userRepository;

    @PostMapping
    public String chat(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt");

        Optional<UserEntity> userOptional = userRepository.findFirstByOrderByIdAsc();
        UserEntity user = userOptional.orElseGet(() -> {
            UserEntity newUser = new UserEntity();
            newUser.setEmail("test@example.com");
            newUser.setName("Test User");
            newUser.setPasswordHash("password"); // Should be hashed
            return userRepository.save(newUser);
        });

        return geminiService.askPennyAssistant(prompt, user.getId());
    }
}
