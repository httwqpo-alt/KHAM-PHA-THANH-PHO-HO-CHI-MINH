import React from 'react';
import { NavigationTab } from '../types';
import { ASSETS } from '../data/mockData';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
  onOpenRegisterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenRegisterModal }) => {
  return (
    <footer className="w-full bg-[#f9f0ff] border-t border-[#e9dff2]/80 mt-16 text-[#1e1926]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                alt="Logo Khám Phá TP.HCM"
                className="h-8 w-auto object-contain"
                src={ASSETS.logo}
              />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#704f8d]">
                KHÁM PHÁ TP.HCM
              </span>
            </div>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
              Dự án Giáo Dục Địa Phương Thành phố Hồ Chí Minh dành riêng cho học sinh trung học phổ thông khối 10, 11 và 12, thắp lửa tình yêu văn hóa và bản sắc phương Nam.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold">
                Chương trình GDPT 2018
              </span>
            </div>
          </div>

          {/* Col 2: Grades */}
          <div className="flex flex-col gap-1.5">
            <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926] mb-1">
              Khối Lớp Trọng Tâm
            </h4>
            <button
              onClick={() => onSelectTab('khoi-10')}
              className="text-left text-xs text-[#4b444e] hover:text-[#704f8d] transition-colors py-1 cursor-pointer"
            >
              Khối 10: Đất Phương Nam & Cội Nguồn
            </button>
            <button
              onClick={() => onSelectTab('khoi-11')}
              className="text-left text-xs text-[#4b444e] hover:text-[#704f8d] transition-colors py-1 cursor-pointer font-medium text-[#704f8d]"
            >
              Khối 11: Văn Học & Di Sản Nghệ Thuật
            </button>
            <button
              onClick={() => onSelectTab('khoi-12')}
              className="text-left text-xs text-[#4b444e] hover:text-[#704f8d] transition-colors py-1 cursor-pointer"
            >
              Khối 12: Đô Thị Xanh & Hội Nhập Toàn Cầu
            </button>
            <button
              onClick={() => onSelectTab('ban-do-tuong-tac')}
              className="text-left text-xs text-[#4b444e] hover:text-[#704f8d] transition-colors py-1 cursor-pointer"
            >
              Bản Đồ 24 Quận Huyện Di Tích
            </button>
          </div>

          {/* Col 3: Student Hub & Study */}
          <div className="flex flex-col gap-1.5">
            <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926] mb-1">
              Góc Học Sinh & Ôn Tập
            </h4>
            <button
              onClick={() => onSelectTab('so-tay-hoc-tap')}
              className="text-left text-xs text-[#4b444e] hover:text-[#704f8d] transition-colors py-1 cursor-pointer"
            >
              Sổ Tay Văn Hóa
            </button>
            <button
              onClick={() => onSelectTab('trang-chu')}
              className="text-left text-xs text-[#4b444e] hover:text-[#704f8d] transition-colors py-1 cursor-pointer"
            >
              Bộ Ngân Hàng Câu Hỏi Trắc Nghiệm
            </button>
            <button
              onClick={() => onSelectTab('khoi-11')}
              className="text-left text-xs text-[#4b444e] hover:text-[#704f8d] transition-colors py-1 cursor-pointer"
            >
              Tài Liệu Dành Cho Giáo Viên & Học Sinh
            </button>
            <button
              onClick={onOpenRegisterModal}
              className="text-left text-xs text-[#4b444e] hover:text-[#704f8d] transition-colors py-1 cursor-pointer"
            >
              Kiểm Tra Huy Hiệu & Tiến Trình
            </button>
          </div>

          {/* Col 4: Rights & Partners */}
          <div className="flex flex-col gap-2">
            <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926] mb-1">
              Bản Quyền & Hợp Tác
            </h4>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
              Nội dung học liệu số hóa thuộc đề án Giáo dục Lịch sử - Địa lý & Bản sắc Văn hóa Sài Gòn – TP.HCM. Tích hợp tương tác trải nghiệm thực tế ảo.
            </p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#7c747f] mt-1 italic">
              Sở GD&ĐT TP. Hồ Chí Minh phối hợp cùng các trường THPT trọng điểm.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-4 border-t border-[#e9dff2] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e]">
            © 2024 Dự án Giáo dục số Khám Phá TP. Hồ Chí Minh. Bản quyền nội dung giáo dục được bảo lưu.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#4b444e]">
            <span className="hover:text-[#704f8d] cursor-pointer">Điều khoản sử dụng</span>
            <span>•</span>
            <span className="hover:text-[#704f8d] cursor-pointer">Chính sách bảo mật học đường</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
