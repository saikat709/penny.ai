import { useState, type FormEvent } from 'react';
import VoiceRecorder from './VoiceRecorder';
import AudioModal from './AudioModal';

type Props = {
  onSend: (text: string, meta?: { type?: 'income' | 'expense' | 'text'; amount?: number }) => void;
};

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState<string>('');
  // default is 'agent' per requirement — treat it as non-clearable default
  const [filter, setFilter] = useState<'agent' | 'consultant' | 'learn'>('agent');
  const [openModal, setOpenModal] = useState(false);

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
   const amountMatch = text.match(/\$?([0-9]+(?:\.[0-9]{1,2})?)/);
    const amount = amountMatch ? Number(amountMatch[1]) : undefined;
  const type = amount && /income|salary|paid|received/i.test(text) ? 'income' : amount && /spent|bought|expense|dinner|lunch|coffee|restaurant/i.test(text) ? 'expense' : 'text';

  onSend(text, { amount, type });
    setText('');
  };

  return (
    <div className="w-full">
      {/* horizontal layout: left selection inside input, textarea, then actions */}
      <form onSubmit={send} className="flex items-end gap-2">
        <div className="flex items-center gap-2 flex-1">
          {/* combined select + textarea look */}
          <div className="flex items-stretch w-full rounded-lg border border-gray-200 dark:border-dark-100 overflow-hidden bg-white dark:bg-dark-200">
            <div className="flex items-center justify-center px-2 bg-gray-50 dark:bg-dark-300 border-r border-gray-200 dark:border-dark-100">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'agent' | 'consultant' | 'learn')}
                className="bg-transparent text-sm outline-none appearance-none px-1"
                aria-label="Select assistant"
              >
                <option value="agent">agent</option>
                <option value="consultant">consultant</option>
                <option value="learn">learn</option>
              </select>
                
              {/* show filter icon next to agent label when in 'agent' mood */}
              {filter === 'agent' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-600 mr-1"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18M6 12h12M10 19h4" />
                </svg>
              )}

              {/* clear button shown only when selection is NOT the default 'agent' */}
              {filter !== 'agent' && (
                <button
                  type="button"
                  onClick={() => setFilter('agent')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label="Clear selection"
                  title="Clear selection"
                >
                  ✖
                </button>
              )}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              placeholder="Send a message or say: 'I spent $12 on lunch'"
              className="flex-1 p-3 resize-none focus:outline-none focus:ring-0 bg-transparent"
            />
          </div>

          {/* actions — horizontally aligned */}
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="p-2 rounded-full bg-gray-100 dark:bg-dark-200"
            title="Open voice input"
          >
            🎤
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </form>
    <AudioModal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full text-center text-sm text-gray-500">Speak now — transcription will appear live</div>
          <div className="w-full p-4 bg-gray-50 dark:bg-dark-300 rounded-lg">
            <VoiceRecorder
              onResult={(transcript: string, interim: string | null) => {
                // update textarea with interim or final transcript
                setText((prev) => {
                  // if interim, show prev + interim; if final and it's different, append
                  if (interim) return prev + interim;
                  if (transcript) return prev + transcript + ' ';
                  return prev;
                });
              }}
              onStart={() => {}}
              onStop={() => {}}
            />
          </div>
          <div className="w-full flex justify-end">
            <button className="btn btn-secondary" onClick={() => setOpenModal(false)}>Done</button>
          </div>
        </div>
      </AudioModal>
    </div>
  );
}
