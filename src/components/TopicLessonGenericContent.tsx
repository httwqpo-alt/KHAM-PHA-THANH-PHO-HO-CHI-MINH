import React, { useState } from 'react';
import { TopicItem } from '../types';
import { TOPIC_LESSON_DETAILS } from '../data/topicDetailsData';
import { 
  BookOpen, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Award, 
  FileText, 
  Lightbulb, 
  HelpCircle, 
  PenLine, 
  Save, 
  Download, 
  ExternalLink,
  ChevronRight,
  Compass,
  Star,
  Sparkles
} from 'lucide-react';

interface TopicLessonGenericContentProps {
  topic: TopicItem;
  onAddPoints: (points: number) => void;
  onSaveNote: (topic: string, content: string, email: string) => void;
  onShowToast: (title: string, message: string) => void;
  userEmail: string;
}

export const TopicLessonGenericContent: React.FC<TopicLessonGenericContentProps> = ({
  topic,
  onAddPoints,
  onSaveNote,
  onShowToast,
  userEmail
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'fieldtrip' | 'quiz' | 'notes'>('content');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [noteContent, setNoteContent] = useState<string>('');

  const detailData = TOPIC_LESSON_DETAILS[topic.id] || {
    id: topic.id,
    modules: [
      {
        title: `1. Tổng quan & Khái niệm cốt lõi: ${topic.title}`,
        subtitle: `Ý nghĩa lý luận và thực tiễn trong chương trình GDĐP TP.HCM`,
        content: [
          topic.shortDesc,
          topic.learningGoal,
          `Tìm hiểu bối cảnh lịch sử, tự nhiên và xã hội đặc thù của TP.HCM gắn liền với chủ đề ${topic.title}.`,
          `Phát huy vai trò chủ động của học sinh trong việc quan sát, đối chiếu thực tiễn đời sống đô thị và đề xuất sáng kiến cộng đồng.`
        ],
        highlight: `Chủ đề trọng tâm giúp bồi dưỡng lòng tự hào công dân và ý thức trách nhiệm xây dựng TP.HCM văn minh, hiện đại, nghĩa tình.`
      },
      {
        title: `2. Thực tiễn ứng dụng và hành động của thanh niên TP.HCM`,
        subtitle: `Từ giảng đường đến các hoạt động thực tế tại thành phố`,
        content: [
          `Kết nối kiến thức chuyên đề với các vấn đề nóng của đô thị: bảo tồn di sản, phát triển kinh tế xanh, chuyển đổi số và nâng cao chất lượng cuộc sống cư dân.`,
          `Rèn luyện kỹ năng làm việc nhóm, thu thập tư liệu thực địa, phỏng vấn nhân chứng và thuyết trình dự án học tập.`,
          `Lan tỏa tinh thần đổi mới sáng tạo, nghĩa hiệp và bao dung - những giá trị văn hóa cốt lõi của người dân đất phương Nam.`
        ]
      }
    ],
    fieldTripGuide: {
      name: topic.destination,
      address: `Địa bàn TP. Hồ Chí Minh`,
      significance: `Không gian thực nghiệm và trải nghiệm thực tế tiêu biểu cho chuyên đề ${topic.title}.`,
      studentTasks: [
        `Khảo sát hiện trường và ghi nhận các dấu ấn thực tế gắn với chủ đề bài học.`,
        `Thực hiện phỏng vấn ngắn hoặc thu thập thông tin từ hướng dẫn viên/chuyên gia tại điểm đến.`,
        `Chụp ảnh tư liệu minh họa và tổng hợp thành báo cáo thu hoạch nhóm.`
      ],
      tips: `Chuẩn bị sổ tay ghi chép, điện thoại/máy ảnh để chụp tư liệu và tuân thủ nội quy tham quan thực địa.`
    },
    quiz: [
      {
        question: `Mục tiêu cơ bản nhất khi tìm hiểu chuyên đề "${topic.title}" là gì?`,
        options: [
          `Chỉ để ghi nhớ lý thuyết mà không cần liên hệ thực tiễn`,
          `Nắm vững tri thức địa phương, rèn luyện kỹ năng thực địa và bồi đắp trách nhiệm công dân đối với TP.HCM`,
          `Sao chép lại toàn bộ tài liệu có sẵn`,
          `Học đối phó để vượt qua kỳ kiểm tra`
        ],
        correctIndex: 1,
        explanation: `Chương trình Giáo dục địa phương hướng tới hình thành năng lực thực tiễn và phẩm chất yêu quê hương sâu sắc cho học sinh.`
      },
      {
        question: `Điểm đến thực tế được gợi ý cho chuyên đề này tại TP.HCM là địa điểm nào?`,
        options: [
          topic.destination,
          `Một địa điểm ngoài lãnh thổ Việt Nam`,
          `Không có điểm đến thực tế nào`,
          `Chỉ học trong phòng thí nghiệm kín`
        ],
        correctIndex: 0,
        explanation: `Điểm đến gắn liền với bài học là: ${topic.destination}.`
      }
    ],
    reflectionPrompt: `Sau khi học xong bài học "${topic.title}", em hãy ghi lại 3 điều tâm đắc nhất và 1 hành động cụ thể em sẽ thực hiện để lan tỏa giá trị của chủ đề này đến bạn bè xung quanh.`
  };

  const handleToggleComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      onAddPoints(30);
      onShowToast('Chúc mừng!', `Bạn đã hoàn thành bài học ${topic.title} (+30 điểm di sản)`);
    } else {
      setIsCompleted(false);
      onShowToast('Cập nhật', `Đã chuyển bài học sang trạng thái đang học`);
    }
  };

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length < detailData.quiz.length) {
      onShowToast('Chưa hoàn thành', 'Vui lòng chọn câu trả lời cho tất cả các câu hỏi trắc nghiệm!');
      return;
    }
    setSubmittedQuiz(true);
    let correctCount = 0;
    detailData.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const earnedPoints = correctCount * 20;
    if (earnedPoints > 0) {
      onAddPoints(earnedPoints);
    }
    onShowToast(
      'Kết quả kiểm tra',
      `Bạn trả lời đúng ${correctCount}/${detailData.quiz.length} câu hỏi (+${earnedPoints} điểm di sản)!`
    );
  };

  const handleSaveStudentNote = () => {
    if (!noteContent.trim()) {
      onShowToast('Thông báo', 'Vui lòng nhập nội dung thu hoạch trước khi lưu!');
      return;
    }
    onSaveNote(topic.title, noteContent, userEmail);
    onAddPoints(20);
    onShowToast('Thành công', 'Nội dung đã được lưu vào Sổ tay văn hóa của bạn (+20 điểm)!');
  };

  const handleDownloadSheet = () => {
    const text = `PHIẾU HỌC TẬP CHUYÊN ĐỀ GDĐP TP.HCM\nKhối ${topic.grade} - ${topic.code}: ${topic.title}\nThời lượng: ${topic.duration} • Điểm đến: ${topic.destination}\n\n1. MỤC TIÊU CẦN ĐẠT:\n${topic.learningGoal}\n\n2. TÓM TẮT NỘI DUNG:\n${topic.shortDesc}\n\n3. GHI CHÉP THU HOẠCH:\n${noteContent || '(Học sinh tự điền nội dung thu hoạch sau chuyến đi)'}\n\nThời gian tải: ${new Date().toLocaleDateString('vi-VN')}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Phieu-Hoc-Tap-${topic.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Đã tải phiếu học tập', `Phiếu học tập "${topic.title}" đã được lưu về máy.`);
  };

  return (
    <section id="chude-detail" className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-10 space-y-8 scroll-mt-24">
      {/* Lesson Header Banner */}
      <div className="bg-[#eee4f7]/80 border border-[#deb7fe] rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#704f8d] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold shadow-xs">
                Khối {topic.grade}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold">
                {topic.code}
              </span>
              <span className="text-xs text-[#704f8d] font-semibold flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-[#eee4f7]">
                <Clock className="w-3.5 h-3.5" />
                {topic.duration}
              </span>
              <span className="text-xs text-[#4b444e] font-semibold flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-[#eee4f7]">
                <Compass className="w-3.5 h-3.5 text-[#fea619]" />
                {topic.fieldTrip}
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#1e1926] uppercase tracking-tight">
              {topic.title}
            </h2>

            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed">
              {topic.shortDesc}
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-[#704f8d]">
              <MapPin className="w-4 h-4 shrink-0 text-[#704f8d]" />
              <span><strong>Không gian thực tế:</strong> {topic.destination}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 shrink-0">
            <button
              onClick={handleToggleComplete}
              className={`px-5 py-2.5 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-[#704f8d] text-white hover:bg-[#583975]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Đã hoàn thành bài học' : 'Đánh dấu hoàn thành (+30đ)'}</span>
            </button>

            <button
              onClick={handleDownloadSheet}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#f9f0ff] text-[#704f8d] border border-[#deb7fe] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải phiếu học tập</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Interactive Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#eee4f7] pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'content'
              ? 'bg-[#704f8d] text-white shadow-sm'
              : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Nội dung cốt lõi</span>
        </button>

        <button
          onClick={() => setActiveTab('fieldtrip')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'fieldtrip'
              ? 'bg-[#704f8d] text-white shadow-sm'
              : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>2. Tư liệu thực địa</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'quiz'
              ? 'bg-[#704f8d] text-white shadow-sm'
              : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>3. Trắc nghiệm nhanh</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'notes'
              ? 'bg-[#704f8d] text-white shadow-sm'
              : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
          }`}
        >
          <PenLine className="w-4 h-4" />
          <span>4. Sổ tay thu hoạch</span>
        </button>
      </div>

      {/* Tab 1: Nội dung cốt lõi */}
      {activeTab === 'content' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailData.modules.map((mod, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e9dff2] shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#f0e49c] text-[#201c00] flex items-center justify-center font-bold text-xs shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#1e1926]">
                      {mod.title}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-[#704f8d]">
                    {mod.subtitle}
                  </p>

                  <div className="space-y-2.5 text-xs sm:text-sm text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif] leading-relaxed">
                    {mod.content.map((p, pIdx) => (
                      <p key={pIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#704f8d] shrink-0 mt-2"></span>
                        <span>{p}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {mod.highlight && (
                  <div className="p-3.5 bg-[#f9f0ff] rounded-2xl border border-[#eee4f7] text-xs text-[#704f8d] font-semibold flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-[#fea619] mt-0.5" />
                    <span>{mod.highlight}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Goal Summary Callout */}
          <div className="bg-[#f0e49c]/40 border border-[#f0e49c] rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#f0e49c] text-[#201c00] flex items-center justify-center font-bold shrink-0">
                <Award className="w-5 h-5 text-[#201c00]" />
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#1e1926]">
                  Yêu cầu cần đạt sau bài học
                </h4>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e]">
                  {topic.learningGoal}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-5 py-2.5 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold shrink-0 cursor-pointer shadow-sm transition-all"
            >
              Làm bài kiểm tra nhanh
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Tư liệu thực địa */}
      {activeTab === 'fieldtrip' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e9dff2] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#eee4f7] pb-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#704f8d] uppercase tracking-wider block">
                  Điểm đến trải nghiệm thực tế
                </span>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl sm:text-2xl text-[#1e1926]">
                  {detailData.fieldTripGuide.name}
                </h3>
                <p className="text-xs text-[#7c747f] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#704f8d]" />
                  <span>{detailData.fieldTripGuide.address}</span>
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#f9f0ff] text-[#704f8d] border border-[#deb7fe] text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] self-start md:self-auto">
                {topic.fieldTrip}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                Ý nghĩa văn hóa & lịch sử:
              </h4>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed bg-[#fcf8ff] p-4 rounded-2xl border border-[#f3e8ff]">
                {detailData.fieldTripGuide.significance}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                Nhiệm vụ học tập gợi ý cho học sinh:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {detailData.fieldTripGuide.studentTasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] space-y-2 text-xs font-['Be_Vietnam_Pro',sans-serif]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#704f8d] text-white font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-[#4b444e]">{task}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fff8eb] border border-[#f0e49c] flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#fea619] shrink-0 mt-0.5" />
              <div className="text-xs text-[#201c00]">
                <strong className="block font-bold">Lưu ý khi thực địa:</strong>
                <p className="mt-0.5 text-[#4b444e]">{detailData.fieldTripGuide.tips}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Trắc nghiệm nhanh */}
      {activeTab === 'quiz' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e9dff2] shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eee4f7] pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#704f8d] uppercase tracking-wider block">
                Kiểm tra kiến thức nhanh
              </span>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg sm:text-xl text-[#1e1926]">
                Trắc Nghiệm Khám Phá: {topic.title}
              </h3>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f9f0ff] text-[#704f8d]">
              {detailData.quiz.length} Câu hỏi • +20đ mỗi câu đúng
            </span>
          </div>

          <div className="space-y-6">
            {detailData.quiz.map((q, qIdx) => {
              const selected = selectedAnswers[qIdx];
              return (
                <div key={qIdx} className="space-y-3 p-4 rounded-2xl bg-[#fcf8ff] border border-[#f3e8ff]">
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#1e1926]">
                    Câu {qIdx + 1}: {q.question}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selected === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let btnClass = "bg-white text-[#4b444e] hover:bg-[#eee4f7] border-[#e9dff2]";
                      if (submittedQuiz) {
                        if (isCorrect) {
                          btnClass = "bg-emerald-100 text-emerald-900 border-emerald-400 font-bold";
                        } else if (isChosen && !isCorrect) {
                          btnClass = "bg-rose-100 text-rose-900 border-rose-300";
                        }
                      } else if (isChosen) {
                        btnClass = "bg-[#704f8d] text-white border-[#704f8d] font-bold";
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(qIdx, oIdx)}
                          disabled={submittedQuiz}
                          className={`p-3 rounded-xl border text-left text-xs font-['Be_Vietnam_Pro',sans-serif] transition-all cursor-pointer ${btnClass}`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className="p-3 bg-white rounded-xl border border-[#eee4f7] text-xs text-[#704f8d] font-medium">
                      <strong>Giải thích:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#eee4f7] flex items-center justify-end gap-3">
            {!submittedQuiz ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Nộp bài kiểm tra
              </button>
            ) : (
              <button
                onClick={() => {
                  setSubmittedQuiz(false);
                  setSelectedAnswers({});
                }}
                className="px-6 py-2.5 rounded-full bg-[#f9f0ff] text-[#704f8d] hover:bg-[#eee4f7] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all cursor-pointer"
              >
                Làm lại bài kiểm tra
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Sổ tay thu hoạch */}
      {activeTab === 'notes' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e9dff2] shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eee4f7] pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#704f8d] uppercase tracking-wider block">
                Thu hoạch cá nhân & dự án
              </span>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg sm:text-xl text-[#1e1926]">
                Sổ Tay Thu Hoạch: {topic.title}
              </h3>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f0e49c] text-[#201c00]">
              Lưu vào Sổ tay văn hóa (+20đ)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] text-xs text-[#704f8d] space-y-1">
            <span className="font-bold block">Gợi ý suy ngẫm (Reflection Prompt):</span>
            <p className="text-[#4b444e]">{detailData.reflectionPrompt}</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1e1926] block font-['Plus_Jakarta_Sans',sans-serif]">
              Nội dung cảm nhận hoặc ý tưởng dự án của em:
            </label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={5}
              placeholder="Nhập cảm nhận sau bài học, những điều tâm đắc về vùng đất và con người TP.HCM, hoặc ý tưởng quảng bá di sản..."
              className="w-full p-4 rounded-2xl border border-[#e9dff2] focus:border-[#704f8d] focus:ring-2 focus:ring-[#deb7fe] outline-none text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] leading-relaxed resize-none bg-white"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#7c747f]">
              Đang ghi nhớ theo tài khoản: <strong>{userEmail}</strong>
            </span>
            <button
              onClick={handleSaveStudentNote}
              className="px-6 py-2.5 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu vào sổ tay (+20đ)</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
