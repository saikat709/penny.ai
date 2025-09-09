
package com.penny.controllers;

import com.penny.dto.ConversationCreateUpdateDTO;
import com.penny.dto.ConversationDTO;
import com.penny.services.ConversationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping
    public Page<ConversationDTO> getConversations(Pageable pageable) {
        return conversationService.getConversations(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationDTO> getConversationById(@PathVariable Long id) {
        return conversationService.getConversationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ConversationDTO createConversation(@RequestBody ConversationCreateUpdateDTO conversation) {
        return conversationService.createConversation(conversation);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ConversationDTO> updateConversation(@PathVariable Long id, @RequestBody ConversationCreateUpdateDTO conversationDetails) {
        return conversationService.updateConversation(id, conversationDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
