import React, { useState, useEffect } from 'react';
import { MINI_QUIZ_GRADE_11, AUTHORS_DATA, ASSETS, GRADE_11_TOPICS } from '../data/mockData';
import { AuthorProfile } from '../types';
import { Grade11Topic2Content } from './Grade11Topic2Content';
import { TopicLessonGenericContent } from './TopicLessonGenericContent';
import { BilingualHandbookViewer } from './BilingualHandbookViewer';
import { 
  BookOpen, 
  CheckCircle2, 
  Download, 
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
  BookmarkCheck,
  Play,
  ExternalLink,
  Sparkles,
  Ship,
  Languages
} from 'lucide-react';

interface Grade11ViewProps {
  activeTopicId?: string;
  onSelectTopicId?: (topicId: string) => void;
  onAddPoints: (points: number) => void;
  onSaveNote: (topic: string, content: string, email: string) => void;
  onShowToast: (title: string, message: string) => void;
  onOpenAuthorModal: (author: AuthorProfile) => void;
  userPoints: number;
  userEmail: string;
}

export const Grade11View: React.FC<Grade11ViewProps> = ({
  activeTopicId = 'topic-11-01',
  onSelectTopicId,
  onAddPoints,
  onSaveNote,
  onShowToast,
  onOpenAuthorModal,
  userPoints,
  userEmail
}) => {
  // Current active topic ID (topic-11-01 or topic-11-02, etc.)
  const [selectedTopicId, setSelectedTopicId] = useState<string>(activeTopicId);
  const activeTopic = GRADE_11_TOPICS.find(t => t.id === selectedTopicId) || GRADE_11_TOPICS[0];

  useEffect(() => {
    if (activeTopicId) {
      setSelectedTopicId(activeTopicId);
    }
  }, [activeTopicId]);

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    if (onSelectTopicId) {
      onSelectTopicId(id);
    }
    setActiveLessonTab(1);
  };

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
              <span>Chủ đề đang học: <strong className="text-[#1e1926]">{selectedTopicId === 'topic-11-02' ? 'Chủ đề 2: Phát triển du lịch ở TPHCM' : 'Chủ đề 1: Văn học TP.HCM trước 1975'}</strong></span>
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
            Chọn chủ đề để xem định hướng năng lực, phẩm chất và khám phá toàn diện nội dung học tập theo chuẩn GDPT 2018.
          </p>
        </div>

        {/* Topic Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {GRADE_11_TOPICS.map((t) => {
            const isCurrent = selectedTopicId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTopic(t.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  isCurrent
                    ? 'bg-[#704f8d] text-white shadow-sm ring-2 ring-[#deb7fe]'
                    : 'bg-white text-[#4b444e] hover:bg-[#f9f0ff] border border-[#eee4f7]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                  isCurrent ? 'bg-white text-[#704f8d]' : 'bg-[#eee4f7] text-[#704f8d]'
                }`}>
                  {t.code}
                </span>
                <span className="whitespace-nowrap">{t.title}</span>
                {t.status === 'active' && (
                  <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-[#fea619]' : 'bg-emerald-500'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Thematic Topic Focus Card */}
        <div className="w-full">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#deb7fe] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group relative overflow-hidden">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f0e49c] text-[#201c00] flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-lg sm:text-xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                {activeTopic.code.replace(/\D/g, '') || '01'}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#f9f0ff] text-[#704f8d] font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold">
                    {isCompleted ? 'Đã học xong' : (activeTopic.period || 'Đang học')}
                  </span>
                  <span className="text-xs text-[#7c747f] font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                    Khối 11 • {activeTopic.duration} • {activeTopic.fieldTrip} • Điểm đến: {activeTopic.destination}
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#1e1926]">
                  {activeTopic.title}
                </h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed max-w-2xl">
                  {activeTopic.shortDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a 
                href="#chude-detail"
                className="px-6 py-3 rounded-full bg-[#704f8d] hover:bg-[#583975] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold gap-2 flex items-center justify-center transition-all shadow-sm group-hover:shadow-md cursor-pointer"
              >
                <span>Xem nội dung bài học</span>
                <ArrowRight className="w-4 h-4" />
              </a>
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
                  Mục Tiêu Về Phẩm Chất ({activeTopic.code})
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif]">
                {selectedTopicId === 'topic-11-02' ? (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Tự hào vẻ đẹp đô thị & sông nước:</strong> Yêu mến cảnh quan thiên nhiên, kiến trúc di sản và lối sống văn minh, thân thiện của người dân TP.HCM.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Văn hóa ứng xử & Trách nhiệm môi trường:</strong> Nâng cao ý thức giữ gìn vệ sinh nơi công cộng, bảo vệ cảnh quan di sản và quảng bá du lịch xanh.</span>
                    </li>
                  </>
                ) : selectedTopicId === 'topic-11-01' ? (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Tình yêu quê hương:</strong> Bồi đắp cảm xúc gắn bó ruột thịt với mảnh đất, con người Sài Gòn – Chợ Lớn – Gia Định qua từng thời kỳ lịch sử.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Lòng tự hào & Trách nhiệm:</strong> Nhận diện giá trị bản sắc địa phương, nâng cao ý thức chủ động giữ gìn di sản tinh thần, cổ vũ sáng tạo nghệ thuật trẻ.</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Lòng tự hào & Tình yêu quê hương:</strong> Bồi đắp cảm xúc gắn bó sâu sắc với lịch sử, con người và sự nghiệp phát triển của TP.HCM qua chuyên đề {activeTopic.title}.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Trách nhiệm công dân trẻ:</strong> Nâng cao ý thức chủ động học tập, rèn luyện phẩm chất kỷ cương, trung thực và xây dựng thành phố văn minh nghĩa tình.</span>
                    </li>
                  </>
                )}
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
                  Mục Tiêu Về Năng Lực ({activeTopic.code})
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif]">
                {selectedTopicId === 'topic-11-02' ? (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Khảo sát & Phân tích điểm đến:</strong> Năng lực định vị các loại hình du lịch tiêu biểu (buýt sông, di sản Chợ Lớn, du lịch sinh thái Cần Giờ, du lịch MICE).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Sáng tạo & Truyền thông du lịch:</strong> Kỹ năng xây dựng cẩm nang số, quay clip ngắn hoặc thuyết minh giới thiệu nét độc đáo của TP.HCM.</span>
                    </li>
                  </>
                ) : selectedTopicId === 'topic-11-01' ? (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Cảm thụ văn chương:</strong> Năng lực phân tích, đánh giá ngôn ngữ bình dân Nam Bộ, phong cách tự sự Nam Kỳ trong các trích đoạn tác phẩm.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Tư duy không gian văn hóa:</strong> Kỹ năng định vị địa danh, so sánh liên hệ bối cảnh lịch sử xã hội và mạng lưới giao thương vùng trên bản đồ.</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Khảo sát & Nhận diện tri thức:</strong> {activeTopic.learningGoal}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                      <span><strong>Kỹ năng thực nghiệm & Ứng dụng:</strong> Thu thập thông tin thực tế tại {activeTopic.destination}, giải quyết vấn đề và phát triển tư duy phản biện.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#eee4f7] text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#4b444e] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#704f8d]" />
              <span>Tích hợp công cụ phân tích không gian số & tự học tương tác</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NỘI DUNG BÀI HỌC THEO CHỦ ĐỀ ĐƯỢC CHỌN (KHỐI 11) */}
      {selectedTopicId === 'topic-11-02' ? (
        <Grade11Topic2Content
          onAddPoints={onAddPoints}
          onSaveNote={onSaveNote}
          onShowToast={onShowToast}
          userEmail={userEmail}
          isCompleted={isCompleted}
          onToggleCompleted={handleToggleCompleted}
          onDownloadSheet={handleDownloadSheet}
        />
      ) : selectedTopicId === 'topic-11-01' ? (
        <section id="chude-detail" className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-14 space-y-8 scroll-mt-24">
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
              className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeLessonTab === 1
                  ? 'bg-[#704f8d] text-white shadow-sm'
                  : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-[#ffd166]" />
              <span>1. Khám phá địa điểm (Song ngữ Anh - Việt)</span>
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

          {/* TAB 1: CẨM NANG KHÁM PHÁ ĐỊA ĐIỂM (BẢN SONG NGỮ ANH - VIỆT) */}
          {activeLessonTab === 1 && (
            <div className="animate-in fade-in duration-300">
              <BilingualHandbookViewer
                onAddPoints={onAddPoints}
                onShowToast={onShowToast}
              />
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

              {/* Lưu ý văn hóa & không gian thực địa */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#fff8eb] border border-[#f0e49c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#fea619] text-[#201c00] flex items-center justify-center shrink-0 shadow-sm font-bold text-sm">
                    <Compass className="w-5 h-5 text-[#201c00]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#915800] block font-['Plus_Jakarta_Sans',sans-serif]">
                      Không gian ký ức văn học đô thị
                    </span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#1e1926]">
                      Không gian văn hóa sông nước và bản sắc thị dân phương Nam
                    </h4>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] mt-0.5">
                      Sự đan xen giữa kênh rạch tự nhiên và phố chợ sầm uất đã hình thành nên nét phóng khoáng, nghĩa tình đặc trưng của con người và văn chương thành phố.
                    </p>
                  </div>
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
      ) : (
        <TopicLessonGenericContent
          topic={activeTopic}
          onAddPoints={onAddPoints}
          onSaveNote={onSaveNote}
          onShowToast={onShowToast}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};
