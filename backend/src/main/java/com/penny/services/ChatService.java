package com.penny.services;

import com.penny.models.Conversation;
import com.penny.repositories.ConversationRepository;
import com.penny.repositories.MessagePartRepository;
import com.penny.repositories.MessageRepository;
import com.penny.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final UserRepository         userRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository      messageRepository;
    private final MessagePartRepository  messagePartRepository;

    public ChatService(
            UserRepository userRepository,
            ConversationRepository conversationRepository,
            MessagePartRepository messagePartRepository,
            MessageRepository messageRepository
    )
    {
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.messagePartRepository = messagePartRepository;
    }

    public Long createNewConversation(){
        Conversation conversation = new Conversation();
        conversationRepository.save(conversation);
        return conversation.getId();
    }
}
