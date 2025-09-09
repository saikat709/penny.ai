
package com.penny.controllers;

import com.penny.dto.MessageCreateUpdateDTO;
import com.penny.dto.MessageDTO;
import com.penny.services.MessageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public Page<MessageDTO> getMessages(Pageable pageable) {
        return messageService.getMessages(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageDTO> getMessageById(@PathVariable Long id) {
        return messageService.getMessageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MessageDTO createMessage(@RequestBody MessageCreateUpdateDTO message) {
        return messageService.createMessage(message);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MessageDTO> updateMessage(@PathVariable Long id, @RequestBody MessageCreateUpdateDTO messageDetails) {
        return messageService.updateMessage(id, messageDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
