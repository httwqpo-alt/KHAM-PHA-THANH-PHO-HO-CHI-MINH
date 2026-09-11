import React, { useState } from 'react';
import { Award, BookOpen, Trash2, Download, Plus, Star, Calendar, User, Mail } from 'lucide-react';

interface NoteItem {
  id: string;
  date: string;
  topic: string;
  content: string;
}

interface NotebookViewProps {
  userPoints: number;
  userEmail: string;
  userName: string;
  userSchool?: string;
  notes: NoteItem[];
  onDeleteNote: (id: string) => void;
  onAddNote: (topic: string, content: string) => void;
  onShowToast: (title: string, message: string) => void;
  onOpenRegisterModal: () => void;
}

export const NotebookView: React.FC<NotebookViewProps> = ({
  userPoints,
  userEmail,
  userName,
  userSchool,
  notes,
  onDeleteNote,
  onAddNote,
  onShowToast,
  onOpenRegisterModal
}) => {
  const [newTopic, setNewTopic] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const badges = [
    { name: "Khởi Đầu Hành Trình", desc: "Tham gia cổng học liệu GDĐP 2024", earned: true },
    { name: "Người Yêu Văn Khắc", desc: "Hoàn thành tìm hiểu Gia Định Báo", earned: true },
    { name: "Ký Giả Nam Kỳ", desc: "Tích lũy trên 100 điểm di sản", earned: userPoints >= 100 },
    { name: "Nhà Thám Hiểm Sài Gòn", desc: "Khám phá bản đồ liên kết vùng", earned: true },
    { name: "Học Giả Xuất Sắc", desc: "Đạt mốc 200 điểm di sản", earned: userPoints >= 200 },
  ];

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newContent.trim()) return;
    onAddNote(newTopic, newContent);
    setNewTopic('');
    setNewContent('');
    setShowAddModal(false);
    onShowToast("Đã thêm ghi chú", "Ghi chú mới đã được lưu vào sổ tay.");
  };

  const handleExportNotebook = () => {
    onShowToast("Đang xuất sổ tay", "Tập tin Sổ Tay Văn Hóa đang được chuẩn bị...");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
      {/* Header Profile Summary */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e9dff2] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-[#f0e49c] text-[#201c00] flex items-center justify-center font-bold text-2xl shadow-sm">
            {userName ? userName.charAt(0).toUpperCase() : 'VH'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl sm:text-2xl text-[#1e1926]">
                {userName || 'Người Yêu Văn Hóa Phương Nam'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f9f0ff] text-[#704f8d] text-xs font-bold">
                Sổ Tay Văn Hóa
              </span>
            </div>
            <p className="text-xs text-[#7c747f] flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5 text-[#704f8d]" />
              <span>{userEmail ? userEmail : 'Chưa liên kết email cá nhân'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#f9f0ff] p-3 px-5 rounded-2xl border border-[#eee4f7] text-center">
            <span className="text-[11px] text-[#7c747f] font-semibold block">Điểm Di Sản</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl text-[#704f8d]">
              {userPoints} pts
            </span>
          </div>
          <button
            onClick={onOpenRegisterModal}
            className="px-4 py-2.5 rounded-full bg-[#f0e49c] text-[#201c00] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold hover:bg-[#ebd978] transition-all cursor-pointer"
          >
            {userEmail ? 'Cập Nhật Hồ Sơ Cá Nhân' : 'Đăng Ký Email Cá Nhân'}
          </button>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#1e1926] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#fea619]" />
            Huy Hiệu & Chứng Nhận Di Sản Số
          </h2>
          <span className="text-xs text-[#704f8d] font-semibold">
            Đã đạt {badges.filter(b => b.earned).length}/{badges.length} huy hiệu
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                badge.earned
                  ? 'bg-white border-[#deb7fe] shadow-sm'
                  : 'bg-[#fdfaff] border-[#eee4f7] opacity-60'
              }`}
            >
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                badge.earned ? 'bg-[#f0e49c] text-[#201c00]' : 'bg-[#eee4f7] text-[#7c747f]'
              }`}>
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#1e1926]">
                {badge.name}
              </h4>
              <p className="text-[10px] text-[#7c747f] leading-tight">
                {badge.desc}
              </p>
              <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                badge.earned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {badge.earned ? 'Đã nhận' : 'Chưa mở'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#1e1926] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#704f8d]" />
              Sổ Tay Văn Hóa ({notes.length})
            </h2>
            <p className="text-xs text-[#7c747f]">
              Lưu trữ cảm thụ văn học, tư liệu điền dã và kiến thức văn hóa Nam Bộ của bạn.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-full bg-[#704f8d] text-white hover:bg-[#583975] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm ghi chép</span>
            </button>
            <button
              onClick={handleExportNotebook}
              className="px-4 py-2 rounded-full bg-white text-[#704f8d] hover:bg-[#f9f0ff] border border-[#e9dff2] font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Xuất PDF</span>
            </button>
          </div>
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#e9dff2] space-y-2">
            <BookOpen className="w-10 h-10 text-[#deb7fe] mx-auto" />
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#1e1926]">
              Chưa có trang ghi chép nào
            </h3>
            <p className="text-xs text-[#7c747f] max-w-sm mx-auto">
              Hãy ghi lại cảm nhận về văn hóa, tác giả phương Nam hoặc bấm "Thêm ghi chép" để bắt đầu trang viết đầu tiên vào Sổ Tay Văn Hóa của bạn!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
              <div
                key={note.id}
                className="bg-white rounded-3xl p-5 border border-[#e9dff2] shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#f9f0ff] text-[#704f8d]">
                      {note.topic}
                    </span>
                    <button
                      onClick={() => {
                        onDeleteNote(note.id);
                        onShowToast("Đã xóa ghi chú", "Ghi chú đã được gỡ khỏi sổ tay.");
                      }}
                      className="text-[#7c747f] hover:text-red-600 p-1 cursor-pointer"
                      title="Xóa ghi chép"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-[#1e1926] font-['Be_Vietnam_Pro',sans-serif] leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#eee4f7] flex items-center gap-1.5 text-[10px] text-[#7c747f]">
                  <Calendar className="w-3 h-3 text-[#704f8d]" />
                  <span>{note.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#e9dff2] shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926]">
              Thêm Ghi Chép Mới Vào Sổ Tay Văn Hóa
            </h3>
            <form onSubmit={handleCreateNote} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1e1926]">Chủ đề bài học / Di tích:</label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Ví dụ: Cảm nghĩ về tác phẩm Hương rừng Cà Mau"
                  required
                  className="w-full px-3 py-2 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] text-xs font-['Be_Vietnam_Pro',sans-serif]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1e1926]">Nội dung ghi chép:</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Viết cảm nhận, câu hỏi hoặc kiến thức cần nhớ..."
                  required
                  className="w-full p-3 rounded-2xl bg-[#f9f0ff] border border-[#eee4f7] text-xs font-['Be_Vietnam_Pro',sans-serif] resize-none"
                ></textarea>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#4b444e] hover:bg-[#eee4f7]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#704f8d] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold hover:bg-[#583975]"
                >
                  Lưu Ghi Chép
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
