'use client';

import { useAppState } from '@/hooks/useAppState';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

export default function Notifications() {
  const { notifications, removeNotification } = useAppState();
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`
              rounded-lg shadow-lg p-4 flex items-start max-w-md
              ${notification.type === 'success' ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100' : ''}
              ${notification.type === 'error' ? 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100' : ''}
              ${notification.type === 'info' ? 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100' : ''}
            `}
          >
            <div className="flex-1">{notification.message}</div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label="Close notification"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 