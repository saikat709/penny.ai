import { useState } from 'react';
import VoiceRecorder from './VoiceRecorder';
import AudioModal from './AudioModal';

type Props = {
  onSend: (text: string, meta?: { type?: 'income' | 'expense' | 'text'; amount?: number }) => void;
};

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState<string>('');
  const [detectedAmount, setDetectedAmount] = useState<number | undefined>(undefined);
  const [filter, setFilter] = useState<'financial agent' | 'consultant' | 'learn'>('financial agent');
  const [openModal, setOpenModal] = useState(false);

  const send = () => {
    if (!text.trim()) return;
    // naive amount detection: look for $ or numbers
    const amountMatch = text.match(/\$?([0-9]+(?:\.[0-9]{1,2})?)/);
    const amount = amountMatch ? Number(amountMatch[1]) : undefined;
  const type = amount && /income|salary|paid|received/i.test(text) ? 'income' : amount && /spent|bought|expense|dinner|lunch|coffee|restaurant/i.test(text) ? 'expense' : 'text';

  onSend(text, { amount, type });
    setText('');
    setDetectedAmount(undefined);
  };

  return (
    <div className="w-full">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="Send a message or say: 'I spent $12 on lunch'"
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-dark-100 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {detectedAmount ? (
            <div className="text-sm text-gray-500 mt-1">Detected amount: ${detectedAmount}</div>
          ) : null}
        </div>

        <div className="flex flex-col items-center space-y-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value as 'financial agent' | 'consultant' | 'learn')} className="p-2 rounded border">
            <option value="financial agent">financial agent</option>
            <option value="consultant">consultant</option>
            <option value="learn">learn</option>
          </select>

          <button
            onClick={() => setOpenModal(true)}
            className="p-2 rounded-full bg-gray-100 dark:bg-dark-200"
            title="Open voice input"
          >
            🎤
          </button>

          <button
            onClick={send}
            className="btn btn-primary"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
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
