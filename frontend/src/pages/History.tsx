import { useMemo, useState } from 'react';
import HistoryList from '../components/History/HistoryList';

type Entry = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note?: string;
  date: string; // ISO
};

const MOCK: Entry[] = [
  { id: '1', type: 'income', amount: 3500, category: 'Salary', note: 'August salary', date: '2025-08-01T09:00:00Z' },
  { id: '2', type: 'expense', amount: 48.25, category: 'Dining', note: 'Dinner with friends', date: '2025-08-05T19:30:00Z' },
  { id: '3', type: 'expense', amount: 12.5, category: 'Coffee', note: 'Morning coffee', date: '2025-08-07T08:15:00Z' },
  { id: '4', type: 'income', amount: 120.0, category: 'Refund', note: 'Returned item', date: '2025-08-10T12:00:00Z' },
  { id: '5', type: 'expense', amount: 220.0, category: 'Groceries', note: 'Weekly shop', date: '2025-08-12T16:45:00Z' },
];

export default function History() {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [search, setSearch] = useState('');

  const items = useMemo(() => {
    return MOCK.filter((i) => {
      if (filter !== 'all' && i.type !== filter) return false;
      if (search && !(`${i.category} ${i.note ?? ''}`.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    }).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [filter, search]);

  const total = items.reduce((s, it) => (it.type === 'income' ? s + it.amount : s - it.amount), 0);

  return (
    <div className="bg-gray-50 dark:bg-dark-300 py-8 pt-18">
      <div className="container-custom">
        <div className="glass-card p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold">History</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your incomes and expenses at a glance</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-sm">
                Net: <span className={`font-semibold ${total >= 0 ? 'text-green-700' : 'text-red-700'}`}>{total >= 0 ? `+$${total.toFixed(2)}` : `-${Math.abs(total).toFixed(2)}`}</span>
              </div>

              <div className="flex items-center space-x-2 flex-wrap">
                <select value={filter} onChange={(e) => setFilter(e.target.value as 'all' | 'income' | 'expense')} className="p-2 rounded border">
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search category or note" className="p-2 rounded border" />

                <button className="btn btn-secondary">Export</button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <HistoryList items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
