package com.penny.controllers;

import com.penny.dto.ChatRequestDTO;
import com.penny.gemini.GeminiService;
import com.penny.models.UserEntity;
import com.penny.repositories.UserRepository;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.UserMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final GeminiService geminiService;
    private final UserRepository userRepository;

    @PostMapping
    public String chat(@RequestBody @Validated ChatRequestDTO chatRequestDTO) {
        String prompt = chatRequestDTO.getPrompt();

        Optional<UserEntity> userOptional = userRepository.findFirstByOrderByIdAsc();

        if ( userOptional.isEmpty() ){
            return HttpStatus.NOT_FOUND.toString();
        }

        UserEntity user = userOptional.get();

        List<ChatMessage> messages = List.of(
                UserMessage.from(prompt),
                UserMessage.from("Just say.. WOOF WOOF. Its a check.")
        );
        return geminiService.askPennyAssistant(messages);
    }

}
