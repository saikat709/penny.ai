import { useEffect, useState } from 'react';
import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatWindow from '../components/Chat/ChatWindow';
import type { Message } from '../custom_types/HookTypes';

export default function ChatScreen() {

  const [ isSidebarOpen, setSidebarOpen ] = useState(true);
  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ isHistoryLoading, setHistoryLoading ] = useState(false);
  const [ isChatLoading, setChatLoading ] = useState(false);

  useEffect(() => {
    
  }, []);

  return (
    <div className="h-ful bg-gray-50 dark:bg-dark-300 pt-14">
      <div className="container-custom py-6 flex flex-col md:flex-row gap-2 h-[95vh]">
        <ChatSidebar 
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          />
        <ChatWindow
          isOpen={isSidebarOpen}
          toggleSidebar={()=> setSidebarOpen(!isSidebarOpen)}
          />
      </div>
    </div>
  );
}
