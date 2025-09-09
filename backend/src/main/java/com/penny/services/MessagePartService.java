
package com.penny.services;

import com.penny.dto.MessagePartCreateUpdateDTO;
import com.penny.dto.MessagePartDTO;
import com.penny.models.Message;
import com.penny.models.MessagePart;
import com.penny.repositories.MessagePartRepository;
import com.penny.repositories.MessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessagePartService {
    private final MessagePartRepository messagePartRepository;
    private final MessageRepository messageRepository;

    public MessagePartService(MessagePartRepository messagePartRepository, MessageRepository messageRepository) {
        this.messagePartRepository = messagePartRepository;
        this.messageRepository = messageRepository;
    }

    public Page<MessagePartDTO> getMessageParts(Pageable pageable) {
        return messagePartRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<MessagePartDTO> getMessagePartById(Long id) {
        return messagePartRepository.findById(id).map(this::convertToDTO);
    }

    public MessagePartDTO createMessagePart(MessagePartCreateUpdateDTO messagePartDTO, Long messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        MessagePart messagePart = new MessagePart();
        messagePart.setMessage(message);
        messagePart.setType(messagePartDTO.getType());
        messagePart.setData(messagePartDTO.getData());

        return convertToDTO(messagePartRepository.save(messagePart));
    }

    public Optional<MessagePartDTO> updateMessagePart(Long id, MessagePartCreateUpdateDTO messagePartDetails) {
        return messagePartRepository.findById(id)
                .map(messagePart -> {
                    if (messagePartDetails.getType() != null) {
                        messagePart.setType(messagePartDetails.getType());
                    }
                    if (messagePartDetails.getData() != null) {
                        messagePart.setData(messagePartDetails.getData());
                    }
                    return convertToDTO(messagePartRepository.save(messagePart));
                });
    }

    private MessagePartDTO convertToDTO(MessagePart messagePart) {
        MessagePartDTO dto = new MessagePartDTO();
        dto.setId(messagePart.getId());
        dto.setMessageId(messagePart.getMessage().getId());
        dto.setType(messagePart.getType());
        dto.setData(messagePart.getData());
        return dto;
    }
}
