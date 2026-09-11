import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Sparkles, X } from 'lucide-react';

interface BilingualFloatingButtonProps {
  onOpenModal: (word?: string) => void;
}

export const BilingualFloatingButton: React.FC<BilingualFloatingButtonProps> = ({
  onOpenModal
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-none">
      {/* Floating Hint Banner (can be closed) */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 px-3.5 shadow-xl border border-[#e9dff2] flex items-center gap-2 max-w-[280px]"
          >
            <div className="w-6 h-6 rounded-lg bg-[#f0e49c] text-[#201c00] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#855300]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1e1926] flex items-center gap-1">
                <span>Song ngữ Việt - Anh (US)</span>
                <span>🇺🇸</span>
              </p>
              <p className="text-[10px] text-[#7c747f] leading-tight truncate">
                Tra không giới hạn mọi từ ngữ!
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => onOpenModal('Chào mừng')}
        title="Mở bộ tra từ Song ngữ Việt - Anh (US)"
        id="floating-bilingual-btn"
        className="pointer-events-auto px-4 py-3 rounded-full bg-gradient-to-r from-[#704f8d] to-[#553570] text-white shadow-[0_8px_25px_rgba(112,79,141,0.4)] flex items-center gap-2.5 font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold border border-[#deb7fe]/40 hover:shadow-[0_12px_30px_rgba(112,79,141,0.5)] transition-all cursor-pointer group"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
          <Languages className="w-3.5 h-3.5 text-[#f0e49c]" />
        </div>
        <span>Tra Từ Việt - Mỹ</span>
        <span className="px-1.5 py-0.5 rounded-full bg-[#f0e49c] text-[#201c00] text-[10px] font-extrabold font-mono">
          US 🇺🇸
        </span>
      </motion.button>
    </div>
  );
};
