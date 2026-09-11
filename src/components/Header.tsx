import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab } from '../types';
import { ASSETS } from '../data/mockData';
import { Search, Bell, Menu, X, CheckCircle2, BookmarkCheck, Award, Languages } from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenRegisterModal: () => void;
  onOpenBilingualModal: () => void;
  userPoints: number;
  userEmail: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenRegisterModal,
  onOpenBilingualModal,
  userPoints,
  userEmail
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'trang-chu', label: 'Trang Chủ' },
    { id: 'khoi-10', label: 'Khối 10' },
    { id: 'khoi-11', label: 'Khối 11' },
    { id: 'khoi-12', label: 'Khối 12' },
    { id: 'ban-do-tuong-tac', label: 'Bản đồ tương tác' },
    { id: 'so-tay-hoc-tap', label: 'Sổ tay văn hóa' },
  ];

  const searchableTopics = [
    { title: 'Văn học TP.HCM trước năm 1975', tab: 'khoi-11' as NavigationTab, grade: 'Khối 11' },
    { title: 'Gia Định Báo (1865) & Báo chí quốc ngữ', tab: 'khoi-11' as NavigationTab, grade: 'Khối 11' },
    { title: 'Nhà văn Sơn Nam & Hương rừng Cà Mau', tab: 'khoi-11' as NavigationTab, grade: 'Khối 11' },
    { title: 'Nhà văn Bình Nguyên Lộc & Đò dọc', tab: 'khoi-11' as NavigationTab, grade: 'Khối 11' },
    { title: 'Học giả Trương Vĩnh Ký', tab: 'khoi-11' as NavigationTab, grade: 'Khối 11' },
    { title: 'Bạch Dinh (Villa Blanche) Vũng Tàu', tab: 'ban-do-tuong-tac' as NavigationTab, grade: 'Bản đồ' },
    { title: 'Bản đồ di sản TP.HCM & Vành đai đô thị', tab: 'ban-do-tuong-tac' as NavigationTab, grade: 'Bản đồ' },
    { title: 'Nghệ thuật Đờn ca tài tử & Cải lương', tab: 'khoi-11' as NavigationTab, grade: 'Khối 11' },
    { title: 'Địa hình, sông ngòi & Hệ sinh thái Cần Giờ', tab: 'khoi-10' as NavigationTab, grade: 'Khối 10' },
    { title: 'Đô thị Sáng tạo & Trung tâm Tài chính', tab: 'khoi-12' as NavigationTab, grade: 'Khối 12' }
  ];

  const filteredResults = searchQuery.trim() === '' ? [] : searchableTopics.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredResults.length > 0) {
      onSelectTab(filteredResults[0].tab);
      setShowSearchResults(false);
      setSearchQuery('');
    } else if (e.key === 'Escape') {
      setShowSearchResults(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fef7ff]/90 backdrop-blur-xl border-b border-[#e9dff2]/80 shadow-[0_4px_20px_-2px_rgba(138,104,168,0.08)]">
      <div className="h-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onSelectTab('trang-chu')}
          className="flex items-center gap-3 shrink-0 text-left cursor-pointer group"
          id="btn-brand-home"
        >
          <img
            alt="Logo Khám Phá TP.HCM"
            className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            src={ASSETS.logo}
          />
          <div className="flex flex-col">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base md:text-lg text-[#704f8d] tracking-tight leading-tight">
              KHÁM PHÁ TP. HỒ CHÍ MINH
            </span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] md:text-xs text-[#4b444e] font-medium hidden sm:block">
              Hành trình di sản & văn hóa học đường
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation Pill Bar */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#f9f0ff] p-1.5 rounded-full border border-[#eee4f7]">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                id={`nav-link-${item.id}`}
                className={`relative px-3.5 py-1.5 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#704f8d] rounded-full shadow-[0_4px_14px_rgba(138,104,168,0.3)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Search, Email Registration, Notification, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Input Box */}
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7c747f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Tra cứu di tích, bài học..."
              className="pl-9 pr-3 py-1.5 rounded-full bg-[#f9f0ff] border border-[#e9dff2] text-[#1e1926] placeholder:text-[#7c747f] text-xs font-['Be_Vietnam_Pro',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#704f8d]/40 w-36 lg:w-52 transition-all"
            />
            {/* Search Dropdown */}
            <AnimatePresence>
              {showSearchResults && filteredResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full mt-2 left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#e9dff2] p-2 z-50"
                  onMouseLeave={() => setShowSearchResults(false)}
                >
                  <div className="text-[11px] font-semibold text-[#704f8d] px-2 py-1">Gợi ý bài học & điểm đến:</div>
                  {filteredResults.map((res, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectTab(res.tab);
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-xl hover:bg-[#f9f0ff] flex items-center justify-between text-xs text-[#1e1926] transition-colors cursor-pointer"
                    >
                      <span className="truncate pr-2">{res.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#eee4f7] text-[#704f8d] font-semibold shrink-0">
                        {res.grade}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bilingual US English Dictionary Trigger */}
          <button
            onClick={onOpenBilingualModal}
            id="btn-bilingual-dictionary"
            title="Tra từ Song ngữ Việt - Anh (US)"
            className="relative hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f9f0ff] border border-[#deb7fe] text-[#704f8d] hover:bg-[#eee4f7] text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Languages className="w-3.5 h-3.5 text-[#704f8d]" />
            <span className="hidden md:inline">Song Ngữ US</span>
            <span className="text-[10px] px-1 rounded bg-[#704f8d] text-white font-mono">🇺🇸</span>
          </button>

          {/* Email Progress Registration Button */}
          <div className="relative flex flex-col items-center">
            <button
              onClick={onOpenRegisterModal}
              id="btn-register-email"
              className="relative hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold hover:bg-[#ebd978] shadow-[0_2px_8px_rgba(240,228,156,0.4)] transition-all cursor-pointer active:scale-95"
            >
              {userEmail ? 'Hồ Sơ Của Bạn' : 'Đăng ký Email cá nhân'}
            </button>
            <span className="hidden lg:block text-[9px] font-['Plus_Jakarta_Sans',sans-serif] text-[#685f26] uppercase font-bold tracking-wider mt-0.5">
              Email cá nhân tự do
            </span>
          </div>

          {/* Notification Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              id="btn-notifications"
              className="relative p-2 rounded-full text-[#4b444e] hover:bg-[#eee4f7] hover:text-[#1e1926] transition-all cursor-pointer"
              title="Thông báo học tập"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#fea619] rounded-full ring-2 ring-[#fef7ff]"></span>
            </button>

            {/* Notification Popup */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#e9dff2] p-3 z-50"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#eee4f7]">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#1e1926]">Thông báo học đường</span>
                    <span className="text-[10px] font-semibold text-[#704f8d] bg-[#f9f0ff] px-2 py-0.5 rounded-full">3 mới</span>
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="p-2 rounded-xl bg-[#f9f0ff] flex items-start gap-2 text-xs">
                      <Award className="w-4 h-4 text-[#fea619] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#1e1926]">Thử thách tuần 18 đã mở!</p>
                        <p className="text-[11px] text-[#4b444e]">Tham gia giải câu đố văn học để nhận ngay +50 điểm di sản.</p>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#f9f0ff] flex items-start gap-2 text-xs">
                      <BookmarkCheck className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#1e1926]">Chủ đề 1 Khối 11 đang diễn ra</p>
                        <p className="text-[11px] text-[#4b444e]">Bạn đã hoàn thành 50% tiến độ học tập văn học TP.HCM trước 1975.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Student Profile Avatar & Points Badge */}
          <button
            onClick={() => onSelectTab('so-tay-hoc-tap')}
            className="flex items-center gap-2 pl-1 cursor-pointer group"
            id="btn-user-profile"
            title="Xem sổ tay cá nhân"
          >
            <div className="relative">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#deb7fe] shadow-sm group-hover:ring-[#704f8d] transition-all"
                src={ASSETS.avatar}
              />
              <span className="absolute -bottom-1 -right-1 bg-[#704f8d] text-white text-[9px] font-bold px-1 rounded-full border border-white">
                {userPoints}
              </span>
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-[#4b444e] hover:bg-[#eee4f7] cursor-pointer"
            id="btn-mobile-menu"
            aria-label="Mở trình đơn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-[#fef7ff] border-b border-[#e9dff2] px-4 py-4 space-y-2 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#e9dff2]">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-left font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold transition-all cursor-pointer ${
                    currentTab === item.id
                      ? 'bg-[#704f8d] text-white shadow-sm'
                      : 'bg-[#f9f0ff] text-[#1e1926] hover:bg-[#eee4f7]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenBilingualModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#f9f0ff] border border-[#deb7fe] text-[#704f8d] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#eee4f7] transition-colors cursor-pointer"
              >
                <Languages className="w-4 h-4" />
                <span>Tra Từ Song Ngữ Việt - Anh (US) 🇺🇸</span>
              </button>
              <button
                onClick={() => {
                  onOpenRegisterModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#f0e49c] text-[#201c00] font-bold text-xs text-center hover:bg-[#ebd978] transition-colors cursor-pointer"
              >
                {userEmail ? `Hồ Sơ Cá Nhân (${userPoints} điểm)` : 'Đăng ký Email cá nhân lưu tiến trình'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
