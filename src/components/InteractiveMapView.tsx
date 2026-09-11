import React, { useState } from 'react';
import { REGIONAL_DATA, ASSETS } from '../data/mockData';
import { MapPin, Search, Layers, Compass, ExternalLink, Bookmark, CheckCircle2, Eye } from 'lucide-react';

interface InteractiveMapViewProps {
  onShowToast: (title: string, message: string) => void;
  onNavigateToTopic: (tab: 'khoi-11') => void;
}

interface HeritageSite {
  id: string;
  name: string;
  category: 'Kiến trúc' | 'Lịch sử' | 'Bảo tàng' | 'Làng nghề';
  district: string;
  address: string;
  era: string;
  desc: string;
  gradeRef: 'Khối 10' | 'Khối 11' | 'Khối 12';
  image: string;
}

const HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'site-1',
    name: 'Bạch Dinh (Villa Blanche) & Núi Lớn',
    category: 'Kiến trúc',
    district: 'Bà Rịa - Vũng Tàu',
    address: 'Số 4 Trần Phú, Phường 1, TP. Vũng Tàu',
    era: 'Cuối thế kỷ 19 (1898)',
    desc: 'Di tích lịch sử văn hóa cấp quốc gia, dinh thự phong cách châu Âu cuối thế kỷ 19 trên sườn Núi Lớn nhìn ra vịnh biển.',
    gradeRef: 'Khối 11',
    image: ASSETS.bachDinh
  },
  {
    id: 'site-2',
    name: 'Bưu Điện Trung Tâm Thành Phố',
    category: 'Kiến trúc',
    district: 'Quận 1, TP.HCM',
    address: 'Số 2 Công xã Paris, Phường Bến Nghé, Quận 1',
    era: 'Khánh thành 1891',
    desc: 'Kiến trúc kết hợp phong cách Gothic, Phục hưng và ảnh hưởng Pháp tinh tế, biểu tượng văn hóa đô thị Sài Gòn hơn 130 năm.',
    gradeRef: 'Khối 11',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'site-3',
    name: 'Nhà Thờ Giáo Xứ Tân Định & Nhà In Cổ',
    category: 'Lịch sử',
    district: 'Quận 3, TP.HCM',
    address: '289 Hai Bà Trưng, Phường 8, Quận 3',
    era: 'Thế kỷ 19',
    desc: 'Cái nôi xuất bản nhiều ấn phẩm chữ Quốc ngữ đầu tiên tại Sài Gòn, nơi học giả Trương Vĩnh Ký từng cộng tác truyền bá văn hóa.',
    gradeRef: 'Khối 11',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'site-4',
    name: 'Khu Phố Cổ Hải Thượng Lãn Ông & Hội Quán Chợ Lớn',
    category: 'Kiến trúc',
    district: 'Quận 5, TP.HCM',
    address: 'Trục đường Hải Thượng Lãn Ông, Phường 10, Quận 5',
    era: 'Thế kỷ 18 - 19',
    desc: 'Khu phố đông y cổ truyền lớn nhất phương Nam cùng hệ thống hội quán Nghĩa An, Tuệ Thành thể hiện giao lưu văn hóa Việt - Hoa.',
    gradeRef: 'Khối 11',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'site-5',
    name: 'Lò Gốm Cổ Đại Hưng & Vành Đai Sông Bé',
    category: 'Làng nghề',
    district: 'TP. Thủ Dầu Một, Bình Dương',
    address: 'Phường Tương Bình Hiệp, TP. Thủ Dầu Một',
    era: 'Hơn 150 năm',
    desc: 'Di tích làng nghề gốm sứ truyền thống với kỹ thuật nung bao lò củi cổ xưa, cung ứng đồ gốm da chu cho thương cảng Bến Nghé.',
    gradeRef: 'Khối 11',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'site-6',
    name: 'Khu Khảo Cổ Giồng Cá Vồ & Rừng Sác',
    category: 'Lịch sử',
    district: 'Huyện Cần Giờ, TP.HCM',
    address: 'Xã Long Hòa, Huyện Cần Giờ',
    era: 'Cách ngày nay 2.500 - 2.000 năm',
    desc: 'Di chỉ khảo cổ mộ chum văn hóa tiền Óc Eo, minh chứng cho sự cư trú lâu đời của cộng đồng cư dân cổ đại ven biển Sài Gòn.',
    gradeRef: 'Khối 10',
    image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1000&q=80'
  }
];

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  onShowToast,
  onNavigateToTopic
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');
  const [searchDistrict, setSearchDistrict] = useState<string>('');
  const [selectedSite, setSelectedSite] = useState<HeritageSite>(HERITAGE_SITES[0]);

  const categories = ['Tất cả', 'Kiến trúc', 'Lịch sử', 'Làng nghề'];

  const filteredSites = HERITAGE_SITES.filter(site => {
    const matchCategory = activeCategory === 'Tất cả' || site.category === activeCategory;
    const matchSearch = site.name.toLowerCase().includes(searchDistrict.toLowerCase()) ||
      site.district.toLowerCase().includes(searchDistrict.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0e49c] text-[#201c00] text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif]">
          <Compass className="w-3.5 h-3.5" />
          BẢN ĐỒ SỐ DI SẢN & VĂN HÓA ĐỊA PHƯƠNG
        </div>
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold text-[#704f8d]">
          Không Gian Văn Hóa Sài Gòn & Vùng Liên Kết
        </h1>
        <p className="font-['Be_Vietnam_Pro',sans-serif] text-xs sm:text-sm text-[#4b444e] max-w-3xl leading-relaxed">
          Định vị trực quan các di tích lịch sử, kiến trúc đô thị, làng nghề truyền thống gắn với chương trình Giáo dục Địa phương khối 10, 11, 12 TP.HCM.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#e9dff2] shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#704f8d] text-white'
                  : 'bg-[#f9f0ff] text-[#4b444e] hover:bg-[#eee4f7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7c747f]" />
          <input
            type="text"
            value={searchDistrict}
            onChange={(e) => setSearchDistrict(e.target.value)}
            placeholder="Tìm theo quận, huyện, tên di tích..."
            className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#f9f0ff] border border-[#eee4f7] text-xs font-['Be_Vietnam_Pro',sans-serif] text-[#1e1926] focus:outline-none focus:ring-2 focus:ring-[#704f8d]/30"
          />
        </div>
      </div>

      {/* Main Grid: Sites List (5 cols) + Detailed Map View & Site Focus (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sites List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-[#7c747f] font-['Plus_Jakarta_Sans',sans-serif]">
            Tìm thấy {filteredSites.length} điểm di tích & bài học thực địa:
          </span>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {filteredSites.map(site => {
              const isSelected = selectedSite.id === site.id;
              return (
                <div
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#f9f0ff] border-[#704f8d] shadow-sm ring-1 ring-[#704f8d]'
                      : 'bg-white border-[#e9dff2] hover:bg-[#fdfaff]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f0e49c] text-[#201c00]">
                        {site.category}
                      </span>
                      <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926] mt-1.5">
                        {site.name}
                      </h4>
                      <p className="text-xs text-[#7c747f] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#704f8d]" />
                        <span>{site.district}</span>
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#704f8d] bg-white px-2 py-0.5 rounded-full border border-[#eee4f7] shrink-0">
                      {site.gradeRef}
                    </span>
                  </div>
                  <p className="text-xs text-[#4b444e] mt-2 line-clamp-2 leading-relaxed">
                    {site.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Site Showcase & Map Canvas */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#e9dff2] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#704f8d] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#fea619]" />
              {selectedSite.district}
            </span>
            <span className="text-[11px] text-[#7c747f]">Niên đại: {selectedSite.era}</span>
          </div>

          <div className="w-full h-56 rounded-2xl overflow-hidden relative shadow-inner">
            <img
              src={selectedSite.image}
              alt={selectedSite.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 text-white">
              <span className="text-xs bg-[#704f8d] px-2 py-0.5 rounded-full font-bold">
                {selectedSite.gradeRef}
              </span>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg mt-1 drop-shadow-md">
                {selectedSite.name}
              </h3>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#704f8d]">Địa chỉ di tích:</p>
            <p className="text-xs text-[#1e1926] bg-[#f9f0ff] p-2.5 rounded-xl border border-[#eee4f7]">
              {selectedSite.address}
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#1e1926]">Nội dung học liệu số:</p>
            <p className="text-xs text-[#4b444e] leading-relaxed font-['Be_Vietnam_Pro',sans-serif]">
              {selectedSite.desc}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                onNavigateToTopic('khoi-11');
                onShowToast("Chuyển tới bài học", `Đang mở chuyên đề liên quan tới ${selectedSite.name}`);
              }}
              className="flex-1 py-2.5 px-4 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold transition-all text-center cursor-pointer shadow-sm"
            >
              Học bài liên quan ({selectedSite.gradeRef})
            </button>
            <button
              onClick={() => onShowToast("Đã lưu di tích", `Đã lưu ${selectedSite.name} vào lộ trình tham quan của em.`)}
              className="p-2.5 rounded-full bg-[#f9f0ff] text-[#704f8d] hover:bg-[#eee4f7] border border-[#eee4f7] cursor-pointer"
              title="Lưu di tích"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
