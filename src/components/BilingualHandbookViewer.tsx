import React, { useState, useEffect } from 'react';
import { 
  BILINGUAL_HANDBOOK_DATA, 
  HandbookPage, 
  HandbookLanguageData 
} from '../data/bilingualHandbookData';
import { 
  Languages, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  MapPin, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Quote, 
  Feather, 
  Share2,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface BilingualHandbookViewerProps {
  onAddPoints?: (points: number) => void;
  onShowToast?: (title: string, message: string) => void;
  initialLanguage?: 'vi' | 'en';
}

export const BilingualHandbookViewer: React.FC<BilingualHandbookViewerProps> = ({
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

  const handbookData: HandbookLanguageData = BILINGUAL_HANDBOOK_DATA[currentLang];
  const currentPage: HandbookPage = handbookData.pages[currentPageIdx];

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
    let textToSpeak = `${currentPage.title}. ${currentPage.subtitle || ''}. `;
    if (currentPage.content.address) {
      textToSpeak += `Địa chỉ: ${currentPage.content.address}. `;
    }
    if (currentPage.content.descriptionPoints) {
      textToSpeak += currentPage.content.descriptionPoints.join(' ');
    }
    if (currentPage.content.quote) {
      textToSpeak += `Trích dẫn: ${currentPage.content.quote.text}`;
    }
    if (currentPage.content.poem) {
      textToSpeak += currentPage.content.poem.lines.join('. ');
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLang === 'vi' ? 'vi-VN' : 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
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
      const prevIdx = currentPageIdx - 1;
      setCurrentPageIdx(prevIdx);
      markPageRead(prevIdx + 1);
    }
  };

  const markPageRead = (pageNo: number) => {
    setReadPages(prev => {
      const updated = new Set(prev);
      updated.add(pageNo);
      if (updated.size === 6 && !prev.has(6)) {
        onAddPoints?.(25);
        onShowToast?.(
          currentLang === 'vi' ? "Hoàn thành cẩm nang di sản!" : "Handbook Completed!",
          currentLang === 'vi' 
            ? "Bạn đã đọc trọn vẹn 6 trang tài liệu và nhận +25 Điểm di sản!" 
            : "You have reviewed all 6 pages and earned +25 Heritage Points!"
        );
      }
      return updated;
    });
  };

  const handleDownloadHandbook = () => {
    onShowToast?.(
      currentLang === 'vi' ? "Đang xuất bản tài liệu PDF" : "Generating PDF Handbook",
      currentLang === 'vi'
        ? `Tài liệu "${handbookData.documentTitle}" (Bản ${handbookData.languageName}) đang được chuẩn bị tải về máy!`
        : `Document "${handbookData.documentTitle}" (${handbookData.languageName} Edition) is preparing for download!`
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Controller Bar: Language Selector & Mode Switcher */}
      <div className="bg-gradient-to-r from-[#4a0707] via-[#7a1616] to-[#4a0707] text-white p-4 sm:p-5 rounded-3xl shadow-lg border border-[#a83232]/50 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Document Title & Badge */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#ffd166] text-[#4a0707] flex items-center justify-center font-black shadow-md shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-[#ffffff]/20 backdrop-blur-sm text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wider uppercase text-[#ffe49e]">
                {currentLang === 'vi' ? 'Tài liệu số 2 bản song ngữ' : 'Bilingual Digital Handbook'}
              </span>
              <span className="text-[11px] text-[#ffcfcf]">
                6 {currentLang === 'vi' ? 'Trang tư liệu' : 'Curated Pages'}
              </span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-white leading-tight">
              {handbookData.documentTitle}
            </h3>
          </div>
        </div>

        {/* Dual Language Switcher Buttons & Controls */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-end w-full md:w-auto">
          {/* Language Switcher Pill */}
          <div className="bg-[#2b0404]/80 p-1 rounded-2xl border border-[#b53c3c]/60 flex items-center shadow-inner">
            <button
              onClick={() => {
                setCurrentLang('vi');
                onShowToast?.("Đã chuyển sang Tiếng Việt", "Tài liệu đang hiển thị bản Tiếng Việt chuẩn.");
              }}
              className={`px-3.5 py-1.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentLang === 'vi'
                  ? 'bg-[#ffd166] text-[#4a0707] shadow-sm scale-100 font-extrabold'
                  : 'text-[#ffcccc] hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🇻🇳</span>
              <span>Tiếng Việt</span>
            </button>
            <button
              onClick={() => {
                setCurrentLang('en');
                onShowToast?.("Switched to English", "Handbook is now displaying the English edition.");
              }}
              className={`px-3.5 py-1.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-[#ffd166] text-[#4a0707] shadow-sm scale-100 font-extrabold'
                  : 'text-[#ffcccc] hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="bg-[#2b0404]/80 p-1 rounded-2xl border border-[#b53c3c]/60 flex items-center">
            <button
              onClick={() => setViewMode('slide')}
              className={`p-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'slide' ? 'bg-white/20 text-[#ffd166]' : 'text-[#ffcccc] hover:text-white'
              }`}
              title={currentLang === 'vi' ? 'Xem từng trang' : 'Single page view'}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'grid' ? 'bg-white/20 text-[#ffd166]' : 'text-[#ffcccc] hover:text-white'
              }`}
              title={currentLang === 'vi' ? 'Xem toàn bộ 6 trang' : 'All 6 pages view'}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadHandbook}
            className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-[#ffd166] border border-[#ffd166]/40 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {currentLang === 'vi' ? 'Tải PDF' : 'Download PDF'}
            </span>
          </button>
        </div>
      </div>

      {/* READING PROGRESS BAR */}
      <div className="bg-white px-5 py-3 rounded-2xl border border-[#eee4f7] flex items-center justify-between text-xs text-[#7c747f]">
        <div className="flex items-center gap-2">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1e1926]">
            {currentLang === 'vi' ? 'Tiến độ học tập:' : 'Reading Progress:'}
          </span>
          <span className="text-[#704f8d] font-bold">
            {readPages.size} / 6 {currentLang === 'vi' ? 'trang đã xem' : 'pages read'}
          </span>
        </div>
        <div className="w-36 sm:w-48 bg-[#eee4f7] h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#ffd166] to-[#704f8d] h-full transition-all duration-300"
            style={{ width: `${(readPages.size / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* MAIN VIEW AREA: SLIDE PRESENTATION OR GRID */}
      {viewMode === 'slide' ? (
        <div className="space-y-4">
          {/* SLIDE CANVAS - Replicating the authentic PDF design layout with crimson frame */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border-4 border-[#7a1616] bg-[#7a1616] text-[#fff9eb]">
            
            {/* Top Bar inside Slide: Page Title & Audio button */}
            <div className="bg-[#5c0b0b] px-6 py-3.5 flex items-center justify-between border-b border-[#a83232]/50">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#ffd166] text-[#4a0707] font-black text-xs font-['Plus_Jakarta_Sans',sans-serif]">
                  PAGE 0{currentPage.pageNumber}
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs uppercase tracking-wider text-[#ffcfcf] font-bold">
                  {handbookData.languageName} Edition
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleSpeak}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSpeaking 
                      ? 'bg-[#ffd166] text-[#4a0707] animate-pulse' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  title={currentLang === 'vi' ? 'Nghe đọc trang này' : 'Listen to this page'}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? (currentLang === 'vi' ? 'Đang đọc...' : 'Reading...') : (currentLang === 'vi' ? 'Nghe bài' : 'Listen')}</span>
                </button>
              </div>
            </div>

            {/* PAGE BODY - Exact recreation of the 6 pages */}
            <div className="p-4 sm:p-7 md:p-8 min-h-[480px] flex flex-col justify-between">
              
              {/* PAGE 1: COVER (DINH ĐỘC LẬP) */}
              {currentPage.pageNumber === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center space-y-1">
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-wider text-[#ffd166] drop-shadow-md">
                      {currentPage.title}
                    </h2>
                    <div className="text-xl sm:text-2xl font-['Playfair_Display',serif] italic font-bold text-white">
                      {currentPage.subtitle}
                    </div>
                  </div>

                  {/* Main Photo with golden frame */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#ffd166]/60 shadow-2xl h-64 sm:h-80 md:h-96">
                    <img 
                      src={currentPage.coverImage} 
                      alt="Dinh Độc Lập"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div className="space-y-1 max-w-xl">
                        <span className="px-3 py-1 rounded-full bg-[#ffd166] text-[#4a0707] font-bold text-xs uppercase inline-block">
                          {currentLang === 'vi' ? 'Biểu tượng lịch sử' : 'Historical Icon'}
                        </span>
                        <p className="text-sm font-['Be_Vietnam_Pro',sans-serif] text-white drop-shadow">
                          {currentPage.images[0]?.caption}
                        </p>
                      </div>
                      <span className="text-xs text-[#ffcfcf] bg-black/50 px-3 py-1.5 rounded-xl backdrop-blur-sm self-start sm:self-end">
                        {currentLang === 'vi' ? 'Khung chuẩn GDPT 2018' : 'Standard Curriculum 2018'}
                      </span>
                    </div>
                  </div>

                  {/* Highlight bullets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {currentPage.content.descriptionPoints?.map((pt, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-[#5c0b0b]/90 border border-[#a83232]/60 text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] leading-relaxed flex items-start gap-2.5 text-[#fff9eb]">
                        <CheckCircle2 className="w-4 h-4 text-[#ffd166] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAGE 2: NHÀ THỜ ĐỨC BÀ (NOTRE-DAME CATHEDRAL) */}
              {currentPage.pageNumber === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-in fade-in duration-300">
                  {/* Left Column: Photos */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentPage.images.map((img, idx) => (
                      <div key={idx} className="relative rounded-2xl overflow-hidden border border-[#ffd166]/40 shadow-lg h-56 sm:h-72">
                        <img 
                          src={img.url} 
                          alt={img.alt} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-['Be_Vietnam_Pro',sans-serif] text-white leading-tight">
                          {img.caption}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Title ribbon, Address, Highlights & Poem */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Vertical / Stylized Ribbon Title */}
                    <div className="space-y-1">
                      <div className="inline-block px-3 py-1 rounded-lg bg-[#ffd166] text-[#4a0707] font-black text-xs uppercase tracking-wider">
                        {currentPage.content.badge}
                      </div>
                      <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl uppercase text-white tracking-wide">
                        {currentPage.title}
                      </h2>
                      <p className="text-xs text-[#ffd166] italic">
                        {currentPage.subtitle}
                      </p>
                    </div>

                    {/* Address Box */}
                    <div className="p-3 rounded-2xl bg-[#5c0b0b] border border-[#a83232] text-xs font-['Be_Vietnam_Pro',sans-serif] text-[#fff9eb] flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#ffd166] shrink-0 mt-0.5" />
                      <span><strong>{currentLang === 'vi' ? 'Địa chỉ:' : 'Address:'}</strong> {currentPage.content.address}</span>
                    </div>

                    {/* Description bullet points */}
                    <ul className="space-y-2 text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#fff9eb]">
                      {currentPage.content.descriptionPoints?.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166] shrink-0 mt-2" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Authentic Poem Box */}
                    {currentPage.content.poem && (
                      <div className="p-4 rounded-2xl bg-[#fff9eb] text-[#4a0707] shadow-md border-l-4 border-[#ffd166] space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#7a1616]">
                          <Feather className="w-3.5 h-3.5" />
                          <span>{currentPage.content.poem.title}</span>
                        </div>
                        <div className="font-['Playfair_Display',serif] italic text-xs sm:text-sm leading-relaxed space-y-1">
                          {currentPage.content.poem.lines.map((line, i) => (
                            <p key={i}>"{line}"</p>
                          ))}
                        </div>
                        <div className="text-right text-[11px] font-bold text-[#7a1616]">
                          — {currentPage.content.poem.poet} —
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 3: QUẢNG TRƯỜNG TAM THẮNG (TAM THANG SQUARE) */}
              {currentPage.pageNumber === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center space-y-1">
                    <span className="px-3 py-1 rounded-full bg-[#ffd166] text-[#4a0707] font-bold text-xs uppercase">
                      {currentPage.content.badge}
                    </span>
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-4xl uppercase text-white tracking-widest">
                      {currentPage.title}
                    </h2>
                    <p className="text-xs text-[#ffcfcf] max-w-xl mx-auto">
                      {currentPage.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Visual Photo */}
                    <div className="md:col-span-7 rounded-2xl overflow-hidden border-2 border-[#ffd166]/50 shadow-xl h-64 sm:h-80">
                      <img 
                        src={currentPage.images[0]?.url} 
                        alt={currentPage.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text Narrative */}
                    <div className="md:col-span-5 space-y-4 text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#fff9eb]">
                      {currentPage.content.address && (
                        <div className="p-4 rounded-2xl bg-[#5c0b0b] border border-[#a83232] space-y-2">
                          <div className="flex items-center gap-2 text-[#ffd166] font-bold">
                            <MapPin className="w-4 h-4" />
                            <span>{currentLang === 'vi' ? 'Vị trí tọa lạc:' : 'Location:'}</span>
                          </div>
                          <p>{currentPage.content.address}</p>
                        </div>
                      )}

                      <div className="p-4 rounded-2xl bg-[#5c0b0b] border border-[#a83232] space-y-2.5 leading-relaxed">
                        {currentPage.content.descriptionPoints?.map((pt, i) => (
                          <p key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166] shrink-0 mt-2" />
                            <span>{pt}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 4: BẢO TÀNG GỐM SỨ MINH LONG */}
              {currentPage.pageNumber === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#a83232] pb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-[#ffd166] text-[#4a0707] font-bold text-xs uppercase">
                        {currentPage.content.badge}
                      </span>
                      <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl uppercase text-white mt-1">
                        {currentPage.title}
                      </h2>
                    </div>
                    <div className="text-xs text-[#ffcfcf] max-w-sm">
                      <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#ffd166]" />
                      {currentPage.content.address}
                    </div>
                  </div>

                  {/* Images Gallery */}
                  <div className={`grid gap-3.5 ${currentPage.images.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
                    {currentPage.images.map((img, idx) => (
                      <div key={idx} className={`relative rounded-2xl overflow-hidden border border-[#ffd166]/40 shadow-md ${currentPage.images.length <= 2 ? 'h-52 sm:h-64' : 'h-40 sm:h-52'}`}>
                        <img 
                          src={img.url} 
                          alt={img.alt} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <span className="absolute bottom-2.5 left-3 right-3 text-xs text-[#fff9eb] leading-tight font-medium drop-shadow">
                          {img.caption}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quote & Narrative */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-5 p-4 rounded-2xl bg-[#5c0b0b] border border-[#a83232] text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#fff9eb] space-y-2">
                      {currentPage.content.descriptionPoints?.map((pt, i) => (
                        <p key={i} className="leading-relaxed">{pt}</p>
                      ))}
                    </div>

                    {currentPage.content.quote && (
                      <div className="md:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#fff9eb] text-[#4a0707] shadow-lg border-l-4 border-[#ffd166] space-y-2 flex flex-col justify-between">
                        <div className="flex items-start gap-2">
                          <Quote className="w-6 h-6 text-[#7a1616] shrink-0 mt-0.5" />
                          <p className="font-['Playfair_Display',serif] italic text-xs sm:text-sm leading-relaxed font-semibold">
                            "{currentPage.content.quote.text}"
                          </p>
                        </div>
                        <p className="text-right text-xs font-bold text-[#7a1616] pt-2 border-t border-[#7a1616]/20">
                          — {currentPage.content.quote.author}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 5: 4 ĐIỂM ĐẾN NỔI TIẾNG KHÔNG THỂ BỎ QUA */}
              {currentPage.pageNumber === 5 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center space-y-1">
                    <span className="px-3 py-1 rounded-full bg-[#ffd166] text-[#4a0707] font-bold text-xs uppercase">
                      {currentPage.content.badge}
                    </span>
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-4xl uppercase text-white tracking-wide">
                      {currentPage.title}
                    </h2>
                    <p className="text-xs text-[#ffcfcf] max-w-xl mx-auto">
                      {currentPage.subtitle}
                    </p>
                  </div>

                  {/* 4 Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentPage.content.destinationsGrid?.map((dest, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden bg-[#5c0b0b] border border-[#a83232] shadow-md flex flex-col justify-between hover:-translate-y-1 transition-transform">
                        <div className="h-40 overflow-hidden relative">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute bottom-2 left-2 right-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-black text-[#ffd166] uppercase">
                            {dest.name}
                          </span>
                        </div>
                        <div className="p-3.5 text-xs font-['Be_Vietnam_Pro',sans-serif] text-[#fff9eb] leading-relaxed">
                          {dest.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAGE 6: NHÀ TÙ CÔN ĐẢO "ĐỊA NGỤC TRẦN GIAN" */}
              {currentPage.pageNumber === 6 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#a83232] pb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-[#ffd166] text-[#4a0707] font-bold text-xs uppercase">
                        {currentPage.content.badge}
                      </span>
                      <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl uppercase text-white mt-1">
                        {currentPage.title}
                      </h2>
                    </div>
                    <p className="text-xs text-[#ffd166] italic font-['Playfair_Display',serif]">
                      {currentPage.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Visual Photos - 3 Images Gallery */}
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentPage.images.map((img, idx) => (
                        <div key={idx} className="relative rounded-2xl overflow-hidden border border-[#ffd166]/40 shadow-lg h-48 sm:h-60">
                          <img 
                            src={img.url} 
                            alt={img.alt} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <span className="absolute bottom-2 left-2 right-2 text-[10px] text-[#fff9eb] leading-tight font-medium">
                            {img.caption}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Historical Analysis Bullets */}
                    <div className="lg:col-span-6 space-y-3">
                      {currentPage.content.descriptionPoints?.map((pt, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-[#5c0b0b] border border-[#a83232] text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#fff9eb] leading-relaxed flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#ffd166] shrink-0 mt-1.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Bar: Slide Navigation Controllers */}
            <div className="bg-[#5c0b0b] px-6 py-4 flex items-center justify-between border-t border-[#a83232]/50">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIdx === 0}
                className={`px-4 py-2 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentPageIdx === 0
                    ? 'opacity-40 cursor-not-allowed bg-white/10 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-[#ffd166]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{currentLang === 'vi' ? 'Trang trước' : 'Previous'}</span>
              </button>

              {/* Page indicator pills */}
              <div className="flex items-center gap-1.5">
                {handbookData.pages.map((p, idx) => (
                  <button
                    key={p.pageNumber}
                    onClick={() => {
                      setCurrentPageIdx(idx);
                      markPageRead(idx + 1);
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold flex items-center justify-center transition-all cursor-pointer ${
                      currentPageIdx === idx
                        ? 'bg-[#ffd166] text-[#4a0707] shadow-md scale-110'
                        : readPages.has(p.pageNumber)
                          ? 'bg-[#ffffff]/30 text-white hover:bg-[#ffffff]/40'
                          : 'bg-black/30 text-white/50 hover:bg-black/40'
                    }`}
                  >
                    {p.pageNumber}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPageIdx === handbookData.pages.length - 1}
                className={`px-4 py-2 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentPageIdx === handbookData.pages.length - 1
                    ? 'opacity-40 cursor-not-allowed bg-white/10 text-white'
                    : 'bg-[#ffd166] hover:bg-[#ffc338] text-[#4a0707]'
                }`}
              >
                <span>{currentLang === 'vi' ? 'Trang kế' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Page Jump Thumbnails Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
            {handbookData.pages.map((p, idx) => {
              const isActive = currentPageIdx === idx;
              return (
                <button
                  key={p.pageNumber}
                  onClick={() => {
                    setCurrentPageIdx(idx);
                    markPageRead(idx + 1);
                  }}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                    isActive
                      ? 'bg-[#7a1616] text-[#ffd166] border-[#ffd166] shadow-md ring-2 ring-[#ffd166]/50'
                      : 'bg-white text-[#4b444e] border-[#eee4f7] hover:bg-[#f9f0ff]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-black uppercase">
                      P.0{p.pageNumber}
                    </span>
                    {readPages.has(p.pageNumber) && (
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffd166]' : 'text-emerald-600'}`} />
                    )}
                  </div>
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[11px] truncate w-full">
                    {p.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* GRID MODE: ALL 6 PAGES DISPLAYED SIMULTANEOUSLY */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          {handbookData.pages.map((p, idx) => (
            <div 
              key={p.pageNumber}
              className="bg-[#7a1616] text-[#fff9eb] rounded-3xl p-5 sm:p-6 border-2 border-[#a83232] shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#a83232] pb-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#ffd166] text-[#4a0707] font-black text-xs">
                    TRANG 0{p.pageNumber}
                  </span>
                  <span className="text-[11px] text-[#ffcfcf] font-bold">
                    {p.content.badge || handbookData.languageName}
                  </span>
                </div>

                <div>
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-lg sm:text-xl text-[#ffd166] uppercase">
                    {p.title}
                  </h4>
                  {p.subtitle && (
                    <p className="text-xs text-[#fff9eb] mt-0.5 italic">
                      {p.subtitle}
                    </p>
                  )}
                  {p.content.address && (
                    <p className="text-[11px] text-[#ffcfcf] mt-1 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ffd166] shrink-0 mt-0.5" />
                      <span>{p.content.address}</span>
                    </p>
                  )}
                </div>

                {/* Cover or Destination thumbnail */}
                {p.coverImage && (
                  <div className="h-44 rounded-xl overflow-hidden border border-[#ffd166]/40">
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {p.images.length > 0 && !p.coverImage && (
                  <div className="h-44 rounded-xl overflow-hidden border border-[#ffd166]/40">
                    <img src={p.images[0].url} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Key Bullet text */}
                <div className="space-y-1.5 text-xs text-[#fff9eb] leading-relaxed">
                  {p.content.descriptionPoints?.slice(0, 2).map((pt, i) => (
                    <p key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166] shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </p>
                  ))}
                  {p.content.destinationsGrid && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {p.content.destinationsGrid.map((d, i) => (
                        <div key={i} className="p-2 rounded-xl bg-[#5c0b0b] text-[11px] font-bold text-[#ffd166]">
                          {d.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentPageIdx(idx);
                  setViewMode('slide');
                  markPageRead(p.pageNumber);
                }}
                className="w-full py-2 px-3 rounded-full bg-[#ffd166] text-[#4a0707] hover:bg-[#ffc338] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{currentLang === 'vi' ? 'Xem chi tiết trang này' : 'View full page'}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
