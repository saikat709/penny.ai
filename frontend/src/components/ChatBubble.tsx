import React from 'react';

export interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 8,
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '10px 16px',
          borderRadius: 16,
          background: isUser ? '#6366f1' : '#e5e7eb',
          color: isUser ? '#fff' : '#222',
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
