import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatWindow from '../components/Chat/ChatWindow';

export default function ChatScreen() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-300">
      <div className="container-custom py-6 flex flex-col md:flex-row gap-4">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  );
}
