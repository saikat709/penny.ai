import React, { useState, useRef } from 'react';

const mockConversations = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  title: `Conversation ${i + 1}`,
  last: 'Quick summary or last message...',
}));

export default function ChatSidebar() {
  const [open, setOpen] = useState(true);
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

  return (
    <>
      <aside
        className={`relative transition-all duration-200 flex-shrink-0 ${open ? '' : 'hidden'}`}
        style={{ width: open ? width : 0 }}
        aria-hidden={!open}
      >
      <div className="glass-card h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">History</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">Recent chats</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
              aria-label={open ? 'Hide history' : 'Show history'}
            >
              {open ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="overflow-auto p-2 space-y-2">
          {mockConversations.map((c) => (
            <button
              key={c.id}
              className="w-full text-left p-3 rounded-md hover:bg-primary-50 dark:hover:bg-dark-200 transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{c.title}</div>
                <div className="text-xs text-gray-400">2h</div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{c.last}</div>
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
    </aside>
      {/* Floating show button when sidebar hidden */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-2 top-1/2 -translate-y-1/2 z-50 p-2 bg-white dark:bg-dark-200 rounded-r-md shadow-md"
          aria-label="Show history"
        >
          Show
        </button>
      )}
    </>
  );
}