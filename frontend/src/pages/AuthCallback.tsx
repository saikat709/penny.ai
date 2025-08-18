import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthCallback() {
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [status, setStatus] = useState('initializing');
  const navigate = useNavigate();
  const location = useLocation();

  // Parse OAuth callback params (query string and hash), log them to the browser console
  useEffect(() => {
    // Helper to parse a query/hash string into an object
    const parse = (str = '') => {
      if (!str) return {};
      const cleaned = str.startsWith('#') || str.startsWith('?') ? str.substring(1) : str;
      return Object.fromEntries(new URLSearchParams(cleaned));
    };

    const queryParams = parse(location.search);
    const hashParams = parse(location.hash);

    const code = queryParams.code || hashParams.code || null;
    const id_token = queryParams.id_token || hashParams.id_token || null;
    const access_token = queryParams.access_token || hashParams.access_token || null;
    const errorParam = queryParams.error || hashParams.error || null;

    const info = {
      code,
      id_token,
      access_token,
      error: errorParam,
      queryParams,
      hashParams,
    };

    // IMPORTANT: this logs sensitive tokens to the browser console for local debugging only.
    // Remove these logs before deploying to production.
    console.log('AuthCallback - OAuth data:', info);
    setDebugInfo(JSON.stringify(info, null, 2));

    if (errorParam) {
      setError(errorParam);
      setStatus('error');
      setLoading(false);
      return;
    }

    // If we have at least one token/code, treat as success and start redirect countdown
    if (code || id_token || access_token) {
      setStatus('success');
      setLoading(false);

      // start countdown to redirect back to profile (or adjust as needed)
      let cd = 3;
      setCountdown(cd);
      const t = setInterval(() => {
        cd -= 1;
        setCountdown(cd);
        if (cd <= 0) {
          clearInterval(t);
          navigate('/profile');
        }
      }, 1000);

      return () => clearInterval(t);
    }

    // No params found - stop loading and show error
    setLoading(false);
    setStatus('error');
    setError('No authentication information found in callback URL.');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);


  // Handle countdown for redirect

  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Render different UI states
  const renderContent = () => {
    if (loading) {
      return (
        <motion.div 
          className="flex flex-col items-center justify-center py-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex justify-center items-center w-20 h-20 rounded-full bg-primary-50 dark:bg-primary-900/20 mb-6"
            variants={itemVariants}
          >
            <svg className="animate-spin h-10 w-10 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
            variants={itemVariants}
          >
            Completing Sign In
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            variants={itemVariants}
          >
            Just a moment while we verify your authentication...
          </motion.p>
          <motion.div 
            className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 h-1 rounded-full mt-6 overflow-hidden"
            variants={itemVariants}
          >
            <motion.div 
              className="h-full bg-primary-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
            />
          </motion.div>
        </motion.div>
      );
    } else if (status === 'error') {
      return (
        <motion.div 
          className="flex flex-col items-center justify-center py-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex justify-center items-center w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 mb-6"
            variants={itemVariants}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
            variants={itemVariants}
          >
            Authentication Error
          </motion.h1>
          <motion.p 
            className="text-red-600 dark:text-red-400 text-center max-w-sm mb-6"
            variants={itemVariants}
          >
            {error}
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Return to Login</span>
          </motion.button>
          
          {/* Debug information - collapsible */}
          {debugInfo && (
            <motion.div 
              className="w-full max-w-lg mt-8" 
              variants={itemVariants}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <details className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <summary className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Show Debug Information
                </summary>
                <pre className="p-4 text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap border-t border-gray-200 dark:border-gray-700">
                  {debugInfo}
                </pre>
              </details>
            </motion.div>
          )}
        </motion.div>
      );
    } else {
      return (
        <motion.div 
          className="flex flex-col items-center justify-center py-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex justify-center items-center w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 mb-6"
            variants={itemVariants}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
            variants={itemVariants}
          >
            Sign In Successful!
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-center mb-2"
            variants={itemVariants}
          >
            Your authentication was successful. You'll be redirected in:
          </motion.p>
          <motion.div 
            className="flex justify-center items-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-800/30 mb-4 font-bold text-primary-600 dark:text-primary-400 text-xl"
            variants={itemVariants}
          >
            {countdown}
          </motion.div>
          <motion.div 
            className="flex space-x-4"
            variants={itemVariants}
          >
            <button
              onClick={() => navigate('/profile')}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow transition-all duration-200"
            >
              Go to Profile
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow transition-all duration-200"
            >
              Go to Home
            </button>
          </motion.div>
          
          {/* Progress bar for countdown */}
          <motion.div 
            className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 h-1 rounded-full mt-6 overflow-hidden"
            variants={itemVariants}
          >
            <motion.div 
              className="h-full bg-primary-500"
              initial={{ width: "100%" }}
              animate={{ width: `${(countdown / 3) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </motion.div>
      );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-dark-300 min-h-screen">
      <div className="container-custom py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-1">
            <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-primary-500 to-blue-500 rounded-t-lg"></div>
          </div>
          <div className="p-6 sm:p-10">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 