import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { 
  ShieldCheckIcon, 
  EyeSlashIcon, 
  MicrophoneIcon, 
  ClockIcon, 
  LockClosedIcon, 
  UserGroupIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Secure Account Linking',
    description: 'Connect your bank accounts and financial databases with industry-leading security and privacy.',
    icon: LockClosedIcon,
  },
  {
    name: 'Instant Financial Insights',
    description: 'Get real-time account balances, transaction history, and spending breakdowns at your fingertips.',
    icon: ClockIcon,
  },
  {
    name: 'Personalized Consulting',
    description: 'Receive tailored financial advice and recommendations based on your unique goals and habits.',
    icon: UserGroupIcon,
  },
  {
    name: 'Smart Budgeting Tools',
    description: 'Track your expenses, set budgets, and get actionable tips to save more every month.',
    icon: MicrophoneIcon,
  },
  {
    name: 'Investment Insights',
    description: 'Access market trends, portfolio analysis, and general investment guidance to grow your wealth.',
    icon: EyeSlashIcon,
  },
  {
    name: '24/7 Private Support',
    description: 'Penny AI is always available to answer your financial questions—securely and privately.',
    icon: ShieldCheckIcon,
  },
];

export default function Features() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div id="features" className="bg-white dark:bg-dark-300">
      <div className="container-custom section">
        <div className="text-center">
          <motion.h2 
            className="heading-2 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Penny AI Financial Features
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover how Penny AI empowers you to manage, analyze, and optimize your finances with smart, secure, and personalized tools.
          </motion.p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name} 
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
              >
                <div className="relative pb-12">
                  <div className="relative flex items-center justify-center h-16 w-16 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 transition-colors duration-200">
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 shadow-xl">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:py-20 lg:pl-16 lg:pr-20">
              <div className="lg:w-0 lg:flex-1">
                <h3 className="text-3xl font-bold tracking-tight text-white">
                  Experience Smart Financial Assistance
                </h3>
                <p className="mt-4 max-w-3xl text-lg text-primary-100">
                  Try our interactive demo to see how Penny AI delivers instant financial insights, personalized consulting, and secure support for all your financial needs.
                </p>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
                <div className="sm:flex sm:flex-col sm:items-center lg:items-start">
                  <div className="sm:flex space-x-4">
                    {isAuthenticated ? (
                      <button
                        className="flex items-center justify-center rounded-md border border-white border-opacity-25 bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
                        onClick={() => navigate('/profile')}
                      >
                        Go to Dashboard
                      </button>
                    ) : (
                      <Link
                        to="/register"
                        className="flex items-center justify-center rounded-md border border-white border-opacity-25 bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
                      >
                        Create Account
                      </Link>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-primary-100 text-center sm:text-left">
                    Create an account for full access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 