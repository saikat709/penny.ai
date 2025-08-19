import { motion } from 'framer-motion';

type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  subtitle?: string;
};

export default function ChoiceCard({ label, active, onClick, subtitle }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border transition-colors w-full text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 ${active ? 'bg-primary-100 text-black border-primary-200 ring-1 ring-primary-100' : 'bg-white dark:bg-dark-200 border-gray-100 dark:border-dark-200'}`}
      onClick={onClick}
    >
      <div className="text-xl font-semibold leading-tight text-center">{label}</div>
      {subtitle ? <div className="text-sm text-gray-500 mt-1">{subtitle}</div> : null}
    </motion.button>
  );
}
