import React, { useState, useEffect, useRef } from 'react';
import { Upload, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';

interface RegionalMapVectorProps {
  selectedRegionId: number;
  onSelectRegion: (id: number) => void;
  activeRegionFilter: string;
}

export const RegionalMapVector: React.FC<RegionalMapVectorProps> = ({
  selectedRegionId,
  onSelectRegion,
  activeRegionFilter,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customImage, setCustomImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('user_map_image_data') || null;
    } catch {
      return null;
    }
  });
  const [isDragOver, setIsDragOver] = useState(false);

  // Check if static penup_20260911_225216.jpg or penup_map.svg is available
  useEffect(() => {
    if (!customImage) {
      fetch('/penup_20260911_225216.jpg', { method: 'HEAD' })
        .then((res) => {
          if (res.ok) setCustomImage('/penup_20260911_225216.jpg');
        })
        .catch(() => {});
    }
  }, [customImage]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomImage(dataUrl);
        try {
          localStorage.setItem('user_map_image_data', dataUrl);
        } catch (err) {
          console.warn('Could not save to localStorage', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomImage(null);
    try {
      localStorage.removeItem('user_map_image_data');
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center select-none transition-all ${
        isDragOver ? 'ring-2 ring-amber-500 bg-amber-50/20' : ''
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Hidden file input for uploading the user's penup_20260911_225216.jpg */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top action toolbar to select or reload penup_20260911_225216.jpg */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-lg p-1 shadow-xs">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-md transition-colors cursor-pointer"
          title="Tải ảnh gốc penup_20260911_225216.jpg từ thiết bị của bạn"
        >
          {customImage ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đang dùng ảnh gốc</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-amber-600" />
              <span>Chọn file penup_20260911_225216.jpg</span>
            </>
          )}
        </button>

        {customImage && (
          <button
            onClick={handleResetImage}
            className="flex items-center gap-1 px-2 py-1 text-xs text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
            title="Khôi phục về bản vẽ mặc định"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Mặc định</span>
          </button>
        )}
      </div>

      <svg
        className="w-full h-full max-h-[720px] md:max-h-[760px] object-contain transition-all"
        viewBox="10 70 800 770"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Arrowhead marker for connectors - Gold / Amber */}
          <marker
            id="yellow-arrow-right"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#b45309" />
          </marker>
          <marker
            id="yellow-arrow-left"
            viewBox="0 0 10 10"
            refX="4"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 8 1.5 L 0 5 L 8 8.5 z" fill="#b45309" />
          </marker>
        </defs>

        {/* ========================================================= */}
        {/* BASE MAP: IF CUSTOM IMAGE IS LOADED, RENDER IT 100% RAW   */}
        {/* ========================================================= */}
        {customImage ? (
          <image
            href={customImage}
            x="30"
            y="50"
            width="720"
            height="760"
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          /* ========================================================= */
          /* PURE HAND-DRAWN MAP (NO GRIDS, NO SHADOWS, PURE UNTOUCHED)*/
          /* ========================================================= */
          <g id="hand-drawn-map-artwork">
            {/* 1. TOP REGION: BÌNH DƯƠNG (Soft Golden Amber - Matches Website) */}
            <g
              id="polygon-binhduong"
              className="cursor-pointer transition-all duration-200"
              onClick={() => onSelectRegion(3)}
            >
              <path
                d="M 140,110
                   C 145,95 165,95 185,120
                   C 195,130 205,115 215,102
                   C 230,112 250,118 280,105
                   C 300,92 330,95 345,118
                   C 355,105 370,95 385,102
                   C 395,120 405,142 420,155
                   C 445,165 470,180 472,205
                   C 472,230 455,245 440,255
                   C 448,268 462,280 458,295
                   C 450,312 435,325 442,345
                   C 448,368 450,395 435,418
                   C 415,442 385,455 360,460
                   C 340,465 325,468 315,470
                   C 275,452 230,432 180,410
                   C 150,395 128,382 115,372
                   C 95,340 75,315 58,285
                   C 48,265 62,242 75,232
                   C 62,215 62,192 72,175
                   C 85,152 110,135 140,110 Z"
                fill={selectedRegionId === 3 ? '#fde047' : activeRegionFilter === 'binhduong' ? '#fde047' : '#fef08a'}
                stroke="#18181b"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-200 hover:brightness-95"
              />
              <text
                x="245"
                y="260"
                textAnchor="middle"
                fill="#18181b"
                fontSize="20"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="800"
                className="pointer-events-none"
              >
                Bình Dương
              </text>
            </g>

            {/* 2. MIDDLE REGION: TP. HỒ CHÍ MINH (Soft Royal Lavender - Matches Website) */}
            <g
              id="polygon-tphcm"
              className="cursor-pointer transition-all duration-200"
              onClick={() => onSelectRegion(1)}
            >
              <path
                d="M 115,372
                   C 128,382 150,395 180,410
                   C 230,432 275,452 315,470
                   C 345,482 375,492 395,518
                   C 405,535 400,560 388,575
                   C 370,595 348,605 352,625
                   C 358,650 375,670 400,685
                   C 420,695 435,700 442,710
                   C 445,725 448,742 445,750
                   C 438,775 422,795 390,810
                   C 355,815 330,795 320,770
                   C 310,740 312,710 305,695
                   C 290,685 270,682 250,675
                   C 220,665 195,650 170,635
                   C 145,622 120,605 122,580
                   C 125,550 115,525 95,495
                   C 75,465 48,450 45,432
                   C 45,415 75,395 115,372 Z"
                fill={selectedRegionId === 1 ? '#c4b5fd' : activeRegionFilter === 'tphcm' ? '#c4b5fd' : '#e9d5ff'}
                stroke="#18181b"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-200 hover:brightness-95"
              />
              <text
                x="235"
                y="535"
                textAnchor="middle"
                fill="#18181b"
                fontSize="20"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="800"
                className="pointer-events-none"
              >
                TP. Hồ Chí Minh
              </text>
            </g>

            {/* 3. BOTTOM REGION: BÀ RỊA - VŨNG TÀU (Soft Coral Rose - Matches Website) */}
            <g
              id="polygon-brvt"
              className="cursor-pointer transition-all duration-200"
              onClick={() => onSelectRegion(2)}
            >
              <path
                d="M 442,710
                   C 452,680 480,652 510,630
                   C 535,612 565,618 595,620
                   C 625,620 655,605 678,615
                   C 705,630 725,655 732,685
                   C 738,715 728,740 715,752
                   C 685,765 650,768 620,770
                   C 585,772 555,780 535,800
                   C 515,815 490,795 480,780
                   C 465,765 450,755 445,750
                   C 448,742 445,725 442,710 Z"
                fill={selectedRegionId === 2 ? '#fda4af' : activeRegionFilter === 'brvt' ? '#fda4af' : '#fecdd3'}
                stroke="#18181b"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-200 hover:brightness-95"
              />
              <text
                x="590"
                y="695"
                textAnchor="middle"
                fill="#18181b"
                fontSize="18"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="800"
                className="pointer-events-none"
              >
                Bà Rịa - Vũng Tàu
              </text>
            </g>
          </g>
        )}

        {/* ========================================================= */}
        {/* INTERACTIVE TRANSPARENT HIT-AREAS OVER IMAGE              */}
        {/* ========================================================= */}
        {customImage && (
          <g opacity="0" className="cursor-pointer">
            <circle cx="275" cy="220" r="100" onClick={() => onSelectRegion(3)} />
            <circle cx="235" cy="535" r="120" onClick={() => onSelectRegion(1)} />
            <circle cx="590" cy="695" r="100" onClick={() => onSelectRegion(2)} />
          </g>
        )}

        {/* ========================================================= */}
        {/* CALLOUT 1: BÌNH DƯƠNG PIN & ARROW CALLOUT                */}
        {/* Preserving all original data and statistics              */}
        {/* ========================================================= */}
        <g className="cursor-pointer" onClick={() => onSelectRegion(3)}>
          {/* Square golden pin */}
          <rect x="275" y="215" width="11" height="11" rx="2.5" fill="#ca8a04" stroke="#ffffff" strokeWidth="1.5" />
          {/* Connector Line to the Right */}
          <line
            x1="286"
            y1="220.5"
            x2="480"
            y2="220.5"
            stroke="#b45309"
            strokeWidth="2.5"
            markerEnd="url(#yellow-arrow-right)"
          />
          {/* Stats Text Callout */}
          <g transform="translate(495, 195)" fontFamily="Plus Jakarta Sans, sans-serif">
            <text x="0" y="0" fill="#a16207" fontSize="14" fontWeight="700">
              Diện tích
            </text>
            <text x="0" y="20" fill="#292524" fontSize="16" fontWeight="800">
              2.695 km²
            </text>
            <text x="0" y="42" fill="#a16207" fontSize="14" fontWeight="700">
              Dân số
            </text>
            <text x="0" y="62" fill="#292524" fontSize="16" fontWeight="800">
              2.426.561 người
            </text>
          </g>
        </g>

        {/* ========================================================= */}
        {/* CALLOUT 2: TP.HCM (MỚI) CONNECTED MEGACITY HUB            */}
        {/* Preserving all original data and statistics              */}
        {/* ========================================================= */}
        <g>
          {/* Golden square pin at junction */}
          <rect x="315" y="465" width="11" height="11" rx="2.5" fill="#b45309" stroke="#ffffff" strokeWidth="1.5" />
          {/* Connector Line to the Right */}
          <line
            x1="326"
            y1="470.5"
            x2="445"
            y2="470.5"
            stroke="#b45309"
            strokeWidth="2.5"
            markerEnd="url(#yellow-arrow-right)"
          />
          {/* Title & Stats */}
          <g transform="translate(460, 430)" fontFamily="Plus Jakarta Sans, sans-serif">
            <text x="0" y="0" fill="#451a03" fontSize="18" fontWeight="800">
              TP.HCM (mới)
            </text>
            <text x="0" y="24" fill="#a16207" fontSize="14" fontWeight="700">
              Diện tích
            </text>
            <text x="0" y="44" fill="#292524" fontSize="16" fontWeight="800">
              6.772 km²
            </text>
            <text x="0" y="66" fill="#a16207" fontSize="14" fontWeight="700">
              Dân số
            </text>
            <text x="0" y="86" fill="#292524" fontSize="16" fontWeight="800">
              13.706.632 người
            </text>
          </g>
        </g>

        {/* ========================================================= */}
        {/* CALLOUT 3: TP.HCM PIN & ARROW CALLOUT                    */}
        {/* Preserving all original data and statistics              */}
        {/* ========================================================= */}
        <g className="cursor-pointer" onClick={() => onSelectRegion(1)}>
          {/* Golden square pin */}
          <rect x="180" y="540" width="11" height="11" rx="2.5" fill="#704f8d" stroke="#ffffff" strokeWidth="1.5" />
          {/* Connector Line Down then Left */}
          <path
            d="M 185.5,551 L 185.5,650 L 135,650"
            fill="none"
            stroke="#704f8d"
            strokeWidth="2.5"
            strokeLinejoin="round"
            markerEnd="url(#yellow-arrow-left)"
          />
          {/* Stats Text Callout (Right-aligned at x=120) */}
          <g transform="translate(120, 620)" fontFamily="Plus Jakarta Sans, sans-serif" textAnchor="end">
            <text x="0" y="0" fill="#704f8d" fontSize="14" fontWeight="700">
              Diện tích
            </text>
            <text x="0" y="20" fill="#292524" fontSize="16" fontWeight="800">
              2.095 km²
            </text>
            <text x="0" y="42" fill="#704f8d" fontSize="14" fontWeight="700">
              Dân số
            </text>
            <text x="0" y="62" fill="#292524" fontSize="16" fontWeight="800">
              9.966.166 người
            </text>
          </g>
        </g>

        {/* ========================================================= */}
        {/* CALLOUT 4: BÀ RỊA - VŨNG TÀU PIN & ARROW CALLOUT         */}
        {/* Preserving all original data and statistics              */}
        {/* ========================================================= */}
        <g className="cursor-pointer" onClick={() => onSelectRegion(2)}>
          {/* Rose/amber square pin */}
          <rect x="585" y="705" width="11" height="11" rx="2.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
          {/* Connector Line Down then Right */}
          <path
            d="M 590.5,716 L 590.5,775 L 640,775"
            fill="none"
            stroke="#b45309"
            strokeWidth="2.5"
            strokeLinejoin="round"
            markerEnd="url(#yellow-arrow-right)"
          />
          {/* Stats Text Callout (Left-aligned at x=655) */}
          <g transform="translate(655, 745)" fontFamily="Plus Jakarta Sans, sans-serif" textAnchor="start">
            <text x="0" y="0" fill="#a16207" fontSize="14" fontWeight="700">
              Diện tích
            </text>
            <text x="0" y="20" fill="#292524" fontSize="16" fontWeight="800">
              1.982 km²
            </text>
            <text x="0" y="42" fill="#a16207" fontSize="14" fontWeight="700">
              Dân số
            </text>
            <text x="0" y="62" fill="#292524" fontSize="16" fontWeight="800">
              1.313.905 người
            </text>
          </g>
        </g>

        {/* Footnote matching user photo */}
        <text
          x="30"
          y="820"
          fontFamily="Be Vietnam Pro, sans-serif"
          fontStyle="italic"
          fontSize="14"
          fill="#57534e"
          fontWeight="600"
        >
          Dân số tính đến cuối năm 2024
        </text>
      </svg>
    </div>
  );
};

