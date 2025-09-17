import { createContext, useContext } from 'react';
import type { ChatContextType } from '../custom_types/HookTypes';

export const ChatContext= createContext<ChatContextType|null>(null);

const useChat = () => {
    const context = useContext(ChatContext);
     if (!context) {
       throw new Error("useChat must be used within AuthProvider");
     }
     return context;
};

export default useChat;