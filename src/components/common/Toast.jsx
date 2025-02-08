import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const colors = {
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
    success: 'bg-green-500',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 
          ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg
          flex items-center gap-2`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}; 