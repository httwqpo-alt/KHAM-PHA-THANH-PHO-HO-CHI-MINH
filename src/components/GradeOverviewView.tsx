import React from 'react';
import { BookOpen, Compass, Award, ArrowRight, CheckCircle2, Star, Calendar } from 'lucide-react';

interface GradeOverviewViewProps {
  grade: 'khoi-10' | 'khoi-12';
  onNavigateToGrade11: () => void;
  onShowToast: (title: string, message: string) => void;
}

export const GradeOverviewView: React.FC<GradeOverviewViewProps> = ({
  grade,
  onNavigateToGrade11,
  onShowToast
}) => {
  const isGrade10 = grade === 'khoi-10';

  const title = isGrade10 
    ? "CHƯƠNG TRÌNH GIÁO DỤC ĐỊA PHƯƠNG - KHỐI 10" 
    : "CHƯƠNG TRÌNH GIÁO DỤC ĐỊA PHƯƠNG - KHỐI 12";

  const desc = isGrade10
    ? "Khám phá cội nguồn địa lý, tự nhiên, khảo cổ học tiền sơ sử, các tầng văn hóa dân gian và quá trình mở cõi lập làng đất Sài Gòn – Gia Định."
    : "Tổng quan các ngành kinh tế tri thức, đô thị thông minh, ngoại giao văn hóa quốc tế và định hướng nghề nghiệp tương lai tại trung tâm kinh tế TP.HCM.";

  const topics = isGrade10 ? [
    {
      id: 1,
      title: "Chủ đề 1: Địa hình, sông ngòi & Hệ sinh thái Cần Giờ",
      desc: "Nghiên cứu địa mạo phương Nam, vai trò lá phổi xanh Khu Dự trữ Sinh quyển Rừng Sác Cần Giờ đối với sự phát triển bền vững của TP.HCM.",
      status: "Sắp phát hành bản số hóa 3D"
    },
    {
      id: 2,
      title: "Chủ đề 2: Di chỉ khảo cổ Tiền sử Óc Eo & Giồng Cá Vồ",
      desc: "Khai quật tầng văn hóa cổ xưa, tục táng mộ chum, chế tác trang sức thủy tinh và gốm cổ hơn 2.000 năm của cư dân ven biển Sài Gòn.",
      status: "Sắp phát hành"
    },
    {
      id: 3,
      title: "Chủ đề 3: Tín ngưỡng dân gian & Lễ hội Nghinh Ông",
      desc: "Tìm hiểu tín ngưỡng thờ cá Ông, văn hóa biển đảo Cần Giờ, phong tục cúng đình thần Nam Bộ và tính cố kết cộng đồng cư dân sông nước.",
      status: "Sắp phát hành"
    },
    {
      id: 4,
      title: "Chủ đề 4: Bước chân mở cõi của Thống suất Nguyễn Hữu Cảnh (1698)",
      desc: "Thiết lập phủ Gia Định, định hình cương thổ hành chính Sài Gòn và tinh thần hòa huyết, bao dung giữa các cộng đồng lưu dân.",
      status: "Sắp phát hành"
    }
  ] : [
    {
      id: 1,
      title: "Chủ đề 1: Đô thị Sáng tạo & Trung tâm Tài chính Quốc tế TP.HCM",
      desc: "Tầm nhìn quy hoạch thành phố đến 2030 - 2045, công nghệ cao tại TP. Thủ Đức, chuyển đổi xanh và trung tâm tài chính ven sông Sài Gòn.",
      status: "Đang biên soạn chuẩn số"
    },
    {
      id: 2,
      title: "Chủ đề 2: Khởi nghiệp & Thị trường lao động chất lượng cao",
      desc: "Phân tích hệ sinh thái đổi mới sáng tạo, cơ hội nghề nghiệp đa lĩnh vực cho thế hệ Gen Z thành phố năng động.",
      status: "Đang cập nhật"
    },
    {
      id: 3,
      title: "Chủ đề 3: Công dân toàn cầu & Bản sắc văn hóa bản địa",
      desc: "Hòa nhập không hòa tan: Bảo tồn bản sắc phương Nam trong bối cảnh giao thoa văn hóa quốc tế và các hiệp định thương mại.",
      status: "Đang cập nhật"
    },
    {
      id: 4,
      title: "Chủ đề 4: Dự án hành động vì thành phố thông minh văn minh",
      desc: "Dự án cộng đồng cuối cấp THPT: Đề xuất giải pháp giao thông xanh, giảm ngập úng và số hóa di sản học đường.",
      status: "Dự án tốt nghiệp"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
      <div className="bg-[#f9f0ff] p-8 rounded-3xl border border-[#eee4f7] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="px-3.5 py-1.5 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {isGrade10 ? 'Cấp Độ Cơ Sở Lớp 10' : 'Cấp Độ Hoàn Thiện Lớp 12'}
          </span>
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#704f8d]">
            {title}
          </h1>
          <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e9dff2] shadow-sm text-center w-full md:w-auto space-y-2 shrink-0">
          <p className="text-xs text-[#7c747f] font-semibold">Đang sẵn sàng tương tác đầy đủ:</p>
          <button
            onClick={onNavigateToGrade11}
            className="w-full px-5 py-2.5 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <span>Trải nghiệm Khối 11 (Có bài học số)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thematic topics */}
      <div className="space-y-4">
        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl text-[#1e1926]">
          Khung Chủ Đề Bài Học {isGrade10 ? 'Lớp 10' : 'Lớp 12'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map(t => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-[#e9dff2] shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-[#f9f0ff] text-[#704f8d] font-bold text-xs flex items-center justify-center">
                    0{t.id}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f9f0ff] text-[#704f8d] border border-[#eee4f7]">
                    {t.status}
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926]">
                  {t.title}
                </h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs text-[#4b444e] leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#eee4f7] flex items-center justify-between">
                <button
                  onClick={() => onShowToast("Đã lưu chuyên đề", `Bạn đã đăng ký nhận thông báo khi ${t.title} ra mắt.`)}
                  className="text-xs text-[#704f8d] font-bold hover:underline cursor-pointer"
                >
                  Đăng ký nhận giáo trình sớm
                </button>
                <Compass className="w-4 h-4 text-[#deb7fe]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
