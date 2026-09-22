import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Download, 
  Star, 
  MapPin,
  Play,
  ExternalLink,
  Compass,
  Ship,
  Sparkles,
  Camera,
  Languages,
  Utensils
} from 'lucide-react';
import { BilingualHandbookViewer } from './BilingualHandbookViewer';
import { BilingualCuisineHandbookViewer } from './BilingualCuisineHandbookViewer';

interface Grade11Topic2ContentProps {
  onAddPoints: (points: number) => void;
  onSaveNote?: (topic: string, content: string, email: string) => void;
  onShowToast?: (title: string, message: string) => void;
  userEmail?: string;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  onDownloadSheet: () => void;
}

export const Grade11Topic2Content: React.FC<Grade11Topic2ContentProps> = ({
  onAddPoints,
  onShowToast,
  isCompleted,
  onToggleCompleted,
  onDownloadSheet
}) => {
  // Lesson Tabs (1: Overview & Types, 2: Field Video Lesson, 3: Bilingual Handbook)
  const [activeLessonTab, setActiveLessonTab] = useState<number>(1);

  return (
    <section id="chude-detail" className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-14 space-y-8 scroll-mt-24">
      {/* Hero Header Chủ Đề 2 */}
      <div className="bg-[#eee4f7]/70 border border-[#e9dff2] rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#704f8d] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold shadow-sm">
              <Star className="w-3.5 h-3.5 text-[#fea619] fill-[#fea619]" />
              BÀI HỌC TRỌNG TÂM LỚP 11 • CHUYÊN ĐỀ 02
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#704f8d] tracking-tight leading-tight">
              CHỦ ĐỀ 2: PHÁT TRIỂN DU LỊCH Ở THÀNH PHỐ HỒ CHÍ MINH
            </h2>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed">
              Khám phá tiềm năng kinh tế du lịch, các mô hình du lịch đô thị đặc sắc (đường sông Waterbus, di sản lịch sử, ẩm thực văn hóa Chợ Lớn) và sáng kiến quảng bá điểm đến bền vững.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={onToggleCompleted}
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
              onClick={onDownloadSheet}
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
            <div className="flex items-center gap-2 text-[#704f8d] mb-1">
              <Ship className="w-4 h-4" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">Du Lịch Đường Sông</span>
            </div>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
              Tuyến Saigon Waterbus và du thuyền đêm mở ra góc nhìn đô thị hiện đại, thơ mộng từ dòng sông Sài Gòn lịch sử.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#eee4f7]">
            <div className="flex items-center gap-2 text-[#915800] mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">Không Gian Chợ Lớn</span>
            </div>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
              Di sản kiến trúc hội quán, chùa cổ, phố đông y Hải Thượng Lãn Ông và nét đẹp ẩm thực giao thoa Việt - Hoa độc đáo.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#eee4f7]">
            <div className="flex items-center gap-2 text-[#685f26] mb-1">
              <Compass className="w-4 h-4" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">Kinh Tế Ban Đêm & MICE</span>
            </div>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
              Phố đi bộ Nguyễn Huệ, chợ đêm Bến Thành và trung tâm hội nghị quốc tế khẳng định vị thế đô thị du lịch năng động.
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Tiềm năng & Loại hình du lịch</span>
          </button>
          <button
            onClick={() => setActiveLessonTab(2)}
            className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLessonTab === 2
                ? 'bg-[#704f8d] text-white shadow-sm'
                : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>2. Video thực địa: Khám phá Chợ Lớn</span>
          </button>
          <button
            onClick={() => setActiveLessonTab(3)}
            className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLessonTab === 3
                ? 'bg-[#704f8d] text-white shadow-sm'
                : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-[#ffd166]" />
            <span>3. Cẩm nang Địa điểm (Bản Song ngữ Anh - Việt)</span>
          </button>
          <button
            onClick={() => setActiveLessonTab(4)}
            className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLessonTab === 4
                ? 'bg-[#8c2509] text-white shadow-sm'
                : 'bg-[#fff4d6] text-[#781605] hover:bg-[#fde68a] border border-[#d99b26]/40'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-[#e08307]" />
            <span>4. Cẩm nang Ẩm thực Hồ Chí Minh (Bản Song ngữ Anh - Việt)</span>
          </button>
        </div>

        {/* TAB 1: TIỀM NĂNG & CÁC LOẠI HÌNH DU LỊCH ĐẶC TRƯNG */}
        {activeLessonTab === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {/* Left: 4 Specialized Tourism Types */}
            <div className="bg-white p-6 rounded-3xl border border-[#e9dff2] shadow-sm space-y-4">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#704f8d] flex items-center gap-2">
                <Ship className="w-5 h-5 text-[#704f8d]" />
                Các Sản Phẩm Du Lịch Trọng Điểm TP.HCM
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#704f8d] text-white font-bold text-xs flex items-center justify-center">1</span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                      Du lịch Di sản - Văn hóa - Lịch sử
                    </h4>
                  </div>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed pl-8">
                    Trục kiến trúc thời kỳ thuộc địa và giải phóng: Bến Nhà Rồng, Dinh Độc Lập, Nhà hát Thành phố, Bưu điện Trung tâm, Bảo tàng Chứng tích Chiến tranh và hệ thống di tích cấp Quốc gia.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#704f8d] text-white font-bold text-xs flex items-center justify-center">2</span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                      Du lịch Đường Thủy & Cảnh Quan Sông Nước
                    </h4>
                  </div>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed pl-8">
                    Tuyến buýt đường sông Saigon Waterbus (Bạch Đằng – Bình An – Thanh Đa), du thuyền ăn tối ngắm hoàng hôn, cano du lịch ven sông kết nối Củ Chi và Cần Giờ.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#704f8d] text-white font-bold text-xs flex items-center justify-center">3</span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                      Du lịch Văn Hóa Cộng Đồng & Ẩm Thực Chợ Lớn
                    </h4>
                  </div>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed pl-8">
                    Không gian di sản người Hoa Quận 5 - Quận 6: Hội quán Ôn Lăng, Nghĩa An, Chùa Bà Thiên Hậu, phố thuốc bắc Hải Thượng Lãn Ông, chợ Bình Tây và ẩm thực Dimsum, hủ tiếu truyền thống.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#704f8d] text-white font-bold text-xs flex items-center justify-center">4</span>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
                      Du lịch Sinh Thái Vùng Ngoại Thành & Kinh Tế Đêm
                    </h4>
                  </div>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed pl-8">
                    Khu dự trữ sinh quyển thế giới Rừng ngập mặn Cần Giờ, Địa đạo Củ Chi cùng chuỗi tuyến phố đi bộ đêm Nguyễn Huệ, Bùi Viện phục vụ khách trong và ngoài nước.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Potentials & Strategy */}
            <div className="space-y-6">
              <div className="bg-[#f9f0ff] p-6 rounded-3xl border border-[#eee4f7] shadow-sm space-y-4">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#fea619]" />
                  Lợi Thế Cạnh Tranh Của Du Lịch TP.HCM
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-[#4b444e] font-['Be_Vietnam_Pro',sans-serif]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                    <span><strong>Cửa ngõ hàng không & đường bộ:</strong> Sân bay Tân Sơn Nhất và hệ thống cao tốc kết nối toàn vùng Đông Nam Bộ và Đồng bằng sông Cửu Long.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                    <span><strong>Đô thị đa bản sắc:</strong> Điểm gặp gỡ giữa văn hóa sông nước Nam Bộ, di sản kiến trúc phương Tây và phong vị thương hồ người Hoa Chợ Lớn.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#704f8d] shrink-0 mt-0.5" />
                    <span><strong>Con người hào sảng & mến khách:</strong> Nếp sống nghĩa tình, cởi mở, dịch vụ tiện lợi và năng động suốt 24/7.</span>
                  </li>
                </ul>
              </div>

              {/* Callout box guiding to video tab */}
              <div className="p-5 rounded-3xl bg-[#fff8eb] border border-[#f0e49c] space-y-3">
                <div className="flex items-center gap-2 text-[#915800]">
                  <Camera className="w-5 h-5" />
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">
                    Tư Liệu Thực Địa: Khám Phá Chợ Lớn
                  </h4>
                </div>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                  Để hiểu rõ hơn về vẻ đẹp cổ kính và nhịp sống độc đáo của khu di sản Chợ Lớn, em hãy chuyển sang tab video thực địa để theo dõi phóng sự ghi hình trực tiếp.
                </p>
                <button
                  onClick={() => setActiveLessonTab(2)}
                  className="px-4 py-2 rounded-full bg-[#704f8d] hover:bg-[#583975] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Xem video bài học Chợ Lớn</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BÀI HỌC VIDEO THỰC ĐỊA (KHÁM PHÁ CHỢ LỚN) */}
        {activeLessonTab === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header Video Title & Overview */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e9dff2] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#915800] bg-[#fff8eb] px-3 py-1 rounded-full border border-[#f0e49c] inline-block mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                    Tư liệu thực địa video đa phương tiện
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-lg sm:text-2xl text-[#1e1926]">
                    Khám phá địa điểm và những nét độc đáo ở Chợ lớn - Sài Gòn
                  </h3>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] mt-1">
                    Hành trình thực tế khám phá nét kiến trúc hội quán người Hoa, không gian phố cổ đông y và nhịp sống giao thương đặc trưng của vùng đất Chợ Lớn xưa và nay.
                  </p>
                </div>

                <a
                  href="https://youtu.be/FpREU6ScV5U?si=HYVi3pXdOQUMv385"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#fea619] hover:bg-[#e09112] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
                  title="Mở video trên YouTube"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Xem trực tiếp trên YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Video Player */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#eee4f7] shadow-sm bg-black relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/FpREU6ScV5U"
                  title="Khám phá địa điểm và những nét độc đáo ở Chợ lớn - Sài Gòn"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Field Observation Notes for Students */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#eee4f7]">
                <div className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] space-y-1.5">
                  <h5 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#704f8d] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    1. Hội quán & Chùa cổ
                  </h5>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                    Quan sát nghệ thuật chạm khắc gỗ, phù điêu gốm Cây Mai rực rỡ trên mái chùa Bà Thiên Hậu và Hội quán Nghĩa An.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] space-y-1.5">
                  <h5 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#704f8d] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    2. Phố cổ thuốc bắc
                  </h5>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                    Tuyến phố Hải Thượng Lãn Ông với hương thơm dược thảo đặc trưng và những căn nhà phố thương mại kiểu Pháp - Hoa giao hòa.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] space-y-1.5">
                  <h5 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#704f8d] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    3. Chợ Bình Tây sầm uất
                  </h5>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                    Đầu mối bán buôn lớn nhất phương Nam xây dựng từ 1928, mái ngói âm dương uốn lượn và tháp đồng hồ bát giác kiêu hãnh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BẢN SONG NGỮ ANH - VIỆT (ĐỊA ĐIỂM & DI TÍCH) */}
        {activeLessonTab === 3 && (
          <div className="animate-in fade-in duration-300">
            <BilingualHandbookViewer
              onAddPoints={onAddPoints}
              onShowToast={onShowToast}
            />
          </div>
        )}

        {/* TAB 4: BẢN SONG NGỮ ANH - VIỆT (ẨM THỰC HỒ CHÍ MINH) */}
        {activeLessonTab === 4 && (
          <div className="animate-in fade-in duration-300">
            <BilingualCuisineHandbookViewer
              onAddPoints={onAddPoints}
              onShowToast={onShowToast}
            />
          </div>
        )}
      </div>
    </section>
  );
};
