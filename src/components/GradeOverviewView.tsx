import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Compass, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  Lightbulb, 
  BookmarkCheck,
  Sparkles
} from 'lucide-react';
import { GRADE_10_TOPICS, GRADE_12_TOPICS } from '../data/mockData';
import { TopicItem } from '../types';
import { TopicLessonGenericContent } from './TopicLessonGenericContent';

interface GradeOverviewViewProps {
  grade: 'khoi-10' | 'khoi-12';
  activeTopicId?: string;
  onSelectTopicId?: (topicId: string) => void;
  onNavigateToGrade11: () => void;
  onAddPoints: (points: number) => void;
  onSaveNote: (topic: string, content: string, email: string) => void;
  onShowToast: (title: string, message: string) => void;
  userEmail: string;
}

export const GradeOverviewView: React.FC<GradeOverviewViewProps> = ({
  grade,
  activeTopicId,
  onSelectTopicId,
  onNavigateToGrade11,
  onAddPoints,
  onSaveNote,
  onShowToast,
  userEmail
}) => {
  const isGrade10 = grade === 'khoi-10';
  const currentTopics: TopicItem[] = isGrade10 ? GRADE_10_TOPICS : GRADE_12_TOPICS;

  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    activeTopicId || (isGrade10 ? 'topic-10-01' : 'topic-12-01')
  );

  useEffect(() => {
    if (activeTopicId) {
      setSelectedTopicId(activeTopicId);
    }
  }, [activeTopicId]);

  const activeTopic = currentTopics.find(t => t.id === selectedTopicId) || currentTopics[0];

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    if (onSelectTopicId) {
      onSelectTopicId(id);
    }
    const elem = document.getElementById('chude-detail');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const title = isGrade10 
    ? "CHƯƠNG TRÌNH GIÁO DỤC ĐỊA PHƯƠNG - KHỐI 10" 
    : "CHƯƠNG TRÌNH GIÁO DỤC ĐỊA PHƯƠNG - KHỐI 12";

  const desc = isGrade10
    ? "Khám phá 7 chủ đề cốt lõi: Thích ứng biến đổi khí hậu, đạo lí cội nguồn nghi lễ dân gian, di sản văn hóa, văn học dân gian, nhân vật nghệ thuật, môi trường và định hướng nghề nghiệp tại TP.HCM."
    : "Khám phá 8 chủ đề bứt phá: Thị trường lao động, hạ tầng giao thông kết nối vùng, thành phố đổi mới từ 1991, văn học sau 1975, nghệ thuật cổ truyền, mỹ thuật ứng dụng, lễ hội truyền thống và ý tưởng khởi nghiệp học sinh TP.HCM.";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in">
      {/* Grade Header Banner */}
      <div className="bg-[#f9f0ff] p-8 rounded-3xl border border-[#eee4f7] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1.5 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {isGrade10 ? 'Cấp Độ Cơ Sở Lớp 10 (7 Chủ Đề)' : 'Cấp Độ Hoàn Thiện Lớp 12 (8 Chủ Đề)'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white text-[#704f8d] border border-[#deb7fe] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold">
              Đang chọn: {activeTopic.code} - {activeTopic.title}
            </span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#704f8d] tracking-tight">
            {title}
          </h1>
          <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e9dff2] shadow-sm text-center w-full md:w-auto space-y-2 shrink-0">
          <p className="text-xs text-[#7c747f] font-semibold">Chuyển sang khối lớp khác:</p>
          <button
            onClick={onNavigateToGrade11}
            className="w-full px-5 py-2.5 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <span>Khám phá Khối 11 (Văn học & Du lịch)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Topic Switcher Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
            Danh mục chủ đề {isGrade10 ? 'Khối 10' : 'Khối 12'} (Bấm vào để học):
          </span>
          <span className="text-xs text-[#7c747f]">
            {currentTopics.length} chủ đề chuẩn GDPT 2018
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {currentTopics.map((t) => {
            const isCurrent = selectedTopicId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTopic(t.id)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  isCurrent
                    ? 'bg-[#704f8d] text-white shadow-sm ring-2 ring-[#deb7fe]'
                    : 'bg-white text-[#4b444e] hover:bg-[#f9f0ff] border border-[#eee4f7]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                  isCurrent ? 'bg-white text-[#704f8d]' : 'bg-[#eee4f7] text-[#704f8d]'
                }`}>
                  {t.code.replace(/\D/g, '')}
                </span>
                <span className="whitespace-nowrap">{t.title}</span>
                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-[#fea619]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Topic Focus Card */}
      <div className="w-full">
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#deb7fe] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group relative overflow-hidden">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f0e49c] text-[#201c00] flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-lg sm:text-xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              {activeTopic.code.replace(/\D/g, '') || '01'}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#f9f0ff] text-[#704f8d] font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold">
                  {activeTopic.period || 'Học kỳ I'}
                </span>
                <span className="text-xs text-[#7c747f] font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                  Khối {activeTopic.grade} • {activeTopic.duration} • {activeTopic.fieldTrip}
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

      {/* 2 Goal Cards: Phẩm Chất & Năng Lực cho chủ đề được chọn */}
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
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                <span><strong>Lòng tự hào & Tình yêu quê hương:</strong> Bồi đắp cảm xúc gắn bó, tự hào về vùng đất, lịch sử và con người TP.HCM qua chuyên đề {activeTopic.title}.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                <span><strong>Trách nhiệm công dân trẻ:</strong> Nâng cao ý thức chủ động giữ gìn giá trị truyền thống, bảo vệ môi trường và tham gia xây dựng đô thị văn minh nghĩa tình.</span>
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
                Mục Tiêu Về Năng Lực ({activeTopic.code})
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                <span><strong>Khảo sát & Nhận diện tri thức:</strong> {activeTopic.learningGoal}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                <span><strong>Kỹ năng thực nghiệm & Ứng dụng:</strong> Thu thập thông tin thực tế tại {activeTopic.destination}, phát triển tư duy phản biện và sáng tạo giải pháp.</span>
              </li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-[#eee4f7] text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-[#4b444e] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#704f8d]" />
            <span>Năng lực đặc thù môn học & Định hướng nghề nghiệp tương lai</span>
          </div>
        </div>
      </div>

      {/* Interactive Lesson Detail for Selected Topic */}
      <TopicLessonGenericContent
        topic={activeTopic}
        onAddPoints={onAddPoints}
        onSaveNote={onSaveNote}
        onShowToast={onShowToast}
        userEmail={userEmail}
      />

      {/* All Topics Grid */}
      <div className="space-y-4 pt-6 border-t border-[#eee4f7]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl text-[#1e1926]">
              {isGrade10 ? 'Toàn bộ 7 Chủ Đề Bài Học Lớp 10' : 'Toàn bộ 8 Chủ Đề Bài Học Lớp 12'}
            </h2>
            <p className="text-xs text-[#7c747f]">Bấm vào thẻ bất kỳ để đổi chủ đề học tập</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0e49c] text-[#201c00]">
            Chuẩn GDPT 2018
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTopics.map((t) => {
            const isSelected = selectedTopicId === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleSelectTopic(t.id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#fcf8ff] border-[#704f8d] ring-2 ring-[#deb7fe] shadow-md'
                    : 'bg-white border-[#e9dff2] hover:border-[#deb7fe] hover:shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                      isSelected ? 'bg-[#704f8d] text-white' : 'bg-[#f9f0ff] text-[#704f8d]'
                    }`}>
                      {t.code}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f9f0ff] text-[#704f8d] border border-[#eee4f7]">
                      {t.period}
                    </span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926] leading-snug">
                    {t.title}
                  </h3>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                    {t.shortDesc}
                  </p>

                  {/* Learning Goal */}
                  <div className="bg-[#fcf8ff] p-3 rounded-2xl border border-[#f3e8ff] text-xs font-['Be_Vietnam_Pro',sans-serif] space-y-1">
                    <span className="font-bold block text-[#704f8d]">Mục tiêu cần đạt:</span>
                    <p className="text-[#4b444e]">{t.learningGoal}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#eee4f7] flex items-center justify-between text-xs text-[#7c747f]">
                  <span className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-[#704f8d] shrink-0" />
                    <span className="truncate">{t.destination}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTopic(t.id);
                    }}
                    className={`px-3 py-1.5 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-[#704f8d] text-white'
                        : 'bg-[#f0e49c] text-[#201c00] hover:bg-[#ebd978]'
                    }`}
                  >
                    <span>{isSelected ? 'Đang học bài này' : 'Học chủ đề này'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
