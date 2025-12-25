'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ClipboardList } from 'lucide-react';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewApps: () => void;
}

export const CongratulationsModal = ({ isOpen, onClose, onViewApps }: CongratulationsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {/* Decorative background elements */}
           <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
        </div>

        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
        >
          <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            className="absolute inset-0 rounded-full border-4 border-green-200"
          />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">Application Sent!</h2>
        <p className="text-gray-500 mb-8 relative z-10">
          Congratulations! Your application has been successfully submitted. Good luck!
        </p>

        <div className="space-y-3 relative z-10">
          <button 
            onClick={onViewApps}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-4 h-4" /> View My Applications
          </button>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </motion.div>
    </div>
  );
};
