package com.penny.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.penny.dto.ChatRequestDTO;
import com.penny.dto.ChatResponseDTO;
import com.penny.gemini.GeminiService;
import com.penny.models.Conversation;
import com.penny.models.Message;
import com.penny.models.MessagePart;
import com.penny.models.UserEntity;
import com.penny.repositories.ConversationRepository;
import com.penny.repositories.MessagePartRepository;
import com.penny.repositories.MessageRepository;
import com.penny.repositories.UserRepository;
import com.penny.services.ChatService;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.data.message.UserMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
    private final ChatService chatService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final MessagePartRepository messagePartRepository;

    @PostMapping
    public ResponseEntity<ChatResponseDTO> chat(@RequestBody @Validated ChatRequestDTO chatRequestDTO) { // removed trailing comma
        String prompt = chatRequestDTO.getPrompt();
        Long userId = chatRequestDTO.getUserId();
        Long conversationId = chatRequestDTO.getConversationId();

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        System.out.println("user: " + user);
        Optional<Conversation> conversation = Optional.empty();
        if ( conversationId == null ) {
            Conversation conv = new Conversation();
            conv.setUser(user);
            conversationRepository.save(conv);
            conversationId = conv.getId();
            conversation = Optional.of(conv);
        } else {
            conversation = conversationRepository.findById(conversationId);
        }
        System.out.println("conversationId: " + conversationId);
        System.out.println("conversation: " + conversation);

        List<ChatMessage> messages = new ArrayList<>();
        messages.add(SystemMessage.from("Here is the user information you are talking to: Name="
                + user.getName() + ", ID=" + user.getId() + ", Email=" + user.getEmail()
        ));

        if (conversationId != null && conversation.isPresent()) {
            conversation.get().getMessages().forEach(message -> {
                System.out.println(message.toString());
                ChatMessage msg;
                if ("user".equals(message.getSender())) { // string equality fix
                    msg = UserMessage.from(String.valueOf(message.getParts()));
                } else {
                    msg = SystemMessage.from(String.valueOf(message.getParts()));
                }
                messages.add(msg);
            });
        }

        if (conversationId == null || conversation.isEmpty()) {
            messages.add(SystemMessage.from("Generate a title field on response based on the user message: " + prompt));
        }

        messages.add(UserMessage.from(prompt));

        try {
            String geminiRes = geminiService.askPennyAssistant(messages);
            ChatResponseDTO res = parseAIResponse(geminiRes);

            // save user message
            Message message = new Message();
            message.setConversation(conversation.get());
            message.setSender(user.getName());
            message.setSender("user");
            message.setType("success");

            MessagePart part = new MessagePart();
            part.setMessage(message);
            part.setType("text");
            part.setData("{\"text\":" + prompt.trim() + "}");
            message.setParts(List.of(part));

            messageRepository.save(message);

            // save AI message
            Message aiMessage = new Message();
            message.setConversation(conversation.get());
            message.setSender("ai");
            message.setType(res.getType());

            res.getParts().forEach(messagePartDTO -> {
                MessagePart msgPart = new MessagePart();
                msgPart.setMessage(message);
                msgPart.setType(messagePartDTO.getType());
                msgPart.setData(messagePartDTO.getData());
                messagePartRepository.save(msgPart);
                message.getParts().add(msgPart);
            });

            messageRepository.save(aiMessage);

            return ResponseEntity.ok(res);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }

    private ChatResponseDTO parseAIResponse(String response) {
        if (response == null || response.isBlank()) {
            throw new IllegalArgumentException("AI response is empty");
        }

        String cleaned = response.trim()
                .replaceAll("^```json\\s*", "")
                .replaceAll("^```\\s*", "")
                .replaceAll("\\s*```$", "");

        AIResponse aiResponse = new Gson().fromJson(cleaned, AIResponse.class);
        System.out.println(aiResponse);

        return new ChatResponseDTO();
    }

    private static class AIResponse {
        String type;
        List<ResponsePart> parts = new ArrayList<>();
        Long id;
        String title;

        @Override
        public String toString() {
            return "AIResponse{" +
                    "id='" + id + '\'' +
                    ", type='" + type + '\'' +
                    ", title='" + title + '\'' +   // fixed stray quote
                    ", parts=" + parts +
                    '}';
        }
    }

    private static class ResponsePart {
        String type;
        JsonElement data; // keep as JsonElement since your JSON shows objects
        Long id;

        @Override
        public String toString() {
            return "ResponsePart{" +
                    "id='" + id + '\'' +
                    ", type='" + type + '\'' +
                    ", data=" + data +
                    '}';
        }
    }
}
