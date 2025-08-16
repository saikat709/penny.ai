import React, { useState } from 'react';
import ChatHistorySidebar from '../components/ChatHistorySidebar';
import ChatBubble from '../components/ChatBubble';

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

	React.useEffect(() => {
		setMessages(mockMessages[selectedChatId] || []);
	}, [selectedChatId]);

	const handleSend = () => {
		if (!input.trim()) return;
		setMessages((prev: ChatMessage[]) => [...prev, { message: input, isUser: true }]);
		setInput('');
	};

	return (
		<div className="flex bg-gray-900 h-full">
			<ChatHistorySidebar
				chats={mockChats}
				selectedChatId={selectedChatId}
				onSelectChat={setSelectedChatId}
			/>
			<main className="flex-1 flex flex-col justify-between p-4">
				<div className="flex-1 overflow-y-auto mb-2">
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
		</div>
	);
};

export default ChatScreen;
