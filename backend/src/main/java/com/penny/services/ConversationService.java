
package com.penny.services;

import com.penny.dto.ConversationCreateUpdateDTO;
import com.penny.dto.ConversationDTO;
import com.penny.dto.MessageDTO;
import com.penny.dto.MessagePartDTO;
import com.penny.models.Conversation;
import com.penny.models.Message;
import com.penny.models.MessagePart;
import com.penny.models.UserEntity;
import com.penny.repositories.ConversationRepository;
import com.penny.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    public ConversationService(ConversationRepository conversationRepository, UserRepository userRepository) {
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }

    public Page<ConversationDTO> getConversations(Pageable pageable) {
        return conversationRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<ConversationDTO> getConversationById(Long id) {
        return conversationRepository.findById(id).map(this::convertToDTO);
    }

    public ConversationDTO createConversation(ConversationCreateUpdateDTO conversationDTO) {
        UserEntity user = userRepository.findById(conversationDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Conversation conversation = new Conversation();
        conversation.setUser(user);
        conversation.setTitle(conversationDTO.getTitle());

        return convertToDTO(conversationRepository.save(conversation));
    }

    public Optional<ConversationDTO> updateConversation(Long id, ConversationCreateUpdateDTO conversationDetails) {
        return conversationRepository.findById(id)
                .map(conversation -> {
                    if (conversationDetails.getTitle() != null) {
                        conversation.setTitle(conversationDetails.getTitle());
                    }
                    return convertToDTO(conversationRepository.save(conversation));
                });
    }

    private ConversationDTO convertToDTO(Conversation conversation) {
        ConversationDTO dto = new ConversationDTO();
        dto.setId(conversation.getId());
        dto.setUserId(conversation.getUser().getId());
        dto.setTitle(conversation.getTitle());
        dto.setTimestamp(conversation.getTimestamp());
        if (conversation.getMessages() != null) {
            dto.setMessages(conversation.getMessages().stream().map(this::convertMessageToDTO).collect(Collectors.toList()));
        }
        return dto;
    }

    private MessageDTO convertMessageToDTO(Message message) {
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
