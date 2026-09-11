import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthorProfile } from '../types';
import { X, BookOpen, Quote, Sparkles, Tag, Check } from 'lucide-react';

interface AuthorAnalysisModalProps {
  author: AuthorProfile | null;
  onClose: () => void;
  onShowToast: (title: string, message: string) => void;
  onSaveToNotebook?: (topic: string, content: string) => void;
}

export const AuthorAnalysisModal: React.FC<AuthorAnalysisModalProps> = ({
  author,
  onClose,
  onShowToast,
  onSaveToNotebook
}) => {
  return (
    <AnimatePresence>
      {author && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 bg-white rounded-3xl max-w-2xl w-full border border-[#e9dff2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-6 bg-[#f9f0ff] border-b border-[#eee4f7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm">
                  <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${author.roleColor}`}>
                    {author.role}
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#1e1926] mt-0.5">
                    {author.name} ({author.years})
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/80 text-[#7c747f] hover:text-[#1e1926] transition-colors cursor-pointer"
                aria-label="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto font-['Be_Vietnam_Pro',sans-serif]">
              {/* Quote */}
              <div className="p-4 rounded-2xl bg-[#f9f0ff] border-l-4 border-[#704f8d] flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#704f8d] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm italic text-[#1e1926] leading-relaxed">
                  "{author.quote}"
                </p>
              </div>

              {/* Key Works */}
              <div className="space-y-1.5">
                <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs uppercase tracking-wider text-[#704f8d] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Tác phẩm tiêu biểu
                </h4>
                <p className="text-xs text-[#1e1926] bg-[#fdfaff] p-3 rounded-xl border border-[#eee4f7] font-semibold">
                  {author.works}
                </p>
              </div>

              {/* Bio & Contribution */}
              <div className="space-y-1.5">
                <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs uppercase tracking-wider text-[#704f8d] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#fea619]" />
                  Đặc trưng phong cách nghệ thuật & Đóng góp cho văn hóa phương Nam
                </h4>
                <p className="text-xs sm:text-sm text-[#4b444e] leading-relaxed">
                  {author.bio}
                </p>
              </div>

              {/* Key Themes Chips */}
              {author.keyThemes && author.keyThemes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1e1926] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#704f8d]" />
                    Chủ đề & Cảm hứng trọng tâm:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {author.keyThemes.map((theme, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-[#f9f0ff] text-[#704f8d] border border-[#eee4f7] text-[11px] font-semibold"
                      >
                        #{theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Exam Tips for high school students */}
              <div className="p-4 bg-[#f0e49c]/30 rounded-2xl border border-[#f0e49c] space-y-1.5">
                <span className="text-[11px] font-bold text-[#855300] font-['Plus_Jakarta_Sans',sans-serif] block">
                  Ghi chú ôn tập cho học sinh lớp 11:
                </span>
                <ul className="text-xs text-[#4b444e] space-y-1 list-disc list-inside">
                  <li>Chú ý hệ thống phương ngữ Nam Bộ và khẩu khí bình dân phóng khoáng.</li>
                  <li>Liên hệ không gian địa lý: sông ngòi, kênh rạch, chợ nổi và lối sống trọng tình trọng nghĩa.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-[#eee4f7] flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  if (onSaveToNotebook) {
                    onSaveToNotebook(
                      `Tìm hiểu tác giả: ${author.name}`,
                      `Tác phẩm tiêu biểu: ${author.works}.\nTrích đoạn: "${author.quote}"\nCốt cách: ${author.bio.slice(0, 160)}...`
                    );
                  }
                  onShowToast("Đã lưu tác giả", `Đã lưu trích đoạn của ${author.name} vào sổ tay văn hóa.`);
                  onClose();
                }}
                className="px-4 py-2 rounded-full bg-[#f9f0ff] text-[#704f8d] hover:bg-[#eee4f7] text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] cursor-pointer transition-all"
              >
                Lưu Vào Sổ Tay Văn Hóa
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] cursor-pointer transition-all"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
