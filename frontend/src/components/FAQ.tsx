import { motion } from 'framer-motion';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "What is Penny AI?",
    answer: "Penny AI is a financial assistant powered by artificial intelligence, designed to provide personalized financial insights, answer queries, and help you manage your finances efficiently."
  },
  {
    question: "How does Penny AI access my financial data?",
    answer: "Penny AI securely connects to your financial accounts and databases using encrypted protocols. Your data is never shared with third parties and is used only to provide you with relevant financial information."
  },
  {
    question: "Can Penny AI help me create a budget?",
    answer: "Yes, Penny AI can analyze your income and expenses, suggest budget plans, and track your spending to help you stay within your financial goals."
  },
  {
    question: "Is my data safe with Penny AI?",
    answer: "Absolutely. Penny AI uses industry-standard security measures to protect your data, including encryption and secure authentication."
  },
  {
    question: "Can Penny AI provide investment advice?",
    answer: "Penny AI can offer general investment insights and help you understand different investment options. For personalized investment advice, please consult a licensed financial advisor."
  },
  {
    question: "How do I ask Penny AI a question?",
    answer: "Simply type your financial question in the chat interface. Penny AI can answer queries about your account balances, transactions, budgeting, and more."
  },
  {
    question: "Does Penny AI support multiple bank accounts?",
    answer: "Yes, Penny AI can connect to and manage information from multiple bank accounts, giving you a consolidated view of your finances."
  },
  {
    question: "Can Penny AI notify me about unusual account activity?",
    answer: "Yes, Penny AI can monitor your accounts and alert you to any unusual transactions or potential fraud."
  },
  {
    question: "Is Penny AI free to use?",
    answer: "Penny AI offers both free and premium plans. The free plan includes basic features, while premium plans provide advanced analytics and personalized consulting."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team via the chat interface or email us at support@penny.ai for assistance."
  }
];

export default function FAQ() {
  return (
    <div id="faq" className="bg-gray-50 dark:bg-dark-200">
      <div className="container-custom section">
        <div className="text-center">
          <motion.h2 
            className="heading-2 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything you need to know about Penny's roleplaying emergency service
          </motion.p>
        </div>

        <motion.div 
          className="mt-16 max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="py-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="text-left w-full flex justify-between items-center focus:outline-none">
                      <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                          className={`${open ? '-rotate-180' : 'rotate-0'} h-6 w-6 text-primary-600 dark:text-primary-400 transition-transform duration-200`}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-300">
            Have questions about our roleplaying emergency service?
          </p>
          <div className="mt-6">
            <a href="mailto:contact@pennyai.com" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 