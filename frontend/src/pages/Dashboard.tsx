import { useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import type { AuthContextType } from '../custom_types/HookTypes';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { motion } from 'framer-motion';

type Tx = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
};

export default function Dashboard() {
  const auth = useAuth();
  // Auth provider historically exposed either `currentUser` or `user` in different places.
  // Prefer the typed `currentUser` from AuthContextType, but fall back to a possible `user` field.
  const typed = auth as AuthContextType & { user?: { name?: string; email?: string } };
  const user = typed.currentUser ?? typed.user ?? null;

  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<Array<{ month: string; balance: number; expenses: number; income: number }>>([]);
  const [transactions, setTransactions] = useState<Tx[]>([]);

  useEffect(() => {
    // Simulate fetching finance data. Replace with real API calls.
    setIsLoading(true);
    const timer = setTimeout(() => {
      const sampleMonthly = [
        { month: 'Jan', balance: 4200, expenses: 2100, income: 3000 },
        { month: 'Feb', balance: 3800, expenses: 2600, income: 2200 },
        { month: 'Mar', balance: 4500, expenses: 2000, income: 3000 },
        { month: 'Apr', balance: 5200, expenses: 1700, income: 2500 },
        { month: 'May', balance: 4800, expenses: 2000, income: 2500 },
        { month: 'Jun', balance: 5300, expenses: 1800, income: 2400 },
        { month: 'Jul', balance: 5600, expenses: 1600, income: 2600 },
        { month: 'Aug', balance: 5200, expenses: 1900, income: 2200 },
        { month: 'Sep', balance: 5400, expenses: 1500, income: 2100 },
        { month: 'Oct', balance: 6000, expenses: 2000, income: 3000 },
        { month: 'Nov', balance: 6500, expenses: 1800, income: 2300 },
        { month: 'Dec', balance: 7000, expenses: 1600, income: 2600 },
      ];

      const sampleTx: Tx[] = [
        { id: 't1', date: '2025-08-15', description: 'Salary', amount: 3000, type: 'credit' },
        { id: 't2', date: '2025-08-14', description: 'Groceries', amount: -120.45, type: 'debit' },
        { id: 't3', date: '2025-08-12', description: 'Electricity Bill', amount: -60.0, type: 'debit' },
        { id: 't4', date: '2025-08-10', description: 'Dining Out', amount: -45.5, type: 'debit' },
        { id: 't5', date: '2025-08-01', description: 'Subscription', amount: -12.99, type: 'debit' },
      ];

      setMonthlyData(sampleMonthly);
      setTransactions(sampleTx);
      setBalance(sampleMonthly[sampleMonthly.length - 1].balance);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const totalExpenses = useMemo(() => transactions.filter(t => t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0), [transactions]);
  const totalIncome = useMemo(() => transactions.filter(t => t.type === 'credit').reduce((s, t) => s + Math.abs(t.amount), 0), [transactions]);

  return (
    <div className="bg-gray-50 dark:bg-dark-300 min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Overview of your finances{user ? ` — ${user.name || user.email}` : ''}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500">Current Balance</p>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">{isLoading ? '—' : `$${balance.toLocaleString()}`}</div>
                  <div className="text-xs text-gray-500 mt-1">Available across linked accounts</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500">This Month Expenses</p>
              <div className="mt-2">
                <div className="text-2xl font-semibold text-rose-600">{isLoading ? '—' : `$${totalExpenses.toFixed(2)}`}</div>
                <div className="text-xs text-gray-500 mt-1">Includes all debit transactions</div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500">This Month Income</p>
              <div className="mt-2">
                <div className="text-2xl font-semibold text-green-600">{isLoading ? '—' : `$${totalIncome.toFixed(2)}`}</div>
                <div className="text-xs text-gray-500 mt-1">Net credits this month</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-dark-200 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Balance Over Time</h2>
                <div className="text-sm text-gray-500">Last 12 months</div>
              </div>

              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#4F46E5" strokeWidth={3} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Recent Transactions</h2>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {isLoading ? (
                  <div className="text-sm text-gray-500">Loading transactions...</div>
                ) : (
                  transactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{tx.description}</div>
                        <div className="text-xs text-gray-500">{tx.date}</div>
                      </div>
                      <div className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-rose-600'}`}>
                        {tx.type === 'credit' ? `+$${Math.abs(tx.amount).toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
