import { motion } from 'framer-motion';
import { PhoneIcon, EyeSlashIcon, ArrowPathIcon, BoltIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    id: 1,
    name: 'Connect Your Accounts',
    description: 'Securely link your bank accounts and financial databases to Penny AI for personalized insights.',
    icon: PhoneIcon,
  },
  {
    id: 2,
    name: 'Ask Any Financial Question',
    description: 'Chat naturally with Penny AI to get answers about balances, transactions, budgeting, and investments.',
    icon: EyeSlashIcon,
  },
  {
    id: 3,
    name: 'Get Instant Insights',
    description: 'Receive real-time analysis, spending breakdowns, and saving suggestions tailored to your goals.',
    icon: ArrowPathIcon,
  },
  {
    id: 4,
    name: 'Consult & Optimize',
    description: 'Get actionable advice and financial consulting to optimize your finances and plan for the future.',
    icon: BoltIcon,
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="relative bg-gray-50 dark:bg-dark-200 overflow-hidden">
      <div className="container-custom section">
        <div className="text-center">
          <motion.h2 
            className="heading-2 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How Penny AI Works
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Penny AI connects to your financial accounts, answers your questions, and provides instant, actionable insights to help you manage and optimize your finances.
          </motion.p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 lg:grid-cols-4 md:gap-x-6 lg:gap-x-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="relative">
                  <div className="flex items-center justify-center mx-auto h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                    <step.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full h-0.5 w-16 bg-gradient-to-r from-primary-500 to-primary-300 dark:from-primary-700 dark:to-primary-500"></div>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">{step.name}</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Why Choose Penny AI?</h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Penny AI empowers you to take control of your finances with smart, secure, and personalized assistance:
                  </p>
                  <ul className="mt-6 space-y-4 text-gray-600 dark:text-gray-300">
                    <li className="flex">
                      <svg className="flex-shrink-0 h-6 w-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Instant account balance and transaction info</span>
                    </li>
                    <li className="flex">
                      <svg className="flex-shrink-0 h-6 w-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Personalized budgeting and saving tips</span>
                    </li>
                    <li className="flex">
                      <svg className="flex-shrink-0 h-6 w-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Investment insights and financial consulting</span>
                    </li>
                    <li className="flex">
                      <svg className="flex-shrink-0 h-6 w-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Secure, private, and always available</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-dark-300 p-6 rounded-xl shadow-md">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Financial Analysis</h4>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Penny AI analyzes your financial data to provide:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2"></div>
                      <span>Spending breakdowns and trends</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2"></div>
                      <span>Personalized saving recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2"></div>
                      <span>Investment and portfolio insights</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2"></div>
                      <span>Alerts for unusual account activity</span>
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center">
                    <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <p className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">99.7% accuracy</span> in financial data analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 