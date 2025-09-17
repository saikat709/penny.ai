import React from 'react';
import type { Message } from '../custom_types/HookTypes';
import { ChatContext } from '../hooks/useChat';

type ChatProviderProps = {
    children: React.ReactNode;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [currentConversationId, setCurrentConversationId] = React.useState<number | null>(null);

    const [isHistoryLoading, setIsHistoryLoading] = React.useState<boolean>(false);
    const [isChatLoading, setIsChatLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isAddingNewMessage, setIsAddingNewMessage] = React.useState<boolean>(false);
    const [isAddingNewConversation, setIsAddingNewConversation] = React.useState<boolean>(false);


    const updateChatInfo = (userid: number, conversationId: number) => {
        
    }

    const addMessage = ( message: Message) => {
        setMessages((cur) => [...cur, { ...message, id: String(Date.now()) }]);
    };

    const changeConversation = ( conversationId: number ) => {
        setCurrentConversationId(conversationId);
    }

    return (
        <ChatContext.Provider value={{messages, addMessage}}>
        {children}
        </ChatContext.Provider>
    );
};
