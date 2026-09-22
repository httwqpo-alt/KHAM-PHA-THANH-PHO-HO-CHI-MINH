import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab, GradeLevel } from '../types';
import { 
  GRADE_10_TOPICS, 
  GRADE_11_TOPICS, 
  GRADE_12_TOPICS 
} from '../data/mockData';
import { 
  Sparkles, 
  Download, 
  ArrowRight, 
  Layers,
  Star,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Compass,
  FileText
} from 'lucide-react';

interface HomeViewProps {
  onNavigateToGrade?: (grade: NavigationTab, topicId?: string) => void;
  onNavigateToGrade11?: (topicId?: string) => void;
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

  const navigateTo = (tab: NavigationTab, topicId?: string) => {
    if (onNavigateToGrade) {
      onNavigateToGrade(tab, topicId);
    } else if (onNavigateToGrade11 && tab === 'khoi-11') {
      onNavigateToGrade11(topicId);
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

      {/* 2. SECTION: CÁC CHỦ ĐỀ HỌC TẬP (Khối 10: 7 chủ đề, Khối 11: 8 chủ đề, Khối 12: 8 chủ đề) */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider text-[#704f8d] block">
              LỘ TRÌNH GIÁO DỤC ĐỊA PHƯƠNG THPT
            </span>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold text-[#1e1926] mt-1">
              {selectedGrade === 10 ? '7 Chủ Đề Khám Phá' : '8 Chủ Đề Khám Phá'}
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
                Khối 10 (7 Chủ Đề)
              </button>
              <button
                onClick={() => setSelectedGrade(11)}
                className={`px-4 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all cursor-pointer ${
                  selectedGrade === 11
                    ? 'bg-[#704f8d] text-white shadow-sm'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                Khối 11 (8 Chủ Đề)
              </button>
              <button
                onClick={() => setSelectedGrade(12)}
                className={`px-4 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all cursor-pointer ${
                  selectedGrade === 12
                    ? 'bg-[#704f8d] text-white shadow-sm'
                    : 'text-[#4b444e] hover:text-[#1e1926]'
                }`}
              >
                Khối 12 (8 Chủ Đề)
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
                {selectedGrade === 10 && 'Khối 10: 7 Chủ Đề Giáo Dục Địa Phương TP.HCM'}
                {selectedGrade === 11 && 'Khối 11: 8 Chủ Đề Giáo Dục Địa Phương TP.HCM'}
                {selectedGrade === 12 && 'Khối 12: 8 Chủ Đề Giáo Dục Địa Phương TP.HCM'}
              </h3>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e]">
                {selectedGrade === 10 && 'Bao gồm 7 chủ đề cốt lõi: Biến đổi khí hậu, Đạo lí cội nguồn, Bảo tồn di sản, Văn học dân gian, Nhân vật nghệ thuật, Ô nhiễm môi trường, Định hướng nghề nghiệp.'}
                {selectedGrade === 11 && 'Bao gồm 8 chủ đề chuyên sâu: Văn học, Du lịch, Danh nhân, Âm nhạc, Kiến trúc, Môi trường, STEM & Pháp luật.'}
                {selectedGrade === 12 && 'Bao gồm 8 chủ đề bứt phá: Thị trường lao động, Giao thông vận tải, Thành phố đổi mới từ 1991, Văn học sau 1975, Nghệ thuật truyền thống, Mỹ thuật ứng dụng, Lễ hội truyền thống, Ý tưởng khởi nghiệp.'}
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
                  onClick={() => navigateTo(selectedGrade === 10 ? 'khoi-10' : selectedGrade === 12 ? 'khoi-12' : 'khoi-11', topic.id)}
                  className="w-full py-2.5 px-3 rounded-full bg-[#f9f0ff] text-[#704f8d] hover:bg-[#704f8d] hover:text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
                >
                  <span>Xem nội dung bài học</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SECTION: TÀI LIỆU ÔN TẬP & ĐỀ CƯƠNG TẢI NHANH */}
      <section className="w-full py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider text-[#704f8d]">
              HỌC LIỆU SỐ BỔ TRỢ
            </span>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold text-[#1e1926] mt-1">
              Tài Liệu Ôn Tập & Đề Cương Tải Nhanh
            </h2>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] mt-1 max-w-2xl">
              Học liệu số tổng hợp di tích lịch sử, infographic chuyên đề và đề cương ôn thi môn Giáo dục địa phương TP.HCM theo chuẩn GDPT 2018.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-[#e9dff2] shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#f9f0ff] flex items-center justify-center text-[#704f8d]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eee4f7] text-[#704f8d] text-[11px] font-bold font-['Plus_Jakarta_Sans',sans-serif]">
                  PDF • 12.4 MB
                </span>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926] mt-2 leading-snug">
                  Infographic 24 Quận Huyện Di Tích
                </h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-1 leading-relaxed">
                  Bản đồ trực quan các di tích lịch sử - văn hóa được xếp hạng cấp quốc gia và thành phố tại 24 quận, huyện và TP. Thủ Đức.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDownloadResource("Infographic 24 Quận Huyện Di Tích", "Infographic_Di_Tich_TPHCM.pdf")}
              className="w-full py-2.5 px-4 rounded-full bg-[#f9f0ff] hover:bg-[#704f8d] text-[#704f8d] hover:text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#eee4f7]"
            >
              <Download className="w-4 h-4" />
              <span>Tải Infographic (PDF)</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#e9dff2] shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#f0e49c]/40 flex items-center justify-center text-[#685f26]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f0e49c]/60 text-[#201c00] text-[11px] font-bold font-['Plus_Jakarta_Sans',sans-serif]">
                  DOCX • 3.2 MB
                </span>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926] mt-2 leading-snug">
                  Đề Cương Ôn Thi GDĐP Khối 11
                </h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-1 leading-relaxed">
                  Tài liệu trọng tâm 8 chủ đề học tập GDĐP Khối 11, bám sát cấu trúc đề kiểm tra định kỳ của Sở Giáo dục và Đào tạo TP.HCM.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDownloadResource("Đề Cương Ôn Thi GDĐP Khối 11 Học Kỳ II", "De_Cuong_GDDP_Khoi_11.docx")}
              className="w-full py-2.5 px-4 rounded-full bg-[#f9f0ff] hover:bg-[#704f8d] text-[#704f8d] hover:text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#eee4f7]"
            >
              <Download className="w-4 h-4" />
              <span>Tải Đề Cương (DOCX)</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#e9dff2] shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#e2f0d9] flex items-center justify-center text-[#2e6930]">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#d4edda] text-[#155724] text-[11px] font-bold font-['Plus_Jakarta_Sans',sans-serif]">
                  PDF • 8.6 MB
                </span>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926] mt-2 leading-snug">
                  Sổ Tay Hệ Sinh Thái Cần Giờ
                </h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-1 leading-relaxed">
                  Tập hồ sơ chuyên đề Rừng ngập mặn Cần Giờ: đa dạng sinh thái, điều hòa khí hậu và các tour học tập thực địa di sản thiên nhiên.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDownloadResource("Sổ Tay Hệ Sinh Thái Rừng Sác Cần Giờ", "So_Tay_Sinh_Thai_Can_Gio.pdf")}
              className="w-full py-2.5 px-4 rounded-full bg-[#f9f0ff] hover:bg-[#704f8d] text-[#704f8d] hover:text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#eee4f7]"
            >
              <Download className="w-4 h-4" />
              <span>Tải Sổ Tay (PDF)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
