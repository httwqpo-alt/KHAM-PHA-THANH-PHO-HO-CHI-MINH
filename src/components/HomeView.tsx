import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab, GradeLevel } from '../types';
import { RegionalMapVector } from './RegionalMapVector';
import { 
  GRADE_10_TOPICS, 
  GRADE_11_TOPICS, 
  GRADE_12_TOPICS, 
  REGIONAL_DATA, 
  WEEKLY_CHALLENGE, 
  INITIAL_LEADERBOARD,
  ASSETS 
} from '../data/mockData';
import { 
  Sparkles, 
  ExternalLink, 
  Bookmark, 
  Trophy, 
  Download, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  XCircle,
  MapPin,
  Layers,
  Star,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Compass,
  Languages
} from 'lucide-react';

interface HomeViewProps {
  onNavigateToGrade?: (grade: NavigationTab) => void;
  onNavigateToGrade11?: () => void;
  onNavigateToMap: () => void;
  onAddPoints: (points: number) => void;
  onShowToast: (title: string, message: string) => void;
  onOpenBilingualWord?: (word: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateToGrade,
  onNavigateToGrade11,
  onNavigateToMap,
  onAddPoints,
  onShowToast,
  onOpenBilingualWord
}) => {
  // Selected grade for 6 topics
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(11);
  
  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Regional Map filter in Section 2
  const [activeRegionFilter, setActiveRegionFilter] = useState<'all' | 'tphcm' | 'binhduong' | 'brvt'>('all');
  const [selectedRegionId, setSelectedRegionId] = useState<number>(2); // Default to BR-VT as in Image 1

  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

  const navigateTo = (tab: NavigationTab) => {
    if (onNavigateToGrade) {
      onNavigateToGrade(tab);
    } else if (onNavigateToGrade11 && tab === 'khoi-11') {
      onNavigateToGrade11();
    } else if (tab === 'ban-do-tuong-tac') {
      onNavigateToMap();
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentGradeTopics = selectedGrade === 10 
    ? GRADE_10_TOPICS 
    : selectedGrade === 12 
      ? GRADE_12_TOPICS 
      : GRADE_11_TOPICS;

  const handleAnswerSelect = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (quizSubmitted) return;
    setSelectedAnswer(optionId);
    setQuizSubmitted(true);

    if (optionId === WEEKLY_CHALLENGE.correctAnswer) {
      onAddPoints(WEEKLY_CHALLENGE.points);
      onShowToast("Chính xác! +50 Điểm Huy Hiệu", "Bạn đã trả lời đúng câu hỏi Thử Thách Tuần 18!");
      // update leaderboard
      setLeaderboard(prev => [
        { rank: 1, name: "Bạn (Học viên)", schoolClass: "Lớp 11 • THPT TP.HCM", score: 1530, isCurrentUser: true },
        ...prev.slice(0, 3)
      ]);
    } else {
      onShowToast("Chưa chính xác!", "Đáp án đúng là: " + WEEKLY_CHALLENGE.options.find(o => o.id === WEEKLY_CHALLENGE.correctAnswer)?.text);
    }
  };

  const selectedRegion = REGIONAL_DATA[selectedRegionId] || REGIONAL_DATA[2];

  const handleDownloadResource = (title: string, filename: string) => {
    // Generate actual file blob download
    const content = `# ${title}\n\nCỔNG HỌC LIỆU SỐ GIÁO DỤC ĐỊA PHƯƠNG TP. HỒ CHÍ MINH (GDPT 2018)\nNgày tải: ${new Date().toLocaleDateString('vi-VN')}\n\nNỘI DUNG TÓM TẮT:\n- Bao gồm tư liệu phân tích di tích lịch sử và văn học phương Nam.\n- 8 chuyên đề trọng tâm: Văn học, Du lịch, Danh nhân, Âm nhạc tài tử, Kiến trúc cổ, Môi trường sinh thái Cần Giờ, STEM làng nghề gốm & Pháp luật địa phương.\n- Bám sát chương trình Sở Giáo dục và Đào tạo TP. Hồ Chí Minh.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    onShowToast("Tải tài liệu thành công", `Tài liệu "${filename}" đã được lưu về máy.`);
  };

  return (
    <div className="w-full bg-[#fef7ff] pb-16">
      {/* 1. HERO SECTION */}
      <section className="w-full pt-10 pb-16 px-4 md:px-6 lg:px-8 border-b border-[#e9dff2]/50">
        <div className="max-w-7xl mx-auto space-y-6 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-[#685f26]" />
            CỔNG HỌC LIỆU SỐ MỞ RỘNG 2026
          </div>

          {/* Heading */}
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1e1926] tracking-tight leading-tight max-w-4xl text-center mx-auto">
            Chào mừng bạn đến{' '}
            <span className="text-[#704f8d] underline decoration-[#deb7fe] decoration-wavy decoration-2">
              KHÁM PHÁ THÀNH PHỐ HỒ CHÍ MINH
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Be_Vietnam_Pro',sans-serif] text-sm sm:text-base text-[#4b444e] max-w-3xl leading-relaxed text-center mx-auto">
            Đồng hành cùng học sinh THPT khám phá sâu sắc kho tàng văn hóa, lịch sử, văn học và địa lý địa phương phương Nam; biến từng tiết học khô khan thành chuyến du hành tương tác đa giác quan, sinh động và tràn đầy cảm hứng tuổi trẻ.
          </p>

          {/* Interactive Hero Action Button */}
          <div className="flex items-center justify-center pt-2">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo('khoi-11')}
              className="px-8 py-3.5 rounded-full bg-[#704f8d] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-[0_8px_20px_-4px_rgba(112,79,141,0.4)] hover:bg-[#5a3e73] transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-[#f0e49c]" />
              <span>Bắt đầu khám phá hành trình</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl w-full mx-auto">
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-[#f9f0ff] p-4 sm:p-5 rounded-2xl border border-[#eee4f7] shadow-sm text-center transition-shadow hover:shadow-md"
            >
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#704f8d]">
                24+
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#4b444e] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                Di tích & Điểm đến
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-[#f9f0ff] p-4 sm:p-5 rounded-2xl border border-[#eee4f7] shadow-sm text-center transition-shadow hover:shadow-md"
            >
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#704f8d]">
                120+
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#4b444e] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                Tư liệu & Bản thảo
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-[#f9f0ff] p-4 sm:p-5 rounded-2xl border border-[#eee4f7] shadow-sm text-center transition-shadow hover:shadow-md"
            >
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#704f8d]">
                100%
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#4b444e] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                Chuẩn GDPT 2018
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: 8 CHỦ ĐỀ HỌC TẬP */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider text-[#704f8d] block">
              LỘ TRÌNH GIÁO DỤC ĐỊA PHƯƠNG THPT
            </span>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold text-[#1e1926] mt-1">
              8 Chủ Đề Khám Phá
            </h2>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] mt-1 max-w-2xl">
              Khung chương trình GDĐP TP.HCM theo chuẩn GDPT 2018. Lựa chọn khối lớp để xem chi tiết các chủ đề, mục tiêu cần đạt và bắt đầu bài học.
            </p>
          </div>

          {/* Grade Selector Pills and Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            <div className="flex items-center gap-2 bg-[#f9f0ff] p-1.5 rounded-full border border-[#eee4f7]">
              <button
                onClick={() => setSelectedGrade(10)}
                className={`px-4 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all cursor-pointer ${
                  selectedGrade === 10
                    ? 'bg-[#704f8d] text-white shadow-sm'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                Khối 10
              </button>
              <button
                onClick={() => setSelectedGrade(11)}
                className={`px-4 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all cursor-pointer ${
                  selectedGrade === 11
                    ? 'bg-[#704f8d] text-white shadow-sm'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                Khối 11
              </button>
              <button
                onClick={() => setSelectedGrade(12)}
                className={`px-4 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all cursor-pointer ${
                  selectedGrade === 12
                    ? 'bg-[#704f8d] text-white shadow-sm'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                Khối 12
              </button>
            </div>

            {/* Scroll Navigation arrows for carousel */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-8 h-8 rounded-full bg-white border border-[#e9dff2] flex items-center justify-center text-[#704f8d] hover:bg-[#f9f0ff] transition-colors cursor-pointer shadow-sm active:scale-95"
                title="Cuộn sang trái"
                aria-label="Cuộn sang trái"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-8 h-8 rounded-full bg-white border border-[#e9dff2] flex items-center justify-center text-[#704f8d] hover:bg-[#f9f0ff] transition-colors cursor-pointer shadow-sm active:scale-95"
                title="Cuộn sang phải"
                aria-label="Cuộn sang phải"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grade Summary Highlight Bar */}
        <div className="bg-[#f0e49c]/40 border border-[#f0e49c] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#704f8d] text-white flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#1e1926]">
                {selectedGrade === 11 && 'Khối 11: 8 Chủ Đề Giáo Dục Địa Phương TP.HCM'}
                {selectedGrade === 10 && 'Khối 10: Đất Phương Nam, Khảo Cổ Học & Lịch Sử Khai Phá'}
                {selectedGrade === 12 && 'Khối 12: Đô Thị Đổi Mới, Kinh Tế Số & Hội Nhập Toàn Cầu'}
              </h3>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e]">
                {selectedGrade === 11 && 'Bao gồm 8 chủ đề chuyên sâu: Văn học, Du lịch, Danh nhân, Âm nhạc, Kiến trúc, Môi trường, STEM & Pháp luật.'}
                {selectedGrade === 10 && 'Bao gồm các chuyên đề di chỉ khảo cổ, địa lý tự nhiên, thiết chế phủ Gia Định.'}
                {selectedGrade === 12 && 'Bao gồm các chuyên đề quy hoạch không gian đô thị, metro xanh, liên kết kinh tế vùng.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#704f8d] bg-white/80 px-3 py-1.5 rounded-full shrink-0 self-start md:self-auto border border-[#eee4f7]">
            <Star className="w-4 h-4 text-[#fea619] fill-[#fea619]" />
            <span>Năm học 2026 - 2027</span>
          </div>
        </div>

        {/* Topics Carousel Track */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x no-scrollbar"
        >
          {currentGradeTopics.map((topic) => (
            <motion.div
              key={topic.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-[300px] sm:w-[340px] shrink-0 bg-white rounded-3xl p-5 border border-[#e9dff2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between snap-start"
            >
              <div className="space-y-3">
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold px-2.5 py-0.5 rounded-md bg-[#f9f0ff] text-[#704f8d]">
                    {topic.code}
                  </span>
                  <span className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#7c747f]">
                    {topic.duration} • {topic.fieldTrip}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926] leading-snug">
                  {topic.title}
                </h3>

                {/* Learning Goal */}
                <div className="bg-[#f9f0ff] p-3 rounded-2xl space-y-1">
                  <span className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#704f8d] block">
                    Mục tiêu cần đạt:
                  </span>
                  <p className="text-xs text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif] line-clamp-3 leading-relaxed">
                    {topic.learningGoal}
                  </p>
                </div>

                {/* Destination info */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-[#7c747f]">
                  <span className="truncate max-w-[200px]">
                    <strong className="text-[#1e1926]">Điểm đến:</strong> {topic.destination}
                  </span>
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#f9f0ff] text-[#704f8d] font-semibold text-[10px]">
                    {topic.period}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#eee4f7] mt-3">
                <button
                  onClick={() => navigateTo(selectedGrade === 10 ? 'khoi-10' : selectedGrade === 12 ? 'khoi-12' : 'khoi-11')}
                  className="w-full py-2 px-3 rounded-full bg-[#f9f0ff] text-[#704f8d] hover:bg-[#704f8d] hover:text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Xem nội dung bài học</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SECTION: ĐỊA LÝ VÙNG LIÊN KẾT ĐÔ THỊ (Interactive Map & Highlight Card) */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-[#f9f0ff]/50 border-y border-[#e9dff2]/60">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider text-[#704f8d] block">
                ĐỊA LÝ VÙNG LIÊN KẾT ĐÔ THỊ
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold text-[#1e1926] mt-1">
                Bản Đồ Thành phố Hồ Chí Minh
              </h2>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] mt-1 max-w-2xl leading-relaxed">
                Khám phá mối liên kết hữu cơ giữa TP. Hồ Chí Minh cùng hai trung tâm phụ cận: Bình Dương (vành đai làng nghề, gốm sứ Lái Thiêu) và Bà Rịa - Vũng Tàu (cửa ngõ hàng hải & di sản biển đảo).
              </p>
            </div>

            {/* Regional Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#eee4f7] shadow-sm self-start md:self-auto overflow-x-auto">
              <button
                onClick={() => {
                  setActiveRegionFilter('all');
                  setSelectedRegionId(1);
                }}
                className={`px-3 py-1 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeRegionFilter === 'all'
                    ? 'bg-[#704f8d] text-white font-semibold'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                Tất cả vùng
              </button>
              <button
                onClick={() => {
                  setActiveRegionFilter('tphcm');
                  setSelectedRegionId(1);
                }}
                className={`px-3 py-1 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeRegionFilter === 'tphcm'
                    ? 'bg-[#704f8d] text-white font-semibold'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                TP.HCM
              </button>
              <button
                onClick={() => {
                  setActiveRegionFilter('binhduong');
                  setSelectedRegionId(3);
                }}
                className={`px-3 py-1 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeRegionFilter === 'binhduong'
                    ? 'bg-[#704f8d] text-white font-semibold'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                Bình Dương
              </button>
              <button
                onClick={() => {
                  setActiveRegionFilter('brvt');
                  setSelectedRegionId(2);
                }}
                className={`px-3 py-1 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeRegionFilter === 'brvt'
                    ? 'bg-[#704f8d] text-white font-semibold'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                BR – Vũng Tàu
              </button>
            </div>
          </div>

          {/* Map Layout Grid: 7 cols Map + 5 cols Highlight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Interactive Vector Map (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-[#fef08a] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#a16207] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ca8a04] animate-pulse"></span>
                  Bản Đồ TP.HCM (Mới) & Vùng Liên Kết • Chuẩn GDĐP
                </span>
                <span className="text-[11px] text-[#78716c]">Dữ liệu niên giám 2024</span>
              </div>

              {/* Vector SVG Map Display */}
              <div className="relative w-full min-h-[480px] sm:min-h-[540px] md:min-h-[580px] rounded-2xl bg-white border border-[#e5e7eb] overflow-hidden flex items-center justify-center p-2 sm:p-4">
                <RegionalMapVector
                  selectedRegionId={selectedRegionId}
                  onSelectRegion={(id) => {
                    setSelectedRegionId(id);
                    setActiveRegionFilter(id === 1 ? 'tphcm' : id === 2 ? 'brvt' : 'binhduong');
                  }}
                  activeRegionFilter={activeRegionFilter}
                />
              </div>

              {/* Legend & Instructions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-3 text-xs font-['Plus_Jakarta_Sans',sans-serif] text-[#44403c]">
                  <span 
                    className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => { setSelectedRegionId(1); setActiveRegionFilter('tphcm'); }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#e2c8f9] border-2 border-[#18181b]"></span> TP. Hồ Chí Minh
                  </span>
                  <span 
                    className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => { setSelectedRegionId(3); setActiveRegionFilter('binhduong'); }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#fef9b8] border-2 border-[#18181b]"></span> Bình Dương
                  </span>
                  <span 
                    className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => { setSelectedRegionId(2); setActiveRegionFilter('brvt'); }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#ffccd2] border-2 border-[#18181b]"></span> Bà Rịa – Vũng Tàu
                  </span>
                </div>
                <button
                  onClick={onNavigateToMap}
                  className="text-xs font-['Plus_Jakarta_Sans',sans-serif] text-[#a16207] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <span>Mở bản đồ toàn màn hình</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-[#78716c] italic">
                Bấm trực tiếp vào các vùng hoặc ghim số liệu trên bản đồ để khám phá tư liệu di sản.
              </p>
            </div>

            {/* Spotlight Heritage Card (5 Cols) matching Image 1 */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-[#e9dff2] shadow-sm space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold">
                  {selectedRegion.spotlight?.location || selectedRegion.name}
                </span>
                <button 
                  onClick={() => onShowToast("Đã lưu địa điểm", `Đã thêm ${selectedRegion.spotlight?.name} vào danh sách ghé thăm của bạn.`)}
                  className="p-1.5 rounded-full text-[#7c747f] hover:text-[#704f8d] hover:bg-[#f9f0ff] cursor-pointer"
                  title="Lưu di tích"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Spotlight Image */}
              <div className="w-full h-44 rounded-2xl overflow-hidden relative shadow-inner">
                <img
                  src={selectedRegion.spotlight?.image || ASSETS.bachDinh}
                  alt={selectedRegion.spotlight?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1.5">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926] leading-snug">
                  {selectedRegion.spotlight?.name}
                </h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                  {selectedRegion.spotlight?.desc}
                </p>
              </div>

              {/* Quiz Prompt Box */}
              <div className="p-3 bg-[#f9f0ff] rounded-2xl border border-[#eee4f7] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#704f8d]">
                  <HelpCircle className="w-4 h-4 text-[#704f8d]" />
                  Gợi ý câu hỏi kiểm tra:
                </div>
                <p className="text-xs text-[#1e1926] italic font-['Be_Vietnam_Pro',sans-serif]">
                  "{selectedRegion.spotlight?.quizHint}"
                </p>
                <div className="text-[11px] text-[#7c747f] pt-0.5">
                  <span className="font-semibold text-[#685f26]">Gợi ý đáp án:</span> Vua Thành Thái (triều Nguyễn) từng bị thực dân Pháp quản thúc tại đây (1907 - 1916).
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={() => {
                  onNavigateToGrade('khoi-11');
                  onShowToast("Đang mở bài học", `Đang chuyển hướng tới học phần liên kết ${selectedRegion.name}`);
                }}
                className="w-full py-2.5 px-4 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Khám Phá Cửa Biển Vũng Tàu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: GÓC THÀNH TÍCH & THỬ THÁCH TUẦN */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider text-[#704f8d]">
            HỌC MÀ CHƠI – CHƠI ĐỂ HIỂU SÂU
          </span>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold text-[#1e1926]">
            Góc Thành Tích & Thử Thách Tuần
          </h2>
          <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e]">
            Tham gia trả lời các câu đố văn hóa phương Nam định kỳ, tích điểm đổi giấy chứng nhận di sản số và thi đua giữa các trường THPT toàn thành phố.
          </p>
        </div>

        {/* Content Layout Grid: 7 cols Quiz Card + 5 cols Leaderboard & Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Challenge Quiz Box (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#e9dff2] shadow-sm space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#1e1926] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#fea619]"></span>
                {WEEKLY_CHALLENGE.week} • {WEEKLY_CHALLENGE.questionNumber}
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold">
                +{WEEKLY_CHALLENGE.points} Điểm Huy Hiệu
              </span>
            </div>

            {/* Question */}
            <div className="space-y-1">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#1e1926] leading-snug">
                {WEEKLY_CHALLENGE.question}
              </h3>
              <p className="text-xs text-[#7c747f] font-['Be_Vietnam_Pro',sans-serif]">
                {WEEKLY_CHALLENGE.subject}
              </p>
            </div>

            {/* 4 Interactive Radio Options */}
            <div className="space-y-2.5 pt-2">
              {WEEKLY_CHALLENGE.options.map((opt) => {
                const isSelected = selectedAnswer === opt.id;
                const isCorrect = opt.id === WEEKLY_CHALLENGE.correctAnswer;

                let btnStyle = "bg-[#f9f0ff] hover:bg-[#eee4f7] border-transparent text-[#1e1926]";
                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-green-100 border-green-400 text-green-900";
                  } else if (isSelected) {
                    btnStyle = "bg-red-100 border-red-400 text-red-900";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswerSelect(opt.id)}
                    disabled={quizSubmitted}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white text-[#704f8d] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs flex items-center justify-center shrink-0 border border-[#eee4f7]">
                        {opt.id}
                      </span>
                      <span className="text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif]">
                        {opt.text}
                      </span>
                    </div>
                    <div className="shrink-0">
                      {quizSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                      {!quizSubmitted && <span className="w-4 h-4 rounded-full border border-[#cdc3d0]"></span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {quizSubmitted && (
              <div className="p-3.5 bg-[#fdfaff] border border-[#eee4f7] rounded-2xl space-y-1 animate-in fade-in">
                <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#704f8d]">
                  Giải thích chuyên sâu:
                </span>
                <p className="text-xs text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif] leading-relaxed">
                  {WEEKLY_CHALLENGE.explanation}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#685f26] font-semibold">
                    Đã cộng {selectedAnswer === WEEKLY_CHALLENGE.correctAnswer ? '+50' : '+0'} điểm vào hồ sơ cá nhân.
                  </span>
                  <button
                    onClick={() => {
                      setSelectedAnswer(null);
                      setQuizSubmitted(false);
                    }}
                    className="text-xs text-[#704f8d] font-bold hover:underline cursor-pointer"
                  >
                    Làm lại câu đố
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Leaderboard & Quick Downloads (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Top Leaderboard */}
            <div className="bg-white rounded-3xl p-5 border border-[#e9dff2] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#1e1926] flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#fea619]" />
                  Bảng Vinh Danh Tuần Này
                </span>
                <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] text-[#7c747f] font-semibold">
                  Top THPT TP.HCM
                </span>
              </div>

              <div className="space-y-2">
                {leaderboard.map((user, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-2xl flex items-center justify-between text-xs transition-colors ${
                      user.isCurrentUser ? 'bg-[#f0e49c]/40 border border-[#f0e49c]' : 'bg-[#f9f0ff]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        user.rank === 1 
                          ? 'bg-[#fea619] text-[#201c00]' 
                          : user.rank === 2 
                            ? 'bg-[#cdc3d0] text-[#1e1926]' 
                            : 'bg-[#eee4f7] text-[#704f8d]'
                      }`}>
                        {user.rank}
                      </span>
                      <div>
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1e1926]">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif]">
                          {user.schoolClass}
                        </p>
                      </div>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[#704f8d]">
                      {user.score.toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Downloads */}
            <div className="bg-white rounded-3xl p-5 border border-[#e9dff2] shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1e1926]">
                <Download className="w-4 h-4 text-[#704f8d]" />
                Tài Liệu Ôn Tập Tải Nhanh
              </div>

              <button
                onClick={() => handleDownloadResource("Infographic 24 Quận Huyện Di Tích", "Infographic_Di_Tich_TPHCM.pdf")}
                className="w-full p-2.5 rounded-2xl bg-[#f9f0ff] hover:bg-[#eee4f7] border border-[#eee4f7] flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div>
                  <p className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1e1926]">
                    Infographic 24 Quận Huyện Di Tích
                  </p>
                  <p className="text-[10px] text-[#7c747f]">PDF • 12.4 MB • Cập nhật 2024</p>
                </div>
                <Download className="w-4 h-4 text-[#704f8d]" />
              </button>

              <button
                onClick={() => handleDownloadResource("Đề Cương Ôn Thi GDĐP Khối 11 Học Kỳ II", "De_Cuong_GDDP_Khoi_11.docx")}
                className="w-full p-2.5 rounded-2xl bg-[#f9f0ff] hover:bg-[#eee4f7] border border-[#eee4f7] flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div>
                  <p className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1e1926]">
                    Đề Cương Ôn Thi GDĐP Khối 11 Học Kỳ II
                  </p>
                  <p className="text-[10px] text-[#7c747f]">DOCX • 3.2 MB • Bám sát Sở GD&ĐT</p>
                </div>
                <Download className="w-4 h-4 text-[#704f8d]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
