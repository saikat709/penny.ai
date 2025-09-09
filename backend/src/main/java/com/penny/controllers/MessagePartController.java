
package com.penny.controllers;

import com.penny.dto.MessagePartCreateUpdateDTO;
import com.penny.dto.MessagePartDTO;
import com.penny.services.MessagePartService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/message-parts")
public class MessagePartController {
    private final MessagePartService messagePartService;

    public MessagePartController(MessagePartService messagePartService) {
        this.messagePartService = messagePartService;
    }

    @GetMapping
    public Page<MessagePartDTO> getMessageParts(Pageable pageable) {
        return messagePartService.getMessageParts(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessagePartDTO> getMessagePartById(@PathVariable Long id) {
        return messagePartService.getMessagePartById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/message/{messageId}")
    public MessagePartDTO createMessagePart(@RequestBody MessagePartCreateUpdateDTO messagePart, @PathVariable Long messageId) {
        return messagePartService.createMessagePart(messagePart, messageId);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MessagePartDTO> updateMessagePart(@PathVariable Long id, @RequestBody MessagePartCreateUpdateDTO messagePartDetails) {
        return messagePartService.updateMessagePart(id, messagePartDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
