
package com.penny.services;

import com.penny.dto.MessageCreateUpdateDTO;
import com.penny.dto.MessageDTO;
import com.penny.dto.MessagePartCreateUpdateDTO;
import com.penny.dto.MessagePartDTO;
import com.penny.models.Conversation;
import com.penny.models.Message;
import com.penny.models.MessagePart;
import com.penny.repositories.ConversationRepository;
import com.penny.repositories.MessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;

    public MessageService(MessageRepository messageRepository, ConversationRepository conversationRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
    }

    public Page<MessageDTO> getMessages(Pageable pageable) {
        return messageRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<MessageDTO> getMessageById(Long id) {
        return messageRepository.findById(id).map(this::convertToDTO);
    }

    public MessageDTO createMessage(MessageCreateUpdateDTO messageDTO) {
        Conversation conversation = conversationRepository.findById(messageDTO.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        Message message = new Message();
        message.setConversation(conversation);
        message.setType(messageDTO.getType());
        message.setSender(messageDTO.getSender());

        if (messageDTO.getParts() != null) {
            message.setParts(new ArrayList<>());
            for (MessagePartCreateUpdateDTO partDTO : messageDTO.getParts()) {
                MessagePart part = new MessagePart();
                part.setMessage(message);
                part.setType(partDTO.getType());
                part.setData(partDTO.getData());
                message.getParts().add(part);
            }
        }

        return convertToDTO(messageRepository.save(message));
    }

    public Optional<MessageDTO> updateMessage(Long id, MessageCreateUpdateDTO messageDetails) {
        return messageRepository.findById(id)
                .map(message -> {
                    if (messageDetails.getType() != null) {
                        message.setType(messageDetails.getType());
                    }
                    if (messageDetails.getSender() != null) {
                        message.setSender(messageDetails.getSender());
                    }
                    return convertToDTO(messageRepository.save(message));
                });
    }

    private MessageDTO convertToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setConversationId(message.getConversation().getId());
        dto.setType(message.getType());
        dto.setSender(message.getSender());
        dto.setTimestamp(message.getTimestamp());
        if (message.getParts() != null) {
            dto.setParts(message.getParts().stream().map(this::convertMessagePartToDTO).collect(Collectors.toList()));
        }
        return dto;
    }

    private MessagePartDTO convertMessagePartToDTO(MessagePart messagePart) {
        MessagePartDTO dto = new MessagePartDTO();
        dto.setId(messagePart.getId());
        dto.setMessageId(messagePart.getMessage().getId());
        dto.setType(messagePart.getType());
        dto.setData(messagePart.getData());
        return dto;
    }
}
