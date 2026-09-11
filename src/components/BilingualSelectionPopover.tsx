import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Volume2, ArrowRight, X } from 'lucide-react';
import { lookupWord, lookupWordOnline, BilingualWord } from '../data/bilingualDictionary';

interface BilingualSelectionPopoverProps {
  onOpenFullModal: (word: string) => void;
}

export const BilingualSelectionPopover: React.FC<BilingualSelectionPopoverProps> = ({
  onOpenFullModal
}) => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [matchedWord, setMatchedWord] = useState<BilingualWord | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseUp = () => {
      // Allow browser selection to settle
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          return;
        }

        const rawText = selection.toString().trim();
        // Trigger for selections of 1-6 words
        const wordCount = rawText.split(/\s+/).length;
        if (rawText.length >= 2 && wordCount <= 6) {
          try {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            if (rect.width > 0 && rect.height > 0) {
              setSelectedText(rawText);
              
              // 1. Synchronous lookup
              const instant = lookupWord(rawText);
              setMatchedWord(instant);

              // 2. Asynchronous online enrichment for accuracy if not curated
              if (!instant || instant.source !== 'curated') {
                lookupWordOnline(rawText).then(enriched => {
                  setMatchedWord(enriched);
                }).catch(() => {
                  // Keep instant
                });
              }

              // Compute coordinates above the selected text
              const x = Math.max(10, Math.min(window.innerWidth - 320, rect.left + rect.width / 2 - 140));
              const y = Math.max(10, rect.top + window.scrollY - 58);

              setCoords({ x, y });
              setIsVisible(true);
            }
          } catch (e) {
            // Ignore selection range edge cases
          }
        }
      }, 100);
    };

    const handleMouseDown = (e: MouseEvent) => {
      // If clicking outside the popover, dismiss it
      const target = e.target as HTMLElement;
      if (!target.closest('#bilingual-floating-popover')) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleSpeakUS = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const primaryEnglish = text.split(/[,/•;]/)[0].trim();
      const utterance = new SpeechSynthesisUtterance(primaryEnglish);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      
      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(
        v => v.lang === 'en-US' || v.lang === 'en_US' || v.name.includes('US')
      );
      if (usVoice) {
        utterance.voice = usVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isVisible || !coords || !selectedText) return null;

  return (
    <div
      id="bilingual-floating-popover"
      style={{
        position: 'absolute',
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        zIndex: 9999
      }}
      className="animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="bg-[#201926] text-white rounded-2xl p-2 sm:p-2.5 shadow-2xl border border-[#704f8d]/60 flex items-center gap-2 max-w-sm backdrop-blur-md">
        <div className="w-7 h-7 rounded-xl bg-[#704f8d] text-[#f0e49c] flex items-center justify-center shrink-0">
          <Languages className="w-4 h-4" />
        </div>

        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#f0e49c] truncate max-w-[90px]">
              "{selectedText}"
            </span>
            <span className="text-[10px] text-white/50">➔</span>
            <span className="text-xs font-extrabold text-white truncate max-w-[120px]">
              {matchedWord?.english.split(/[,/]/)[0] || 'Tra tiếng Mỹ (US)'}
            </span>
            <span className="text-[10px]">🇺🇸</span>
          </div>
          {matchedWord?.partOfSpeech && (
            <span className="text-[9px] text-[#deb7fe] truncate">
              {matchedWord.partOfSpeech.split('/')[0]}
            </span>
          )}
        </div>

        {matchedWord?.english && (
          <button
            onClick={(e) => handleSpeakUS(e, matchedWord.english)}
            title="Nghe phát âm chuẩn giọng Mỹ (US)"
            className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#f0e49c]" />
          </button>
        )}

        <button
          onClick={() => {
            setIsVisible(false);
            onOpenFullModal(selectedText);
          }}
          className="px-2.5 py-1 rounded-xl bg-[#f0e49c] text-[#201c00] text-[11px] font-bold font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#ebd978] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <span>Chi tiết</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          onClick={() => setIsVisible(false)}
          className="w-5 h-5 rounded-full hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
