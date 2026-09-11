import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Search, Volume2, BookmarkPlus, Sparkles, BookOpen, 
  Layers, ArrowRight, Languages, Check, HelpCircle, Loader2, ArrowLeftRight
} from 'lucide-react';
import { BilingualWord, lookupWord, lookupWordOnline } from '../data/bilingualDictionary';

interface BilingualDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWord?: string;
  onSaveToNotebook: (topic: string, content: string) => void;
  onShowToast: (title: string, message: string) => void;
}

export const BilingualDictionaryModal: React.FC<BilingualDictionaryModalProps> = ({
  isOpen,
  onClose,
  initialWord = '',
  onSaveToNotebook,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialWord || 'Chào mừng');
  const [selectedResult, setSelectedResult] = useState<BilingualWord | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [direction, setDirection] = useState<'auto' | 'vi_to_en' | 'en_to_vi'>('auto');

  // Suggested keywords for immediate exploration (US curriculum terms)
  const popularKeywords = [
    'Chào mừng',
    'Di sản',
    'Văn hóa',
    'Phương Nam',
    'Hành trình',
    'Khám phá',
    'Đờn ca tài tử',
    'Cải lương',
    'Sổ tay',
    'Hào sảng',
    'Tác giả',
    'Áo bà ba',
    'Bảo tồn',
    'Lịch sử',
    'Sài Gòn'
  ];

  // Perform lookup when initialWord or isOpen changes
  useEffect(() => {
    if (isOpen) {
      const termToQuery = initialWord ? initialWord.trim() : (searchTerm || 'Chào mừng');
      setSearchTerm(termToQuery);
      executeSearch(termToQuery, false);
    }
  }, [initialWord, isOpen]);

  const executeSearch = async (termToSearch: string, isManualSubmit = true) => {
    if (!termToSearch || !termToSearch.trim()) return;
    const clean = termToSearch.trim();
    setIsSaved(false);

    // 1. Instant preliminary result from local dictionary
    const instant = lookupWord(clean);
    if (instant) {
      setSelectedResult(instant);
    }

    // 2. Fetch full live translation and US phonetic enrichment
    setIsLoading(true);
    try {
      const fullResult = await lookupWordOnline(clean, direction);
      setSelectedResult(fullResult);
    } catch (err) {
      console.warn('Online dictionary lookup fallback:', err);
      if (!instant) {
        setSelectedResult(lookupWord(clean));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakUS = (textToSpeak: string, customAudioUrl?: string) => {
    // If we have an official US MP3 audio URL from Dictionary API, play it
    if (customAudioUrl) {
      try {
        const audio = new Audio(customAudioUrl);
        setIsPlayingAudio(true);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => {
          setIsPlayingAudio(false);
          fallbackSpeechSynthesis(textToSpeak);
        };
        audio.play().catch(() => fallbackSpeechSynthesis(textToSpeak));
        return;
      } catch (e) {
        // Fallback to speech synthesis
      }
    }

    fallbackSpeechSynthesis(textToSpeak);
  };

  const fallbackSpeechSynthesis = (textToSpeak: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Extract primary English word before comma, slash or bullet
      const primaryEnglish = textToSpeak.split(/[,/•;]/)[0].trim();
      const utterance = new SpeechSynthesisUtterance(primaryEnglish);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;

      // Prefer American English voice if installed
      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(
        v => v.lang === 'en-US' || v.lang === 'en_US' || v.name.includes('US') || v.name.includes('United States')
      );
      if (usVoice) {
        utterance.voice = usVoice;
      }
      
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      onShowToast("Phát âm", "Trình duyệt của bạn hiện chưa hỗ trợ bộ tổng hợp giọng nói.");
    }
  };

  const handleSaveToCultureNotebook = () => {
    if (!selectedResult) return;
    const topic = `Từ vựng Song ngữ: ${selectedResult.term} (${selectedResult.english})`;
    const content = `• Dịch nghĩa chuẩn Mỹ (US): ${selectedResult.english} (Phiên âm US: ${selectedResult.ipa})\n• Loại từ: ${selectedResult.partOfSpeech}\n• Từ đồng nghĩa: ${selectedResult.synonyms.join(', ')}\n• Ví dụ ngữ cảnh: "${selectedResult.exampleVi}" ➔ "${selectedResult.exampleEn}"\n• Định nghĩa: ${selectedResult.definition}`;
    
    onSaveToNotebook(topic, content);
    setIsSaved(true);
    onShowToast(
      "Đã lưu từ vựng song ngữ", 
      `Từ "${selectedResult.term}" đã được ghi vào Sổ tay văn hóa của bạn (+5 điểm rèn luyện)!`
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e9dff2] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header with Title & Direction */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#f9f0ff] via-[#f5e9ff] to-[#fef7ff] border-b border-[#eee4f7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#704f8d] text-white flex items-center justify-center shadow-md">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#1e1926]">
                  Tra Cứu Song Ngữ Việt - Anh (US)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#f0e49c] text-[#201c00] text-[10px] font-bold inline-flex items-center gap-1">
                  <span>English (US)</span> 🇺🇸
                </span>
              </div>
              <p className="text-xs text-[#7c747f]">
                Tra cứu mọi từ không giới hạn • Chuẩn ngữ pháp & phiên âm Mỹ (General American)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#eee4f7] text-[#7c747f] hover:text-[#1e1926] hover:bg-[#f9f0ff] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar & Direction Selector */}
        <div className="p-4 sm:p-5 border-b border-[#eee4f7] bg-white space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeSearch(searchTerm, true);
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập bất kỳ từ tiếng Việt hoặc tiếng Anh nào..."
              className="w-full pl-10 pr-24 py-3 rounded-2xl bg-[#f9f0ff] border border-[#e9dff2] text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#1e1926] placeholder:text-[#9e94a5] focus:outline-none focus:ring-2 focus:ring-[#704f8d]/40 focus:border-transparent transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-[#704f8d] absolute left-3.5" />
            
            {isLoading ? (
              <div className="absolute right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#704f8d] text-white text-xs font-bold">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang tra...</span>
              </div>
            ) : (
              <button
                type="submit"
                className="absolute right-2 px-4 py-1.5 rounded-xl bg-[#704f8d] text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold hover:bg-[#5a3e73] transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Tra từ
              </button>
            )}
          </form>

          {/* Direction Switch & Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-1 bg-[#fbf6ff] p-1 rounded-xl border border-[#eee4f7]">
              <button
                type="button"
                onClick={() => setDirection('auto')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  direction === 'auto'
                    ? 'bg-[#704f8d] text-white font-bold shadow-xs'
                    : 'text-[#6c6270] hover:text-[#1e1926]'
                }`}
              >
                Tự động nhận diện
              </button>
              <button
                type="button"
                onClick={() => setDirection('vi_to_en')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  direction === 'vi_to_en'
                    ? 'bg-[#704f8d] text-white font-bold shadow-xs'
                    : 'text-[#6c6270] hover:text-[#1e1926]'
                }`}
              >
                🇻🇳 Việt ➔ 🇺🇸 Mỹ (US)
              </button>
              <button
                type="button"
                onClick={() => setDirection('en_to_vi')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  direction === 'en_to_vi'
                    ? 'bg-[#704f8d] text-white font-bold shadow-xs'
                    : 'text-[#6c6270] hover:text-[#1e1926]'
                }`}
              >
                🇺🇸 US ➔ 🇻🇳 Việt
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#7c747f]">
              <Sparkles className="w-3 h-3 text-[#e3aa00]" />
              <span>Hỗ trợ tra không giới hạn từ</span>
            </div>
          </div>

          {/* Quick Keyword Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[11px] text-[#7c747f] shrink-0 font-medium">
              Gợi ý nhanh:
            </span>
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => {
                  setSearchTerm(kw);
                  executeSearch(kw, true);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                  selectedResult?.term.toLowerCase() === kw.toLowerCase()
                    ? 'bg-[#704f8d] text-white shadow-sm'
                    : 'bg-[#f5ecfc] text-[#553c6d] hover:bg-[#ebd9f9]'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Result Card Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {selectedResult ? (
            <div className="space-y-5">
              {/* Primary Word Banner */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#f9f0ff] to-[#f4e8ff] border border-[#e9dff2] shadow-sm relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#1e1926]">
                        {selectedResult.term}
                      </h2>
                      <span className="px-3 py-1 rounded-full bg-[#f0e49c] text-[#201c00] text-xs font-bold font-mono">
                        {selectedResult.ipa}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs text-[#7c747f] font-medium">
                        {selectedResult.direction === 'en_to_vi' ? 'Tiếng Việt:' : 'Tiếng Anh (US):'}
                      </span>
                      <p className="text-lg sm:text-xl font-extrabold text-[#704f8d] font-['Plus_Jakarta_Sans',sans-serif]">
                        {selectedResult.direction === 'en_to_vi' ? selectedResult.definition : selectedResult.english}
                      </p>
                    </div>
                  </div>

                  {/* Audio Speaker Button (US Accent) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeakUS(selectedResult.english, selectedResult.audioUrl)}
                      title="Nghe phát âm chuẩn giọng Mỹ (General American US)"
                      className={`px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] transition-all cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-[#e3aa00] text-[#201c00] animate-pulse'
                          : 'bg-white text-[#704f8d] hover:bg-[#f5e9ff] border border-[#deb7fe] shadow-sm'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlayingAudio ? 'Đang đọc...' : 'Phát âm (US)'}</span>
                      <span className="text-[10px]">🇺🇸</span>
                    </button>
                  </div>
                </div>

                {/* Part of Speech Pill */}
                <div className="mt-3.5 pt-3 border-t border-[#ebd9f9] flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-white/80 text-[#704f8d] font-bold border border-[#e3cefb]">
                    Loại từ: {selectedResult.partOfSpeech}
                  </span>
                  <span className="text-xs text-[#554d58] font-medium">
                    {selectedResult.englishDefinition || selectedResult.definition}
                  </span>
                </div>
              </div>

              {/* Synonyms Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* English US Synonyms */}
                <div className="p-4 rounded-2xl bg-white border border-[#e9dff2] shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#1e1926] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#e3aa00]" />
                      Từ đồng nghĩa tiếng Mỹ (US Synonyms)
                    </span>
                    <span className="text-[10px] text-[#704f8d] font-bold bg-[#f9f0ff] px-2 py-0.5 rounded-full">
                      {selectedResult.synonyms.length} từ
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedResult.synonyms.map((syn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSpeakUS(syn)}
                        title="Bấm để nghe phát âm giọng Mỹ"
                        className="px-2.5 py-1 rounded-xl bg-[#fbf6ff] hover:bg-[#f0e49c]/40 text-[#4b444e] hover:text-[#201c00] border border-[#eeddfc] text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{syn}</span>
                        <Volume2 className="w-2.5 h-2.5 text-[#9e94a5]" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vietnamese Synonyms & Antonyms */}
                <div className="p-4 rounded-2xl bg-white border border-[#e9dff2] shadow-sm space-y-3">
                  <div>
                    <span className="text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#1e1926] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#704f8d]" />
                      Nghĩa tiếng Việt tương đương
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {selectedResult.vietnameseSynonyms.map((viSyn, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-[#f7f2fa] text-[#4b444e] text-xs font-medium"
                        >
                          {viSyn}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedResult.antonyms && selectedResult.antonyms.length > 0 && (
                    <div className="pt-2 border-t border-[#eee4f7]">
                      <span className="text-[11px] font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#7c747f]">
                        Từ trái nghĩa (Antonyms):
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedResult.antonyms.map((ant, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg bg-[#fff1f1] text-[#932323] text-[11px] font-medium"
                          >
                            {ant}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bilingual Example Sentence in US English */}
              <div className="p-4.5 rounded-2xl bg-[#faf5ff] border border-[#e5d4f5] space-y-2.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#704f8d]" />
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#1e1926] uppercase tracking-wider">
                    Câu Ví Dụ Ngữ Cảnh Song Ngữ (Chuẩn US)
                  </h4>
                </div>
                <div className="space-y-1.5 pl-3 border-l-2 border-[#704f8d]">
                  <p className="text-xs sm:text-sm font-['Be_Vietnam_Pro',sans-serif] text-[#1e1926] font-medium">
                    🇻🇳 {selectedResult.exampleVi}
                  </p>
                  <p className="text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] text-[#704f8d] italic">
                    🇺🇸 {selectedResult.exampleEn}
                  </p>
                </div>
                {selectedResult.culturalNote && (
                  <p className="text-[11px] text-[#554d58] bg-white/80 p-2.5 rounded-xl border border-[#ebd9f9] leading-relaxed">
                    💡 <strong className="text-[#1e1926]">Ghi chú văn hóa:</strong> {selectedResult.culturalNote}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-10 text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-[#deb7fe] mx-auto" />
              <p className="text-sm font-bold text-[#1e1926]">
                Nhập bất kỳ từ nào để tra cứu song ngữ
              </p>
              <p className="text-xs text-[#7c747f] max-w-sm mx-auto">
                Hệ thống hỗ trợ tra toàn bộ từ vựng không giới hạn, dịch chính xác song ngữ Việt - Anh (US) cùng phiên âm bản xứ.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-[#fef7ff] border-t border-[#eee4f7] flex items-center justify-between gap-3">
          <p className="text-[11px] text-[#7c747f] hidden sm:block">
            Mẹo: Bôi đen bất kỳ từ nào trong bài giảng để mở nhanh bong bóng tra cứu chuẩn US!
          </p>
          <div className="flex items-center gap-2 ml-auto">
            {selectedResult && (
              <button
                type="button"
                onClick={handleSaveToCultureNotebook}
                disabled={isSaved}
                className={`px-4 py-2 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-[#def6e6] text-[#0f6c2f] cursor-default'
                    : 'bg-[#f0e49c] text-[#201c00] hover:bg-[#ebd978] shadow-sm'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã lưu vào Sổ tay</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-3.5 h-3.5 text-[#704f8d]" />
                    <span>Lưu vào Sổ tay văn hóa</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white border border-[#e9dff2] text-[#1e1926] text-xs font-semibold hover:bg-[#f9f0ff] transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
