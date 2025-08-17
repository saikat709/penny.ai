import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <div className="relative bg-white dark:bg-dark-300 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 left-1/2 w-full bg-gradient-to-r from-primary-50/20 to-primary-100/30 dark:from-primary-900/10 dark:to-primary-800/20 transform -translate-x-1/2 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  Financial AI
                </span>
              </motion.div>
              
              <motion.h1 
                className="mt-4 heading-1 text-gray-900 dark:text-white tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Your Personal Financial AI Assistant
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Penny AI connects to your financial accounts and databases, providing instant insights, personalized consulting, and secure answers to all your financial questions. Get budgeting help, investment info, and real-time financial analysis—all in one place.
              </motion.p>
              
              <motion.div 
                className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link to="/register" className="btn btn-primary flex items-center">
                  <UserIcon className="h-5 w-5 mr-2" />
                  Create Account
                </Link>
              </motion.div>
              
              <motion.div 
                className="mt-12 grid grid-cols-3 gap-6 sm:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">99%</p>
                  <p className="mt-1 text-base text-gray-600 dark:text-gray-400">Financial data accuracy</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">24/7</p>
                  <p className="mt-1 text-base text-gray-600 dark:text-gray-400">Consulting availability</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">5s</p>
                  <p className="mt-1 text-base text-gray-600 dark:text-gray-400">Average query response</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-dark-200 shadow-xl rounded-2xl overflow-hidden transform md:rotate-1 sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg">
              <div className="px-6 pt-8 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Penny AI Financial Assistant</div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-100 dark:bg-dark-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-800 dark:text-gray-300">
                      <span className="font-medium text-primary-600 dark:text-primary-400">Penny AI:</span> Hello! How can I assist you with your finances today?
                    </p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg ml-8">
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      <span className="font-medium">You:</span> Can you show me my latest account balance and suggest ways to save more this month?
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-dark-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-800 dark:text-gray-300">
                      <span className="font-medium text-primary-600 dark:text-primary-400">Penny AI:</span> Your current balance is $5,200. Based on your spending, you could save an extra $300 by reducing dining out and optimizing your subscriptions. Would you like a detailed breakdown?
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-xs font-medium text-green-800 dark:text-green-300">
                    Financial Insights Delivered
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 