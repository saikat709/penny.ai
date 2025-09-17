import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
// import { XMarkIcon } from '@heroicons/react/24/solid';

const mockConversations = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  last: `Conversation ${i + 1}`,
  title: 'Quick summary or last message...',
}));


type ChatSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ChatSidebar({isOpen = true, onClose}: ChatSidebarProps) {
  const [width, setWidth] = useState(320);
  const resizing = useRef(false);

  const startResize = (e: React.MouseEvent) => {
    resizing.current = true;
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!resizing.current) return;
    const next = Math.max(200, Math.min(520, e.clientX - 40));
    setWidth(next);
  };

  const onMouseUp = () => {
    resizing.current = false;
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);


  const handleHistoryClick = (id: number) => {
    // TODO: Replace with actual conversation selection logic
    console.log('Selected conversation:', id);
  }

  return (
    <>
      <motion.aside
        className={ `absolute top-16 left-1 md:block md:relative md:top-0 md:left-0 z-10 transition-all duration-200 flex-shrink-0 ${isOpen ? '' : 'hidden'}`}
        style={{ width: isOpen ? width : 0 }}
        aria-hidden={!open}
      >
      <div className="glass-card h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">History</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">Recent chats</span>
          </div>
            <button
              className="flex items-center space-x-2 p-1 px-3 rounded-md bg-green-100 hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              type="button"
              >
              <ChatBubbleLeftIcon className="h-6 w-6 text-green-600" />
              <span className="font-semibold text-green-700">New Chat</span>
            </button>
          {/* <XMarkIcon className='h-6 w-6 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300' onClick={onClose} /> */}
        </div>

        <div className="overflow-auto p-2 space-y-2">
          {mockConversations.map((c) => (
            <button
              key={c.id}
              onClick={ () => handleHistoryClick(c.id) }
              className="w-full text-left p-2 rounded-md transition-colors flex flex-col hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="button"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{c.title}</div>
                {/* <div className="text-xs text-gray-400">2h</div> */}
              </div>
              {/* <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{c.last}</div> */}
            </button>
          ))}
        </div>

        {/* Resizer handle (desktop only) */}
        <div
          onMouseDown={startResize}
          className="hidden md:block absolute top-0 right-0 h-full w-2 cursor-col-resize"
          style={{ touchAction: 'none' }}
          title="Drag to resize"
        >
          <div className="h-full w-full hover:bg-blue-500/20" />
        </div>
      </div>
    </motion.aside>
    </>
  );
}