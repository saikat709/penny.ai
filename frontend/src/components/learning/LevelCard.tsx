import { motion } from 'framer-motion';

type Props = {
  id: string;
  title: string;
  summary: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  onOpen: (id: string) => void;
};

export default function LevelCard({ id, title, summary, difficulty = 'Beginner', progress, onOpen }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white/80 dark:bg-dark-100/60 backdrop-blur-md rounded-2xl p-5 shadow-md border border-white/10 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{summary}</p>
          <div className="mt-3 flex items-center space-x-3">
            <span className="px-2 py-1 rounded-full text-xs bg-primary-50 text-primary-700 dark:bg-primary-900/20">{difficulty}</span>
            <button onClick={() => onOpen(id)} className="text-sm text-primary-600 dark:text-primary-300 font-medium">Open</button>
          </div>
        </div>
        <div className="w-24 text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
          <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-dark-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-width" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">{progress}%</div>
        </div>
      </div>
    </motion.div>
  );
}
