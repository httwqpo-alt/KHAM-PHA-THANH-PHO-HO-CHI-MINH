import React, { useState } from 'react';
import { REGIONAL_DATA, MINI_QUIZ_GRADE_11, AUTHORS_DATA, ASSETS } from '../data/mockData';
import { AuthorProfile } from '../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Download, 
  Lock, 
  ArrowRight, 
  Heart, 
  Lightbulb, 
  Eye, 
  FileText, 
  Send, 
  Star, 
  Compass, 
  HelpCircle,
  Clock,
  MapPin,
  Check,
  BookmarkCheck
} from 'lucide-react';

interface Grade11ViewProps {
  onAddPoints: (points: number) => void;
  onSaveNote: (topic: string, content: string, email: string) => void;
  onShowToast: (title: string, message: string) => void;
  onOpenAuthorModal: (author: AuthorProfile) => void;
  userPoints: number;
  userEmail: string;
}

export const Grade11View: React.FC<Grade11ViewProps> = ({
  onAddPoints,
  onSaveNote,
  onShowToast,
  onOpenAuthorModal,
  userPoints,
  userEmail
}) => {
  // Region Selection for Section 2
  const [selectedRegionId, setSelectedRegionId] = useState<number>(1);

  // Lesson Tabs (1: Timeline, 2: Authors, 3: Historic Space, 4: Mini Quiz & Notebook)
  const [activeLessonTab, setActiveLessonTab] = useState<number>(1);

  // Mark Completed state
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Quiz interactive state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizFeedbacks, setQuizFeedbacks] = useState<Record<number, boolean>>({});

  // Notebook form state
  const [notebookEmail, setNotebookEmail] = useState<string>(userEmail || '');
  const [notebookNote, setNotebookNote] = useState<string>('');
  const [noteSavedMessage, setNoteSavedMessage] = useState<string | null>(null);

  const regionData = REGIONAL_DATA[selectedRegionId] || REGIONAL_DATA[1];

  const handleToggleCompleted = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    if (nextState) {
      onAddPoints(40);
      onShowToast("Đã hoàn thành bài học!", "Bạn được cộng +40 Điểm di sản cho Chủ đề 1 Khối 11.");
    } else {
      onShowToast("Đã hủy đánh dấu", "Bạn có thể học lại bài này bất cứ lúc nào.");
    }
  };

  const handleDownloadSheet = () => {
    onShowToast("Đang tạo tài liệu PDF", "Phiếu học tập Chủ đề 1 (Khối 11) đang được tải về máy của bạn...");
  };

  const handleQuizAnswer = (qId: number, choice: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: choice }));
    setQuizFeedbacks(prev => ({ ...prev, [qId]: isCorrect }));

    if (isCorrect) {
      onAddPoints(20);
      onShowToast("Chính xác! +20 Điểm", `Bạn đã trả lời đúng câu hỏi ${qId}!`);
    } else {
      onShowToast("Chưa chính xác", "Hãy đọc lại phần tóm tắt lý thuyết để tìm câu trả lời nhé.");
    }
  };

  const handleSaveNotebookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notebookNote.trim()) return;

    onSaveNote("Chủ đề 1: Văn học TP.HCM trước 1975", notebookNote, notebookEmail);
    onAddPoints(30);
    setNoteSavedMessage(`Đã đồng bộ thành công vào sổ tay của học sinh (${notebookEmail || 'em'})!`);
    onShowToast("Đã lưu sổ tay!", "Cảm nhận văn hóa di sản của em đã được ghi nhận vào hồ sơ cá nhân (+30 điểm).");
    setNotebookNote('');

    setTimeout(() => {
      setNoteSavedMessage(null);
    }, 4000);
  };

  return (
    <div className="w-full bg-[#fef7ff] pb-16">
      {/* 1. BANNER & HỌC TRÌNH CÁ NHÂN */}
      <section className="w-full bg-[#f9f0ff] py-10 px-4 md:px-6 lg:px-8 border-b border-[#e9dff2]/60">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold shadow-sm">
              <BookOpen className="w-4 h-4 text-[#685f26]" />
              Chương Trình Giáo Dục Địa Phương THPT
            </div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#704f8d] tracking-tight leading-tight">
              CHƯƠNG TRÌNH VĂN HÓA ĐỊA PHƯƠNG - KHỐI 11
            </h1>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed">
              Hành trình khám phá di sản văn học, chiều sâu lịch sử văn hóa đô thị phương Nam và mạng lưới liên kết vùng di sản văn hóa Sài Gòn mở rộng.
            </p>
          </div>

          {/* Personal Progress Card matching Image 3 */}
          <div className="w-full lg:w-96 bg-white p-5 rounded-3xl shadow-sm border border-[#e9dff2] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926] flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#fea619] fill-[#fea619]" />
                Tiến độ của bạn
              </span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#704f8d] font-bold bg-[#f9f0ff] px-3 py-1 rounded-full border border-[#eee4f7]">
                {isCompleted ? '3/4 Bài học' : '2/4 Bài học'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 bg-[#eee4f7] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#fea619] rounded-full transition-all duration-700"
                  style={{ width: isCompleted ? '75%' : '50%' }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[#7c747f] font-['Plus_Jakarta_Sans',sans-serif] text-xs">
                <span>{isCompleted ? '75% Hoàn thành' : '50% Hoàn thành'}</span>
                <span>Đã tích lũy: <strong className="text-[#704f8d]">{userPoints} điểm di sản</strong></span>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2 text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#fea619] animate-ping"></span>
              <span>Chủ đề đang học: <strong className="text-[#1e1926]">Văn học TP.HCM trước 1975</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHẦN 1: KHUNG CHƯƠNG TRÌNH & CHUẨN ĐẦU RA KHỐI 11 */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider text-[#704f8d] block">
              Phần 1: Lược Đồ Kiến Thức
            </span>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold text-[#1e1926] mt-1">
              Khung Chương Trình & Chuẩn Đầu Ra Khối 11
            </h2>
          </div>
          <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] max-w-md leading-relaxed">
            Định hình toàn diện từ tiếp nhận văn chương địa phương đến bồi đắp căn tính tự hào và phẩm chất công dân trẻ thành phố.
          </p>
        </div>

        {/* 4 Thematic Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 01 */}
          <div className="bg-white p-5 rounded-3xl border border-[#deb7fe] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f0e49c] text-[#201c00] flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
                01
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#f9f0ff] text-[#704f8d] font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold">
                {isCompleted ? 'Đã học xong' : 'Đang học'}
              </span>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                Văn học TP.HCM trước năm 1975
              </h3>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                Báo chí quốc ngữ ban mai, phong trào yêu nước, văn chương đất Sài Gòn – Chợ Lớn.
              </p>
            </div>
            <a 
              href="#chude1-detail"
              className="mt-4 pt-3 border-t border-[#eee4f7] flex items-center text-[#704f8d] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold gap-1 group-hover:underline"
            >
              <span>Chi tiết chủ đề</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 02 */}
          <div className="bg-white p-5 rounded-3xl border border-[#e9dff2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f9f0ff] text-[#704f8d] flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
                02
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#eee4f7] text-[#4b444e] font-['Plus_Jakarta_Sans',sans-serif] text-[11px]">
                Năm học 2026 - 2027
              </span>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                Nghệ thuật sân khấu truyền thống Nam Bộ
              </h3>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                Nghệ thuật Đờn ca tài tử, Sân khấu Cải lương tuồng cổ và hơi thở nhịp sống Nam Kỳ.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#eee4f7] flex items-center text-[#7c747f] font-['Plus_Jakarta_Sans',sans-serif] text-xs gap-1">
              <span>Sắp mở</span>
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-white p-5 rounded-3xl border border-[#e9dff2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f9f0ff] text-[#704f8d] flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
                03
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#eee4f7] text-[#4b444e] font-['Plus_Jakarta_Sans',sans-serif] text-[11px]">
                Năm học 2026 - 2027
              </span>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                Di sản kiến trúc đô thị & Tôn giáo
              </h3>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                Dấu ấn phong cách Đông Dương, kiến trúc Chợ Lớn, hệ thống đình – chùa – hội quán.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#eee4f7] flex items-center text-[#7c747f] font-['Plus_Jakarta_Sans',sans-serif] text-xs gap-1">
              <span>Sắp mở</span>
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 04 */}
          <div className="bg-white p-5 rounded-3xl border border-[#e9dff2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f9f0ff] text-[#704f8d] flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
                04
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#eee4f7] text-[#4b444e] font-['Plus_Jakarta_Sans',sans-serif] text-[11px]">
                Dự án cuối khóa
              </span>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                Không gian làng nghề & Kết nối vùng
              </h3>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                Trải nghiệm di sản thủ công mỹ nghệ, hành trình sông ngòi liên kết Đông Nam Bộ.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#eee4f7] flex items-center text-[#7c747f] font-['Plus_Jakarta_Sans',sans-serif] text-xs gap-1">
              <span>Sắp mở</span>
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* 2 Goal Cards: Phẩm Chất & Năng Lực */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Phẩm Chất */}
          <div className="bg-[#f9f0ff] p-6 rounded-3xl border border-[#eee4f7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0e49c] text-[#201c00] flex items-center justify-center shadow-sm">
                  <Heart className="w-5 h-5 fill-[#201c00]" />
                </div>
                <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926]">
                  Mục Tiêu Về Phẩm Chất
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                  <span><strong>Tình yêu quê hương:</strong> Bồi đắp cảm xúc gắn bó ruột thịt với mảnh đất, con người Sài Gòn – Chợ Lớn – Gia Định qua từng thời kỳ lịch sử.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                  <span><strong>Lòng tự hào & Trách nhiệm:</strong> Nhận diện giá trị bản sắc địa phương, nâng cao ý thức chủ động giữ gìn di sản tinh thần, cổ vũ sáng tạo nghệ thuật trẻ.</span>
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#eee4f7] text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#4b444e] flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-[#704f8d]" />
              <span>Chuẩn phẩm chất theo khung GDPT 2018 Bộ Giáo Dục ban hành</span>
            </div>
          </div>

          {/* Card Năng Lực */}
          <div className="bg-[#f9f0ff] p-6 rounded-3xl border border-[#eee4f7] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#704f8d] text-white flex items-center justify-center shadow-sm">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926]">
                  Mục Tiêu Về Năng Lực
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                  <span><strong>Cảm thụ văn chương:</strong> Năng lực phân tích, đánh giá ngôn ngữ bình dân Nam Bộ, phong cách tự sự Nam Kỳ trong các trích đoạn tác phẩm.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                  <span><strong>Tư duy không gian văn hóa:</strong> Kỹ năng định vị địa danh, so sánh liên hệ bối cảnh lịch sử xã hội và mạng lưới giao thương vùng trên bản đồ.</span>
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#eee4f7] text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#4b444e] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#704f8d]" />
              <span>Tích hợp công cụ phân tích không gian số & tự học tương tác</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PHẦN 2: BẢN ĐỒ TƯƠNG TÁC PHÂN VÙNG VĂN HÓA LIÊN KẾT */}
      <section className="w-full bg-white py-14 px-4 md:px-6 lg:px-8 border-y border-[#e9dff2]/60">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase tracking-wider text-[#704f8d] block">
                Phần 2: Không Gian Trải Nghiệm
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold text-[#1e1926] mt-1">
                Bản Đồ Tương Tác Phân Vùng Văn Hóa Liên Kết
              </h2>
            </div>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] max-w-md leading-relaxed">
              Khám phá 4 khu vực không gian văn hóa đặc thù. Nhấp vào các phân vùng trên bản đồ để cập nhật danh mục học phần tương ứng.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Interactive Map (7 Cols) */}
            <div className="lg:col-span-7 bg-[#f9f0ff] rounded-3xl p-5 border border-[#eee4f7] shadow-sm space-y-4">
              {/* Region Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(id => {
                  const reg = REGIONAL_DATA[id];
                  const isCurrent = selectedRegionId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedRegionId(id)}
                      className={`px-2 py-2 rounded-2xl text-center font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#704f8d] text-white shadow-sm'
                          : 'bg-white text-[#4b444e] hover:bg-[#eee4f7]'
                      }`}
                    >
                      Khu vực {id}: {id === 1 ? 'TP.HCM' : id === 2 ? 'BR - VT' : id === 3 ? 'Bình Dương' : 'Vùng Phụ Cận'}
                    </button>
                  );
                })}
              </div>

              {/* Vector SVG representation */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-white border border-[#e9dff2] overflow-hidden flex items-center justify-center p-3">
                <svg
                  className="w-full h-full object-contain"
                  viewBox="0 0 600 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Rivers */}
                  <path
                    d="M120,0 C150,80 280,120 290,190 C300,260 270,330 310,400"
                    fill="none"
                    stroke="#deb7fe"
                    strokeWidth="8"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                  <path
                    d="M300,230 C380,240 450,290 520,380"
                    fill="none"
                    stroke="#deb7fe"
                    strokeWidth="6"
                    opacity="0.5"
                  />

                  {/* Region 3: Bình Dương (Sông Bé) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-[1.01]"
                    onClick={() => setSelectedRegionId(3)}
                  >
                    <path
                      d="M140,20 L360,25 L340,110 L160,100 Z"
                      fill={selectedRegionId === 3 ? '#deb7fe' : '#f4eafd'}
                      stroke={selectedRegionId === 3 ? '#704f8d' : '#cdc3d0'}
                      strokeWidth={selectedRegionId === 3 ? '3' : '2'}
                      className="transition-all duration-300"
                    />
                    <circle cx="250" cy="65" r="7" fill="#70537b" />
                    <text x="250" y="88" textAnchor="middle" fill="#1e1926" fontSize="11" fontWeight="bold">
                      Bình Dương (Sông Bé)
                    </text>
                  </g>

                  {/* Region 4: Gia Định & Phụ Cận */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-[1.01]"
                    onClick={() => setSelectedRegionId(4)}
                  >
                    <path
                      d="M40,70 L150,110 L140,260 L30,220 Z"
                      fill={selectedRegionId === 4 ? '#f0e49c' : '#f4eafd'}
                      stroke={selectedRegionId === 4 ? '#704f8d' : '#cdc3d0'}
                      strokeWidth={selectedRegionId === 4 ? '3' : '2'}
                      className="transition-all duration-300"
                    />
                    <circle cx="90" cy="165" r="7" fill="#855300" />
                    <text x="90" y="190" textAnchor="middle" fill="#1e1926" fontSize="11" fontWeight="bold">
                      Gia Định & Phụ Cận
                    </text>
                  </g>

                  {/* Region 1: TP.HCM Nội Đô (Center) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => setSelectedRegionId(1)}
                  >
                    <path
                      d="M170,120 L350,125 L360,250 L200,280 L160,220 Z"
                      fill={selectedRegionId === 1 ? '#f0e49c' : '#f4eafd'}
                      stroke={selectedRegionId === 1 ? '#704f8d' : '#cdc3d0'}
                      strokeWidth={selectedRegionId === 1 ? '3.5' : '2'}
                      className="transition-all duration-300 shadow-md"
                    />
                    <circle cx="260" cy="190" r="10" fill="#704f8d" className="animate-pulse" />
                    <circle cx="260" cy="190" r="4" fill="#ffffff" />
                    <text x="260" y="218" textAnchor="middle" fill="#704f8d" fontSize="12" fontWeight="bold">
                      TP.HCM Nội Đô Lịch Sử
                    </text>
                  </g>

                  {/* Region 2: Bà Rịa - Vũng Tàu (Biển) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-[1.01]"
                    onClick={() => setSelectedRegionId(2)}
                  >
                    <path
                      d="M380,180 L560,190 L570,360 L400,320 L370,240 Z"
                      fill={selectedRegionId === 2 ? '#deb7fe' : '#f4eafd'}
                      stroke={selectedRegionId === 2 ? '#704f8d' : '#cdc3d0'}
                      strokeWidth={selectedRegionId === 2 ? '3' : '2'}
                      className="transition-all duration-300"
                    />
                    <circle cx="470" cy="270" r="7" fill="#fea619" />
                    <text x="470" y="295" textAnchor="middle" fill="#1e1926" fontSize="11" fontWeight="bold">
                      Bà Rịa - Vũng Tàu (Biển)
                    </text>
                  </g>
                </svg>

                {/* Hint indicator */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[#4b444e] font-['Plus_Jakarta_Sans',sans-serif] text-[11px] flex items-center gap-1 border border-[#eee4f7]">
                  <Compass className="w-3.5 h-3.5 text-[#704f8d]" />
                  <span>Nhấp trực tiếp vào phân vùng trên đồ họa</span>
                </div>
              </div>

              {/* Map Legend matching Image 3 */}
              <div className="p-3 bg-white rounded-2xl border border-[#eee4f7] flex flex-wrap items-center justify-between gap-2 text-[#4b444e] font-['Plus_Jakarta_Sans',sans-serif] text-xs">
                <span className="font-bold text-[#1e1926]">Chú giải:</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#704f8d]"></span> KV 1: Trung tâm Sài Gòn</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#fea619]"></span> KV 2: Biển đảo BR-VT</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#70537b]"></span> KV 3: Làng nghề Bình Dương</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#855300]"></span> KV 4: Vùng ven cổ kính</span>
              </div>
            </div>

            {/* Dynamic Content Hub (5 Cols) */}
            <div className="lg:col-span-5 bg-[#f9f0ff] rounded-3xl p-6 border border-[#eee4f7] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#704f8d] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold">
                  {regionData.tag}
                </span>
                <span className="text-xs text-[#4b444e] flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[#fea619]" /> Dữ liệu mở rộng
                </span>
              </div>

              <div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#1e1926]">
                  {regionData.title}
                </h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-1 leading-relaxed">
                  {regionData.desc}
                </p>
              </div>

              {/* Topic List for this Region */}
              <div className="space-y-2.5 pt-1">
                {regionData.topics.map((topic, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white border border-[#eee4f7] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#f9f0ff] text-[#704f8d] flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#1e1926]">
                        {topic.title}
                      </p>
                      <p className="font-['Be_Vietnam_Pro',sans-serif] text-[11px] text-[#4b444e] mt-0.5 leading-relaxed">
                        {topic.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#chude1-detail"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-full bg-[#f0e49c] text-[#201c00] hover:bg-[#ebd978] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all gap-2"
                >
                  <span>Khám phá bài học trọng tâm của vùng</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHẦN 3: BÀI HỌC TRỌNG TÂM LỚP 11 (CHỦ ĐỀ 1) */}
      <section id="chude1-detail" className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-14 space-y-8 scroll-mt-24">
        {/* Hero Header Chủ Đề 1 */}
        <div className="bg-[#eee4f7]/70 border border-[#e9dff2] rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#704f8d] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold shadow-sm">
                <Star className="w-3.5 h-3.5 text-[#fea619] fill-[#fea619]" />
                BÀI HỌC TRỌNG TÂM LỚP 11
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#704f8d] tracking-tight leading-tight">
                CHỦ ĐỀ 1: VĂN HỌC THÀNH PHỐ HỒ CHÍ MINH TRƯỚC NĂM 1975
              </h2>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed">
                Bước ngoặt ngôn ngữ chữ Quốc ngữ, tinh thần phóng khoáng trượng nghĩa đất phương Nam và bản hòa ca của ký ức đô thị qua ngòi bút của các bậc tiền hiền.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <button
                onClick={handleToggleCompleted}
                className={`px-5 py-2.5 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-[#f0e49c] text-[#201c00]'
                    : 'bg-[#704f8d] text-white hover:bg-[#583975]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Đã hoàn thành!' : 'Đánh dấu đã học'}</span>
              </button>

              <button
                onClick={handleDownloadSheet}
                className="px-5 py-2.5 rounded-full bg-white text-[#704f8d] hover:bg-[#f9f0ff] border border-[#e9dff2] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải phiếu học tập (PDF)</span>
              </button>
            </div>
          </div>

          {/* 3 Summary Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#cdc3d0]/40">
            <div className="p-4 bg-white rounded-2xl border border-[#eee4f7]">
              <div className="flex items-center gap-2 text-[#685f26] mb-1">
                <FileText className="w-4 h-4" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">Gia Định Báo (1865)</span>
              </div>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                Tờ báo chữ Quốc ngữ tiên phong tại Sài Gòn đặt nền móng cho nền văn xuôi hiện đại Việt Nam thoát khỏi ảnh hưởng chữ Nho.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#eee4f7]">
              <div className="flex items-center gap-2 text-[#704f8d] mb-1">
                <Lightbulb className="w-4 h-4" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">Nhóm Tiền Phong</span>
              </div>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                Trương Vĩnh Ký, Huỳnh Tịnh Của... với công trình khảo cứu, ghi chép tục ngữ, truyện cười, giữ gìn hồn cốt lời ăn tiếng nói Nam Kỳ.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#eee4f7]">
              <div className="flex items-center gap-2 text-[#70537b] mb-1">
                <BookOpen className="w-4 h-4" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">Hồn Rừng & Phố Thị</span>
              </div>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                Sơn Nam ("Hương rừng Cà Mau"), Bình Nguyên Lộc ("Hương quê"), dựng nên bức tranh khẩn hoang và tâm hồn hào sảng phương Nam.
              </p>
            </div>
          </div>
        </div>

        {/* 4 TABS NAVIGATION */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#e9dff2]">
            <button
              onClick={() => setActiveLessonTab(1)}
              className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeLessonTab === 1
                  ? 'bg-[#704f8d] text-white shadow-sm'
                  : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
              }`}
            >
              1. Tiến trình & Bối cảnh
            </button>
            <button
              onClick={() => setActiveLessonTab(2)}
              className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeLessonTab === 2
                  ? 'bg-[#704f8d] text-white shadow-sm'
                  : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
              }`}
            >
              2. Tác giả & Trích đoạn
            </button>
            <button
              onClick={() => setActiveLessonTab(3)}
              className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeLessonTab === 3
                  ? 'bg-[#704f8d] text-white shadow-sm'
                  : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
              }`}
            >
              3. Không gian Sài Gòn xưa
            </button>
            <button
              onClick={() => setActiveLessonTab(4)}
              className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeLessonTab === 4
                  ? 'bg-[#f0e49c] text-[#201c00] shadow-sm'
                  : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#685f26]" />
              <span>4. Trắc nghiệm mini & Sổ tay văn hóa</span>
            </button>
          </div>

          {/* TAB 1: TIẾN TRÌNH & BỐI CẢNH */}
          {activeLessonTab === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              {/* Left Timeline */}
              <div className="bg-white p-6 rounded-3xl border border-[#e9dff2] shadow-sm space-y-4">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#704f8d] flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Các Giai Đoạn Hình Thành Chủ Yếu
                </h3>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#deb7fe]">
                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#704f8d] ring-4 ring-white"></span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#1e1926]">
                      1865 – Đầu thế kỷ XX: Thuở bình minh Quốc ngữ
                    </h4>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-1 leading-relaxed">
                      Sự ra mắt của tờ Gia Định Báo và những tác phẩm truyện dịch, ký sự đời thường của Trương Vĩnh Ký giúp tiếng nói bình dân trở thành ngôn ngữ nghệ thuật.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#fea619] ring-4 ring-white"></span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#1e1926]">
                      1930 – 1945: Dòng văn học yêu nước & hiện thực
                    </h4>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-1 leading-relaxed">
                      Ngòi bút phản biện xã hội, truyền bá tinh thần độc lập qua thơ ca bí mật, kịch nghệ và phóng sự tả thực đất Sài Gòn hoa lệ nhưng đầy trăn trở.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#70537b] ring-4 ring-white"></span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#1e1926]">
                      1954 – 1975: Không gian văn hóa khẩn hoang & đô thị
                    </h4>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-1 leading-relaxed">
                      Sơn Nam, Bình Nguyên Lộc, Vương Hồng Sển... hoài niệm cội nguồn đất phương Nam, ký ức phong thổ, giữ gìn chất thuần khiết giữa làn sóng văn hóa ngoại lai.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Infographic Card with image from user HTML */}
              <div className="bg-[#f9f0ff] p-6 rounded-3xl border border-[#eee4f7] shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 shadow-sm">
                    <img
                      src={ASSETS.printingPress}
                      alt="Nhà in Gia Định Báo Sài Gòn"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926]">
                    Vì sao Sài Gòn là cái nôi của chữ Quốc ngữ?
                  </h4>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-2 leading-relaxed">
                    Do tính chất cởi mở của một thương cảng quốc tế đang mở mang, chính sách thực nghiệm chữ mẫu tự La-tinh và tinh thần thực tiễn không chịu câu nệ của cư dân Nam Bộ đã giúp chữ Quốc ngữ bén rễ sớm nhất và rực rỡ nhất tại vùng đất này.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#eee4f7] flex items-center justify-between text-[#1e1926]">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs flex items-center gap-1.5 text-[#685f26]">
                    <Lightbulb className="w-4 h-4 text-[#fea619]" />
                    Điểm cốt lõi kỳ thi:
                  </span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold text-[#704f8d]">
                    Nhớ: Gia Định Báo ngày 15/4/1865
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TÁC GIẢ & TRÍCH ĐOẠN */}
          {activeLessonTab === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {AUTHORS_DATA.map((author) => (
                <div
                  key={author.id}
                  className="bg-white rounded-3xl p-5 border border-[#e9dff2] shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="h-44 rounded-2xl overflow-hidden shadow-inner">
                      <img
                        src={author.image}
                        alt={author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold ${author.roleColor}`}>
                      {author.role}
                    </span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926]">
                      {author.name} ({author.years})
                    </h4>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] font-medium">
                      Tác phẩm: {author.works}
                    </p>
                    <blockquote className="p-3 rounded-2xl bg-[#f9f0ff] font-['Be_Vietnam_Pro',sans-serif] text-xs italic text-[#4b444e] border-l-2 border-[#704f8d]">
                      "{author.quote}"
                    </blockquote>
                  </div>

                  <button
                    onClick={() => onOpenAuthorModal(author)}
                    className="w-full py-2 px-3 rounded-full bg-[#f9f0ff] text-[#704f8d] hover:bg-[#704f8d] hover:text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Đọc phân tích nhanh</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: KHÔNG GIAN SÀI GÒN XƯA */}
          {activeLessonTab === 3 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#e9dff2] shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="max-w-2xl space-y-1">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#1e1926]">
                  Bản Đồ Ký Ức Đô Thị Trong Trang Viết
                </h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed">
                  Văn học không chỉ là chữ nghĩa mà còn là sự bảo tồn sinh động không gian địa danh Sài Gòn xưa: từ Bến Nghé, Chợ Quán, Thủ Thiêm đến dòng Kênh Tàu Hủ tấp nập thuyền bè ghe chiếu.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#f9f0ff] p-5 rounded-2xl border border-[#eee4f7] space-y-2">
                  <div className="w-9 h-9 rounded-full bg-[#f0e49c] text-[#201c00] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                    Kênh Tàu Hủ – Bến Bình Đông
                  </h4>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                    Bến thuyền buôn bán lúa gạo, trái cây miền Tây hội tụ; xuất hiện trong nhiều hồi ức của nhà văn Sơn Nam về không gian “trên bến dưới thuyền”.
                  </p>
                </div>

                <div className="bg-[#f9f0ff] p-5 rounded-2xl border border-[#eee4f7] space-y-2">
                  <div className="w-9 h-9 rounded-full bg-[#deb7fe] text-[#2a0946] flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                    Đường Catinat (Đồng Khởi nay)
                  </h4>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                    Trung tâm sinh hoạt trí thức, nơi đặt tòa soạn báo chí, quán cà phê văn nghệ sĩ Sài Gòn đàm luận thời cuộc và sáng tác văn thơ đô thị.
                  </p>
                </div>

                <div className="bg-[#f9f0ff] p-5 rounded-2xl border border-[#eee4f7] space-y-2">
                  <div className="w-9 h-9 rounded-full bg-[#eee4f7] text-[#704f8d] flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                    Xóm Thuốc Gò Vấp – Gia Định Cũ
                  </h4>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                    Không gian ngoại vi bình dị với vườn tược trù phú, những phong tục thờ cúng gia tiên, lễ hội đình làng được khắc họa chân thực qua ngòi bút Nam Bộ.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TRẮC NGHIỆM MINI & SỔ TAY */}
          {activeLessonTab === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
              {/* 3 Mini Quiz Questions (7 Cols) */}
              <div className="lg:col-span-7 bg-[#f9f0ff] p-6 rounded-3xl border border-[#eee4f7] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#704f8d] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#fea619]" />
                    Kiểm Tra Nhanh (Quiz Ôn Tập)
                  </span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs px-2.5 py-0.5 rounded-full bg-white text-[#704f8d] border border-[#eee4f7]">
                    3 Câu hỏi (+60 Điểm)
                  </span>
                </div>

                <div className="space-y-4">
                  {MINI_QUIZ_GRADE_11.map((quiz) => {
                    const answered = quizAnswers[quiz.id];
                    const isCorrect = quizFeedbacks[quiz.id];

                    return (
                      <div key={quiz.id} className="p-4 bg-white rounded-2xl border border-[#eee4f7] space-y-2.5">
                        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#1e1926]">
                          {quiz.id}. {quiz.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {quiz.options.map((opt) => {
                            const selectedThis = answered === opt.id;
                            let style = "bg-[#f9f0ff] hover:bg-[#eee4f7] text-[#1e1926] border-transparent";
                            if (answered) {
                              if (opt.id === quiz.correctAnswer) {
                                style = "bg-green-100 text-green-900 border-green-300 font-semibold";
                              } else if (selectedThis) {
                                style = "bg-red-100 text-red-900 border-red-300";
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                onClick={() => handleQuizAnswer(quiz.id, opt.id, opt.id === quiz.correctAnswer)}
                                disabled={Boolean(answered)}
                                className={`p-2.5 rounded-xl border text-left font-['Be_Vietnam_Pro',sans-serif] text-xs flex items-center gap-2 transition-all cursor-pointer ${style}`}
                              >
                                <span className="w-5 h-5 rounded-full bg-white text-[#704f8d] font-bold flex items-center justify-center shrink-0 border border-[#eee4f7] text-[10px]">
                                  {opt.id}
                                </span>
                                <span>{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {answered && (
                          <div className={`p-2 rounded-xl text-xs font-['Be_Vietnam_Pro',sans-serif] mt-1 ${
                            isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                          }`}>
                            <strong>{isCorrect ? 'Chính xác! ' : 'Chưa đúng rồi! '}</strong>
                            {quiz.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sổ Tay Văn Hóa Form (5 Cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#e9dff2] shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f0e49c] text-[#201c00] flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                      Lưu Vào Sổ Tay Văn Hóa
                    </h4>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#7c747f]">
                      Lưu chắt lọc kiến thức vào sổ tay văn hóa cá nhân
                    </p>
                  </div>
                </div>

                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                  Ghi lại cảm nhận về các tác giả hoặc câu nói tâm đắc nhất của nhà văn Sơn Nam, Bình Nguyên Lộc để lưu giữ kiến thức và tự tích lũy điểm rèn luyện.
                </p>

                <form onSubmit={handleSaveNotebookSubmit} className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <label className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold text-[#1e1926]">
                      Email cá nhân
                    </label>
                    <input
                      type="email"
                      value={notebookEmail}
                      onChange={(e) => setNotebookEmail(e.target.value)}
                      placeholder="email.canhan@gmail.com"
                      required
                      className="w-full px-3.5 py-2 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] text-[#1e1926] text-xs font-['Be_Vietnam_Pro',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#704f8d]/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold text-[#1e1926]">
                      Ghi chép / Đoạn văn cảm thụ ngắn (100 – 200 chữ)
                    </label>
                    <textarea
                      rows={4}
                      value={notebookNote}
                      onChange={(e) => setNotebookNote(e.target.value)}
                      placeholder="Ghi lại suy nghĩ của em về nét phóng khoáng trượng nghĩa của người phương Nam..."
                      required
                      className="w-full p-3.5 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] text-[#1e1926] text-xs font-['Be_Vietnam_Pro',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#704f8d]/40 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Lưu ghi chú & Tiến trình</span>
                  </button>
                </form>

                {noteSavedMessage && (
                  <div className="p-3 rounded-2xl bg-[#f0e49c] text-[#201c00] text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-center animate-in fade-in">
                    {noteSavedMessage}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
