import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, ShieldCheck } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveUser: (name: string, email: string, school: string) => void;
  currentName: string;
  currentEmail: string;
  currentSchool?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSaveUser,
  currentName,
  currentEmail,
  currentSchool = ''
}) => {
  const [name, setName] = useState(currentName || '');
  const [email, setEmail] = useState(currentEmail || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveUser(name, email, currentSchool);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 bg-white rounded-3xl max-w-md w-full border border-[#e9dff2] shadow-2xl overflow-hidden"
          >
            <div className="p-6 bg-[#f9f0ff] border-b border-[#eee4f7] flex items-center justify-between">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926]">
                  Hồ Sơ Cá Nhân & Sổ Tay Văn Hóa
                </h3>
                <p className="text-xs text-[#7c747f]">
                  Lưu tiến trình học tập, điểm số và sổ tay văn hóa
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white text-[#7c747f] hover:text-[#1e1926] cursor-pointer transition-colors"
                aria-label="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1e1926] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#704f8d]" />
                  Họ và tên của bạn
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  required
                  className="w-full px-3.5 py-2 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] text-xs font-['Be_Vietnam_Pro',sans-serif] text-[#1e1926] focus:outline-none focus:ring-2 focus:ring-[#704f8d]/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1e1926] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#704f8d]" />
                  Email cá nhân
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email.canhan@gmail.com"
                  required
                  className="w-full px-3.5 py-2 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] text-xs font-['Be_Vietnam_Pro',sans-serif] text-[#1e1926] focus:outline-none focus:ring-2 focus:ring-[#704f8d]/30"
                />
              </div>

              <div className="p-3 bg-[#f0e49c]/25 rounded-2xl border border-[#f0e49c] flex items-start gap-2 text-xs text-[#4b444e]">
                <ShieldCheck className="w-4 h-4 text-[#855300] shrink-0 mt-0.5" />
                <span>Tiến trình điểm số và sổ tay văn hóa được lưu tự động trên thiết bị cá nhân của bạn.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#4b444e] hover:bg-[#eee4f7] cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] cursor-pointer shadow-sm transition-all active:scale-95"
                >
                  Lưu Hồ Sơ
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
