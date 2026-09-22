import React, { useState, useEffect } from 'react';
import { 
  BILINGUAL_CUISINE_DATA, 
  CuisineHandbookPage, 
  CuisineHandbookLanguageData,
  CuisineDishItem
} from '../data/bilingualCuisineData';
import { 
  Languages, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Utensils, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Download,
  Share2,
  X
} from 'lucide-react';

interface BilingualCuisineHandbookViewerProps {
  onAddPoints?: (points: number) => void;
  onShowToast?: (title: string, message: string) => void;
  initialLanguage?: 'vi' | 'en';
}

export const BilingualCuisineHandbookViewer: React.FC<BilingualCuisineHandbookViewerProps> = ({
  onAddPoints,
  onShowToast,
  initialLanguage = 'vi'
}) => {
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>(initialLanguage);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slide' | 'grid'>('slide');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [readPages, setReadPages] = useState<Set<number>>(new Set([1]));
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<CuisineDishItem | null>(null);

  const handbookData: CuisineHandbookLanguageData = BILINGUAL_CUISINE_DATA[currentLang];
  const currentPage: CuisineHandbookPage = handbookData.pages[currentPageIdx];

  // Speech synthesis
  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      onShowToast?.("Không hỗ trợ âm thanh", "Trình duyệt không hỗ trợ phát âm thanh tổng hợp.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    let textToRead = "";
    if (currentPage.type === 'cover') {
      textToRead = `${currentPage.title} ${currentPage.subtitle || ''}. ${handbookData.badge}`;
    } else {
      textToRead = `${currentPage.title}. ${currentPage.subtitle || ''}. `;
      currentPage.dishes.forEach((d) => {
        textToRead += `${d.name}: ${d.desc}. `;
      });
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = currentLang === 'vi' ? 'vi-VN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentPageIdx, currentLang]);

  const handleNextPage = () => {
    if (currentPageIdx < handbookData.pages.length - 1) {
      const nextIdx = currentPageIdx + 1;
      setCurrentPageIdx(nextIdx);
      markPageRead(nextIdx + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      setCurrentPageIdx(currentPageIdx - 1);
    }
  };

  const markPageRead = (pageNo: number) => {
    if (!readPages.has(pageNo)) {
      const updated = new Set(readPages).add(pageNo);
      setReadPages(updated);
      onAddPoints?.(15);
      if (updated.size === handbookData.pages.length) {
        onShowToast?.(
          "Hoàn thành Cẩm nang Ẩm thực!", 
          `Bạn đã đọc trọn vẹn cả 5 trang của Cẩm nang Ẩm thực (${currentLang === 'vi' ? 'Tiếng Việt' : 'English'}).`
        );
      }
    }
  };

  const handleDownloadHandbook = () => {
    onShowToast?.(
      "In / Tải cẩm nang", 
      `Đang mở chế độ in/lưu PDF cho Cẩm nang Ẩm thực (${currentLang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'}).`
    );
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast?.("Đã sao chép liên kết", "Bạn có thể chia sẻ Cẩm nang Ẩm thực này với bạn bè!");
    }
  };

  return (
    <div className={`space-y-6 transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-[#2b1605] overflow-y-auto p-4 sm:p-8 flex flex-col justify-between' 
        : 'relative'
    }`}>
      {/* Top Controls Bar */}
      <div className="bg-[#4a1d04] border-2 border-[#d99b26] p-4 sm:p-5 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4 text-[#fff9eb]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#f5cb42] text-[#3d1a04] flex items-center justify-center font-bold shadow-md">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-base sm:text-lg text-[#ffd166] tracking-wide">
                {handbookData.title}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f5cb42]/20 text-[#ffd166] border border-[#f5cb42]/40">
                {currentLang === 'vi' ? 'Bản Gốc Tiếng Việt' : 'English Edition'}
              </span>
            </div>
            <p className="text-xs font-['Be_Vietnam_Pro',sans-serif] text-[#f7e3af]">
              {handbookData.badge} • 5 Trang đầy đủ, giữ nguyên toàn bộ nội dung & hình ảnh
            </p>
          </div>
        </div>

        {/* Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#2d1102] p-1 rounded-full border border-[#d99b26]/50">
            <button
              onClick={() => setCurrentLang('vi')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentLang === 'vi'
                  ? 'bg-[#f5cb42] text-[#3d1a04] shadow-md'
                  : 'text-[#ffd166] hover:bg-white/10'
              }`}
            >
              <span>🇻🇳</span>
              <span>Tiếng Việt</span>
            </button>
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentLang === 'en'
                  ? 'bg-[#f5cb42] text-[#3d1a04] shadow-md'
                  : 'text-[#ffd166] hover:bg-white/10'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          {/* Audio TTS */}
          <button
            onClick={handleToggleSpeak}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              isSpeaking
                ? 'bg-[#f5cb42] text-[#3d1a04] border-[#f5cb42] animate-pulse font-bold'
                : 'bg-[#2d1102] text-[#ffd166] border-[#d99b26]/50 hover:bg-[#3d1704]'
            }`}
            title="Đọc to nội dung trang"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Dừng đọc' : 'Nghe đọc'}</span>
          </button>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'slide' ? 'grid' : 'slide')}
            className="p-2.5 rounded-xl bg-[#2d1102] text-[#ffd166] border border-[#d99b26]/50 hover:bg-[#3d1704] transition-all cursor-pointer text-xs font-semibold flex items-center gap-1"
            title="Chuyển chế độ xem"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">{viewMode === 'slide' ? 'Xem lưới 5 trang' : 'Lật từng trang'}</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-[#2d1102] text-[#ffd166] border border-[#d99b26]/50 hover:bg-[#3d1704] transition-all cursor-pointer text-xs"
            title="Toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download/Print */}
          <button
            onClick={handleDownloadHandbook}
            className="p-2.5 rounded-xl bg-[#2d1102] text-[#ffd166] border border-[#d99b26]/50 hover:bg-[#3d1704] transition-all cursor-pointer text-xs"
            title="In / Lưu PDF"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-[#2d1102] text-[#ffd166] border border-[#d99b26]/50 hover:bg-[#3d1704] transition-all cursor-pointer text-xs"
            title="Sao chép liên kết"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress / Page Indicators */}
      <div className="flex items-center justify-between px-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] text-[#5c3708]">
        <div className="flex items-center gap-2 font-bold">
          <span>Tiến trình khám phá ẩm thực:</span>
          <span className="px-2 py-0.5 rounded-full bg-[#f7dd88] text-[#5c3708] border border-[#d99b26]/40">
            {readPages.size} / {handbookData.pages.length} trang đã đọc
          </span>
        </div>
        <div className="flex items-center gap-1">
          {handbookData.pages.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentPageIdx(idx);
                markPageRead(idx + 1);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                currentPageIdx === idx
                  ? 'bg-[#8c2509] text-white shadow-md scale-105'
                  : readPages.has(idx + 1)
                  ? 'bg-[#f7dd88] text-[#5c3708] border border-[#d99b26]/60'
                  : 'bg-white/80 text-gray-500 border border-gray-200 hover:bg-[#fff9eb]'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {viewMode === 'slide' ? (
        <div className="relative">
          {/* Main Book Page Shell - Matching authentic vintage ochre yellow parchment */}
          <div 
            className="w-full rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border-4 border-[#8c2509]/30 relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: '#eed076',
              backgroundImage: 'radial-gradient(#ddb34b 1px, transparent 1px), linear-gradient(135deg, #f2d887 0%, #ebc760 50%, #e2b947 100%)',
              backgroundSize: '24px 24px, 100% 100%'
            }}
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#8c2509]/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#8c2509]/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#8c2509]/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#8c2509]/60 rounded-br-lg pointer-events-none" />

            {/* Page Header Header info */}
            <div className="flex items-center justify-between border-b-2 border-[#8c2509]/20 pb-3 mb-6">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#781605]">
                {currentLang === 'vi' ? 'ẨM THỰC HỒ CHÍ MINH' : 'CUISINE HO CHI MINH'} • TRANG {currentPage.pageNumber}/5
              </span>
              <span className="text-xs font-bold text-[#8c2509] bg-[#fff6d6] px-3 py-1 rounded-full border border-[#8c2509]/20 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#e08307]" />
                {currentPage.title}
              </span>
            </div>

            {/* PAGE 1: COVER */}
            {currentPage.type === 'cover' && (
              <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2 text-[#8c2509]">
                    <span className="text-sm tracking-widest">✦</span>
                    <h2 className="text-3xl sm:text-5xl font-black font-['Plus_Jakarta_Sans',sans-serif] tracking-wider text-[#781605] uppercase drop-shadow-sm">
                      {currentPage.title}
                    </h2>
                    <span className="text-sm tracking-widest">✦</span>
                  </div>
                  <h3 
                    className="text-4xl sm:text-6xl text-[#8c2509] drop-shadow font-serif italic"
                    style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
                  >
                    {currentPage.subtitle}
                  </h3>
                </div>

                {/* Central Cover Illustration Art */}
                <div className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-4 border-[#8c2509]/40 group bg-amber-100">
                  <img 
                    src={currentPage.coverImage} 
                    alt="Bìa Ẩm Thực Hồ Chí Minh" 
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a1d04]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#ffd166]">
                      {currentLang === 'vi' ? 'Bộ sưu tập ẩm thực đặc sản' : 'Exquisite Culinary Collection'}
                    </span>
                    <p className="text-sm font-['Be_Vietnam_Pro',sans-serif] text-white font-medium">
                      {currentLang === 'vi' 
                        ? 'Hành trình trải nghiệm phong vị Sài Gòn, Vũng Tàu, Bình Dương và Nam Bộ trù phú.'
                        : 'A rich culinary journey through Saigon, Vung Tau, Binh Duong, and Southern Vietnam.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={handleNextPage}
                    className="px-6 py-3 rounded-full bg-[#8c2509] text-white hover:bg-[#681803] font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                  >
                    <span>{currentLang === 'vi' ? 'Bắt đầu lật cẩm nang' : 'Start Reading Guide'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGE 2: VŨNG TÀU (4 MÓN: Bánh khọt, Bánh bông lan trứng muối, Hải sản Vũng Tàu, Lẩu cá đuối) */}
            {currentPage.type === 'page-vung-tau' && (
              <div className="space-y-6">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#781605] tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                    {currentPage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#5c2408]">
                    {currentPage.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {currentPage.dishes.map((dish) => (
                    <div 
                      key={dish.id} 
                      className="bg-[#fff9eb]/95 rounded-2xl p-4 sm:p-5 border-2 border-[#8c2509]/20 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      onClick={() => setSelectedDish(dish)}
                    >
                      <div className="space-y-3">
                        <div className="h-44 sm:h-52 rounded-xl overflow-hidden relative border border-[#8c2509]/30 bg-amber-50">
                          <img 
                            src={dish.image} 
                            alt={dish.alt} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#8c2509] text-white text-[11px] font-bold shadow">
                            {dish.originBadge}
                          </span>
                        </div>
                        <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl text-[#781605] tracking-wide uppercase flex items-center justify-between">
                          <span>{dish.name}</span>
                          <span className="text-xs text-[#8c2509] opacity-75 font-normal group-hover:opacity-100 flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            Phóng to
                          </span>
                        </h4>
                        <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#421d08] leading-relaxed">
                          {dish.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAGE 3: NAM BỘ (3 MÓN: Gà quay xôi phồng, Gỏi ngó lục bình, Gỏi gà măng cụt) */}
            {currentPage.type === 'page-nam-bo' && (
              <div className="space-y-6">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#781605] tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                    {currentPage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#5c2408]">
                    {currentPage.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                  {currentPage.dishes.map((dish) => (
                    <div 
                      key={dish.id} 
                      className="bg-[#fff9eb]/95 rounded-2xl p-4 sm:p-5 border-2 border-[#8c2509]/20 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      onClick={() => setSelectedDish(dish)}
                    >
                      <div className="space-y-3">
                        <div className="h-44 sm:h-52 rounded-xl overflow-hidden relative border border-[#8c2509]/30 bg-amber-50">
                          <img 
                            src={dish.image} 
                            alt={dish.alt} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#8c2509] text-white text-[11px] font-bold shadow">
                            {dish.originBadge}
                          </span>
                        </div>
                        <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-[#781605] tracking-wide uppercase">
                          {dish.name}
                        </h4>
                        <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#421d08] leading-relaxed">
                          {dish.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAGE 4: BÌNH DƯƠNG (3 MÓN: Bánh bèo bì, Bánh chị, Lẩu bò mắm ruốc) */}
            {currentPage.type === 'page-binh-duong' && (
              <div className="space-y-6">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#781605] tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                    {currentPage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#5c2408]">
                    {currentPage.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                  {currentPage.dishes.map((dish) => (
                    <div 
                      key={dish.id} 
                      className="bg-[#fff9eb]/95 rounded-2xl p-4 sm:p-5 border-2 border-[#8c2509]/20 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      onClick={() => setSelectedDish(dish)}
                    >
                      <div className="space-y-3">
                        <div className="h-44 sm:h-52 rounded-xl overflow-hidden relative border border-[#8c2509]/30 bg-amber-50">
                          <img 
                            src={dish.image} 
                            alt={dish.alt} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#8c2509] text-white text-[11px] font-bold shadow">
                            {dish.originBadge}
                          </span>
                        </div>
                        <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-[#781605] tracking-wide uppercase">
                          {dish.name}
                        </h4>
                        <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#421d08] leading-relaxed">
                          {dish.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAGE 5: SÀI GÒN (3 MÓN: Cơm tấm Sài Gòn, Bánh mì Sài Gòn, Phá lấu) */}
            {currentPage.type === 'page-sai-gon' && (
              <div className="space-y-6">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#781605] tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
                    {currentPage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#5c2408]">
                    {currentPage.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                  {currentPage.dishes.map((dish) => (
                    <div 
                      key={dish.id} 
                      className="bg-[#fff9eb]/95 rounded-2xl p-4 sm:p-5 border-2 border-[#8c2509]/20 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      onClick={() => setSelectedDish(dish)}
                    >
                      <div className="space-y-3">
                        <div className="h-44 sm:h-52 rounded-xl overflow-hidden relative border border-[#8c2509]/30 bg-amber-50">
                          <img 
                            src={dish.image} 
                            alt={dish.alt} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#8c2509] text-white text-[11px] font-bold shadow">
                            {dish.originBadge}
                          </span>
                        </div>
                        <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg text-[#781605] tracking-wide uppercase">
                          {dish.name}
                        </h4>
                        <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#421d08] leading-relaxed">
                          {dish.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Book Footer */}
            <div className="mt-8 pt-4 border-t-2 border-[#8c2509]/20 flex items-center justify-between text-xs text-[#5c2408] font-bold">
              <span>{currentLang === 'vi' ? 'Cẩm nang Du lịch Ẩm thực TP.HCM' : 'HCMC Culinary Tourism Handbook'}</span>
              <span>{currentPage.pageNumber} / 5</span>
            </div>
          </div>

          {/* Previous & Next Page Floating Nav Buttons */}
          <button
            onClick={handlePrevPage}
            disabled={currentPageIdx === 0}
            className={`absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#4a1d04] text-[#ffd166] border-2 border-[#d99b26] flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
              currentPageIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:bg-[#682906]'
            }`}
            title="Trang trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPageIdx === handbookData.pages.length - 1}
            className={`absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#4a1d04] text-[#ffd166] border-2 border-[#d99b26] flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
              currentPageIdx === handbookData.pages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:bg-[#682906]'
            }`}
            title="Trang tiếp theo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      ) : (
        /* GRID MODE: View all 5 pages at once */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {handbookData.pages.map((p, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCurrentPageIdx(idx);
                setViewMode('slide');
                markPageRead(idx + 1);
              }}
              className="bg-[#eed076] border-2 border-[#8c2509]/30 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-1.5 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#8c2509] mb-2">
                  <span>TRANG {p.pageNumber}</span>
                  {readPages.has(p.pageNumber) && (
                    <span className="flex items-center gap-1 text-green-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đã xem
                    </span>
                  )}
                </div>
                <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-base text-[#781605]">
                  {p.title}
                </h4>
                {p.subtitle && (
                  <p className="text-xs font-['Be_Vietnam_Pro',sans-serif] text-[#5c2408] mt-1">
                    {p.subtitle}
                  </p>
                )}
              </div>

              {p.coverImage && (
                <div className="h-44 rounded-xl overflow-hidden border border-[#8c2509]/40">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
              )}

              {p.dishes.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {p.dishes.slice(0, 4).map((d, dIdx) => (
                    <div key={dIdx} className="h-20 rounded-lg overflow-hidden border border-[#8c2509]/20 relative">
                      <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] bg-black/70 text-white px-1 py-0.5 rounded truncate font-medium">
                        {d.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button className="w-full py-2 rounded-xl bg-[#8c2509] text-white text-xs font-bold hover:bg-[#681803] transition-colors flex items-center justify-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Xem chi tiết trang {p.pageNumber}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DISH DETAIL POPUP MODAL */}
      {selectedDish && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedDish(null)}
        >
          <div 
            className="bg-[#eed076] border-4 border-[#8c2509] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#8c2509] text-white flex items-center justify-center hover:bg-[#681803] cursor-pointer shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#8c2509]/40 relative bg-amber-50">
              <img src={selectedDish.image} alt={selectedDish.alt} className="w-full h-full object-cover" />
              {selectedDish.originBadge && (
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#8c2509] text-white text-xs font-bold shadow-lg">
                  {selectedDish.originBadge}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black font-['Plus_Jakarta_Sans',sans-serif] text-[#781605] tracking-wide uppercase">
                {selectedDish.name}
              </h3>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-sm text-[#421d08] leading-relaxed">
                {selectedDish.desc}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDish(null)}
                className="px-5 py-2 rounded-full bg-[#8c2509] text-white font-bold text-xs hover:bg-[#681803] cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
