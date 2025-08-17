import React, { useState } from 'react';
import ChatHistorySidebar from '../components/ChatHistorySidebar';
import ChatBubble from '../components/ChatBubble';
import Split from 'react-split';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface ChatMessage {
	message: string;
	isUser: boolean;
}

interface MessagesMap {
	[key: string]: ChatMessage[];
}

const mockChats = [
	{ id: '1', title: 'Chat with Penny' },
	{ id: '2', title: 'Car Support' },
	{ id: '3', title: 'General Inquiry' },
];

const mockMessages: MessagesMap = {
	'1': [
		{ message: 'Hello Penny!', isUser: true },
		{ message: 'Hi! How can I help you today?', isUser: false },
	],
	'2': [
		{ message: 'My car won’t start.', isUser: true },
		{ message: 'Let me check your vehicle status.', isUser: false },
	],
	'3': [
		{ message: 'What are your working hours?', isUser: true },
		{ message: 'We are available 24/7!', isUser: false },
	],
};

const ChatScreen: React.FC = () => {
	const [selectedChatId, setSelectedChatId] = useState<string>(mockChats[0].id);
	const [input, setInput] = useState<string>('');
	const [messages, setMessages] = useState<ChatMessage[]>(mockMessages[mockChats[0].id]);
	const [showSidebar, setShowSidebar] = useState<boolean>(false); // for mobile
	const [sidebarVisible, setSidebarVisible] = useState<boolean>(true); // for desktop

	React.useEffect(() => {
		setMessages(mockMessages[selectedChatId] || []);
	}, [selectedChatId]);

	// Detect mobile
	const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

	const handleSend = () => {
		if (!input.trim()) return;
		setMessages((prev: ChatMessage[]) => [...prev, { message: input, isUser: true }]);
		setInput('');
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-300 dark:to-dark-400 flex flex-col md:flex-row pt-16">
			
			{/* Main layout */}
			<div className="flex-1 flex w-full">
				{/* Desktop: Split with sidebar */}
				<div className="hidden md:flex w-full">
					{sidebarVisible ? (
						<Split
							className="flex w-full"
							sizes={[30, 70]}
							minSize={[240, 320]}
							maxSize={[400, Infinity]}
							gutterSize={8}
							cursor="col-resize"
						>
							<ChatHistorySidebar
								chats={mockChats}
								selectedChatId={selectedChatId}
								onSelectChat={setSelectedChatId}
							/>
							<main className="flex-1 flex flex-col justify-between p-4 relative">
								<div className="absolute top-1 left-0 right-0 h-1 mb-1">
									<ChevronLeftIcon className='w-12 h-12'/>
								</div>
								<div className="flex-1 overflow-y-auto mb-0">
									{messages.map((msg: ChatMessage, idx: number) => (
										<ChatBubble key={idx} message={msg.message} isUser={msg.isUser} />
									))}
								</div>
								<div className="flex gap-2">
									<input
										type="text"
										value={input}
										onChange={e => setInput(e.target.value)}
										placeholder="Type your message..."
										className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
									/>
									<button
										onClick={handleSend}
										className="px-6 py-3 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-400 transition-colors"
									>
										Send
									</button>
								</div>
							</main>
						</Split>
					) : (
						<main className="flex-1 flex flex-col justify-between p-4">
							<div className="flex-1 overflow-y-auto mb-0">
								{ messages.map((msg: ChatMessage, idx: number) => (
									<ChatBubble key={idx} message={msg.message} isUser={msg.isUser} />
								)) }
							</div>
							<div className="flex gap-2">
								<input
									type="text"
									value={input}
									onChange={e => setInput(e.target.value)}
									placeholder="Type your message..."
									className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
								/>
								<button
									onClick={handleSend}
									className="px-6 py-3 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-400 transition-colors"
								>
									Send
								</button>
							</div>
						</main>
					)}
				</div>
				{/* Mobile: sidebar overlays main */}
				<div className="md:hidden w-full relative">
					{showSidebar && (
						<div className="fixed inset-0 z-40 bg-black/40" onClick={() => setShowSidebar(false)}></div>
					)}
					<main className="flex-1 flex flex-col justify-between p-4">
						<div className="flex-1 overflow-y-auto mb-0">
							{messages.map((msg: ChatMessage, idx: number) => (
								<ChatBubble key={idx} message={msg.message} isUser={msg.isUser} />
							))}
						</div>
						<div className="flex gap-2">
							<input
								type="text"
								value={input}
								onChange={e => setInput(e.target.value)}
								placeholder="Type your message..."
								className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
							/>
							<button
								onClick={handleSend}
								className="px-6 py-3 rounded-lg bg-pink-500 text-white font-bold hover:bg-pink-400 transition-colors"
							>
								Send
							</button>
						</div>
					</main>
					{showSidebar && (
						<div className="fixed inset-0 z-50 flex">
							<div className="w-4/5 max-w-xs bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 text-white flex flex-col p-4">
								<button
									className="btn btn-secondary mb-4"
									onClick={() => setShowSidebar(false)}
								>
									Close
								</button>
								<ChatHistorySidebar
									chats={mockChats}
									selectedChatId={selectedChatId}
									onSelectChat={id => {
										setSelectedChatId(id);
										setShowSidebar(false);
									}}
								/>
							</div>
							<div className="flex-1" onClick={() => setShowSidebar(false)}></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatScreen;
