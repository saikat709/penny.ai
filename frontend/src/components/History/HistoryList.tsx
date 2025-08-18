import HistoryItem from './HistoryItem';

type Entry = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note?: string;
  date: string; // ISO
};

export default function HistoryList({ items }: { items: Entry[] }) {
  if (!items.length) return <div className="p-4 text-center text-gray-500">No entries</div>;

  return (
    <div className="divide-y divide-gray-100 dark:divide-dark-200">
      {items.map((it) => (
        <HistoryItem key={it.id} item={it} />
      ))}
    </div>
  );
}
