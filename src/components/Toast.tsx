import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  toast: {
    id: number;
    title: string;
    message: string;
  } | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 right-5 z-50 max-w-sm w-full"
        >
          <div className="bg-[#1e1926] text-white p-4 rounded-2xl shadow-2xl border border-[#704f8d] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#fea619] shrink-0 mt-0.5" />
            <div className="flex-1 space-y-0.5">
              <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-white">
                {toast.title}
              </h4>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#cdc3d0] leading-snug">
                {toast.message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#cdc3d0] hover:text-white p-0.5 cursor-pointer transition-colors"
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
