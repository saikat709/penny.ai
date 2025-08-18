import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

type Message = {
  id: string;
  type?: 'income' | 'expense' | 'text';
  text: string;
  amount?: number;
  from?: 'me' | 'ai';
};

const initial: Message[] = [
  { id: '1', from: 'ai', type: 'text', text: 'Welcome to Penny chat — track income and expenses with natural language.' },
  { id: '2', from: 'me', type: 'income', text: 'Salary received', amount: 3500 },
  { id: '3', from: 'ai', type: 'text', text: "Great — I've logged that income." },
  { id: '4', from: 'me', type: 'expense', text: 'Dinner at restaurant', amount: 48.25 },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initial);
  const endRef = useRef<HTMLDivElement | null>(null);

  const addMessage = (m: Omit<Message, 'id'>) => {
    setMessages((cur) => [...cur, { ...m, id: String(Date.now()) }]);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="flex-1 flex flex-col glass-card p-4 h-[80vh]">
      <header className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div>
          <h2 className="text-lg font-semibold">Penny Chat</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">Ask about your finances or log transactions</div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn btn-secondary">Export</button>
          <button className="btn btn-secondary">New</button>
        </div>
      </header>

      <section className="flex-1 overflow-auto px-1" aria-live="polite">
        <div className="space-y-3 max-w-3xl mx-auto">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          <div ref={endRef} />
        </div>
      </section>

      <footer className="mt-3">
  <MessageInput onSend={(text: string, meta?: { type?: 'income' | 'expense' | 'text'; amount?: number }) => addMessage(meta ? { from: 'me', text, ...meta } : { from: 'me', text })} />
      </footer>
    </main>
  );
}
