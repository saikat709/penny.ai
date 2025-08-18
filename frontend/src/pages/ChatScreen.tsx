import { useState } from 'react';
import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatWindow from '../components/Chat/ChatWindow';

export default function ChatScreen() {

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-ful bg-gray-50 dark:bg-dark-300 pt-16">
      <div className="container-custom py-6 flex flex-col md:flex-row gap-2">
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
