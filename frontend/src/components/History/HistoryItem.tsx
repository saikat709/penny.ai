import React from 'react';

type Entry = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note?: string;
  date: string; // ISO
};

export default function HistoryItem({ item }: { item: Entry }) {
  const { type, amount, category, note, date } = item;
  const positive = type === 'income';

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${positive ? 'bg-green-100' : 'bg-red-100'}`}>
          <div className={`${positive ? 'text-green-700' : 'text-red-700'} font-semibold`}>{positive ? '+' : '-'}</div>
        </div>

        <div>
          <div className="font-medium">{category}</div>
          <div className="text-sm text-gray-500">{note}</div>
        </div>
      </div>

      <div className="text-right">
        <div className={`font-semibold ${positive ? 'text-green-700' : 'text-red-700'}`}>{positive ? `+$${amount.toFixed(2)}` : `-$${amount.toFixed(2)}`}</div>
        <div className="text-xs text-gray-400">{new Date(date).toLocaleString()}</div>
      </div>
    </div>
  );
}
