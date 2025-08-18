import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';

type Message = {
  id: string;
  type?: 'income' | 'expense' | 'text';
  text: string;
  amount?: number;
  from?: 'me' | 'ai';
};


type ChatWindowProps = {
  toggleSidebar?: () => void; 
  isOpen: boolean;
};

const initial: Message[] = [
  { 
    id: '1',
    from: 'ai', 
    type: 'text', 
    text: 'Welcome to Penny chat — track income and expenses with natural language.' 
  },
  { 
    id: '2', 
    from: 'me',
    type: 'income', 
    text: 'Salary received', 
    amount: 3500 
  },
  { 
    id: '3', 
    from: 'ai', 
    type: 'text', 
    text: "Great — I've logged that income." 
  },
  {
    id: '4',
    from: 'me', 
    type: 'expense', 
    text: 'Dinner at restaurant', 
    amount: 48.25 
  },
];

const ChatWindow : React.FC<ChatWindowProps> = (
  {toggleSidebar, isOpen}: ChatWindowProps
) => {
  const [messages, setMessages] = useState<Message[]>(initial);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoScrollRef = useRef<boolean>(true);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const addMessage = (m: Omit<Message, 'id'>) => {
    setMessages((cur) => [...cur, { ...m, id: String(Date.now()) }]);
  };

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    shouldAutoScrollRef.current = distanceFromBottom < 100;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el && shouldAutoScrollRef.current) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(() => {
      if (shouldAutoScrollRef.current) {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    });

    ro.observe(content);
    return () => ro.disconnect();
  }, []);

  return (
    <main className="flex-1 flex flex-col glass-card p-4 h-[80vh]">
      <header className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className='flex items-center space-x-2'>
          { isOpen ? <ChevronDoubleLeftIcon 
            onClick={toggleSidebar}
            className='h-10 w-10 text-white hover:text-gray-500' />
            : <ChevronDoubleRightIcon
            onClick={toggleSidebar}
            className='h-10 w-10 text-white hover:text-gray-500' />
          }
          <div>
            <h2 className="text-lg font-semibold flex items-center">
              Penny Chat
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">Ask about your finances or log transactions</div>
          </div>
        </div>
        <div className="flex items-center space-x-0.5 md:space-x-2">
          <button className="border-1 border-blue-200 p-2 rounded-lg hover:bg-blue-400 hover:text-black font-bold">Export</button>
          <button className="border-1 border-blue-200 p-2 rounded-lg hover:bg-blue-400 hover:text-black font-bold">New</button>
        </div>
      </header>

      <section className="flex-1 overflow-auto px-1" aria-live="polite" ref={containerRef} onScroll={onScroll}>
        <div className="space-y-3 w-full mx-auto" ref={contentRef}>
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </div>
      </section>

      <footer className="mt-3">
        <MessageInput onSend={(text: string, meta?: { type?: 'income' | 'expense' | 'text'; amount?: number }) => addMessage(meta ? { from: 'me', text, ...meta } : { from: 'me', text })} />
      </footer>
    </main>
  );
}

export default ChatWindow;
