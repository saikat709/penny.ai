import { useState } from 'react';

type Props = {
  value: string[];
  onChange: (v: string[]) => void;
};

export default function RememberList({ value, onChange }: Props) {
  const [input, setInput] = useState('');

  const add = () => {
    const v = input.trim();
    if (!v) return;
    onChange([...value, v]);
    setInput('');
  };

  const removeAt = (i: number) => {
    const copy = [...value];
    copy.splice(i, 1);
    onChange(copy);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add something to remember"
          className="flex-1 p-3 rounded border"
        />
        <button onClick={add} className="btn btn-primary">Add</button>
      </div>

      <div className="space-y-2">
        {value.length === 0 ? (
          <div className="text-sm text-gray-500">No items yet.</div>
        ) : (
          value.map((it, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-dark-200 rounded border">
              <div className="text-sm">{it}</div>
              <button onClick={() => removeAt(i)} className="text-red-500 text-sm">Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
