import { useEffect, useRef, useState } from 'react';

type Props = {
  onResult: (transcript: string, interim: string | null) => void;
  onStart?: () => void;
  onStop?: () => void;
};

export default function VoiceRecorder({ onResult, onStart, onStop }: Props) {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
  type SRCtor = new () => SpeechRecognition;
  const AnyWin = window as Window & { webkitSpeechRecognition?: SRCtor; SpeechRecognition?: SRCtor };
  const ctor: SRCtor | undefined = AnyWin.SpeechRecognition || AnyWin.webkitSpeechRecognition;
  if (!ctor) return;

  const r: SpeechRecognition = new ctor();
    r.continuous = true;
    r.interimResults = true;
    r.lang = 'en-US';

    r.onresult = (ev: SpeechRecognitionEvent) => {
      let final = '';
      let interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; ++i) {
        const res = ev.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      onResult(final, interim || null);
    };

    r.onerror = (e: Event) => {
      console.warn('Speech recognition error', e);
    };

  recognitionRef.current = r;
  }, [onResult]);

  const toggle = async () => {
    if (!recognitionRef.current) return;
    if (!recording) {
      try {
        recognitionRef.current.start();
        setRecording(true);
        onStart?.();
      } catch (e) {
        console.warn('start error', e);
      }
    } else {
      recognitionRef.current.stop();
      setRecording(false);
      onStop?.();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggle}
        className={`p-2 rounded-full transition-colors ${recording ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-dark-200'}`}
        title={recording ? 'Stop recording' : 'Start voice input'}
        aria-pressed={recording}
      >
        {recording ? 'Stop' : '🎤'}
      </button>
      <div className="text-xs text-gray-500 mt-1">{recording ? 'Listening…' : 'Voice'}</div>
    </div>
  );
}
