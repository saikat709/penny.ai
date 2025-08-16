import React from 'react';

export interface ChatHistorySidebarProps {
  chats: { id: string; title: string }[];
  selectedChatId: string;
  onSelectChat: (id: string) => void;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({ chats, selectedChatId, onSelectChat }) => {
  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 text-white flex flex-col p-4">
      <h3 className="mb-4 text-lg font-semibold text-pink-300 tracking-wide">Chat History</h3>
      <ul className="list-none p-0">
        {chats.map(chat => (
          <li
            key={chat.id}
            className={`mb-2 px-4 py-3 rounded-lg cursor-pointer transition-colors font-medium ${
              chat.id === selectedChatId
                ? 'bg-gradient-to-r from-pink-300 to-gray-900 text-gray-900'
                : 'hover:bg-gray-700 text-white'
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatHistorySidebar;
