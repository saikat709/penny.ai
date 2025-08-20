import { useState, type FormEvent } from 'react';
import VoiceRecorder from './VoiceRecorder';
import AudioModal from './AudioModal';
import FilterSelect from './FilterSelect';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

type Props = {
  onSend: (text: string, meta?: { type?: 'income' | 'expense' | 'text'; amount?: number }) => void;
};

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState<string>('');
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
      {/* responsive layout: stack on small screens, horizontal on sm+ */}
      <form onSubmit={send} className="flex flex-col sm:flex-row items-end gap-2 w-full">
        <div className="flex items-center gap-1 flex-1 w-full">
          {/* combined select + textarea look */}
          <div className="flex items-stretch w-full rounded-lg border border-gray-200 dark:border-dark-100 bg-white dark:bg-dark-200">
            
            <div className="flex items-center justify-center px-2 sm:px-3 bg-gray-50 dark:bg-dark-300 border-r border-gray-200 dark:border-dark-100 w-20 sm:w-28">
              <FilterSelect id="filter-select" value={filter} onChange={(v) => setFilter(v)} />
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              placeholder="Send a message or say: 'I spent $12 on lunch'"
              className="flex-1 p-2 sm:p-3 resize-none focus:outline-none focus:ring-0 bg-transparent text-sm sm:text-base"
            />
          </div>

          {/* actions — horizontally aligned */}
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="p-1 sm:p-2 rounded-full bg-gray-100 dark:bg-dark-200 text-sm sm:text-base"
            title="Open voice input"
          >
            🎤
          </button>

          <button
            type="submit"
            className="btn btn-primary px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base"
            aria-label="Send message"
          >
            <PaperAirplaneIcon className="h-5 w-5 mr-2" />
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
