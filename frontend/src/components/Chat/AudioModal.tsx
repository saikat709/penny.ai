import { useEffect } from 'react';
import gemini from '../../libs/genai';

type Props = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function AudioModal({ open, onClose, children }: Props) {
  


  useEffect(() => {
    async function main() {
      const response = await gemini.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: 'Why is the sky blue?',
      });
      console.log("Audio modal text: ", response.text);
    }
    main();

    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-dark-200 rounded-xl p-6 w-[min(720px,95%)] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Voice input</h3>
          <button onClick={onClose} className="p-2">Close</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
