import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { Grade11View } from './components/Grade11View';
import { GradeOverviewView } from './components/GradeOverviewView';
import { InteractiveMapView } from './components/InteractiveMapView';
import { NotebookView } from './components/NotebookView';
import { AuthorAnalysisModal } from './components/AuthorAnalysisModal';
import { RegistrationModal } from './components/RegistrationModal';
import { BilingualDictionaryModal } from './components/BilingualDictionaryModal';
import { BilingualSelectionPopover } from './components/BilingualSelectionPopover';
import { BilingualFloatingButton } from './components/BilingualFloatingButton';
import { Toast } from './components/Toast';
import { AuthorProfile, NavigationTab } from './types';

interface NoteItem {
  id: string;
  date: string;
  topic: string;
  content: string;
}

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('trang-chu');

  // Student Profile State with LocalStorage
  const [userPoints, setUserPoints] = useState<number>(() => {
    const saved = localStorage.getItem('gddp_user_points');
    return saved ? parseInt(saved, 10) : 120;
  });

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('gddp_user_name') || 'Nguyễn Thành Danh';
  });

  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('gddp_user_email') || 'thanhdanh.saigon@gmail.com';
  });

  const [userSchool, setUserSchool] = useState<string>(() => {
    return localStorage.getItem('gddp_user_school') || '';
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('gddp_user_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'note-init-1',
        date: 'Hôm nay, 14:30',
        topic: 'Chủ đề 1: Văn học TP.HCM trước 1975',
        content: 'Ấn tượng sâu sắc với tinh thần trọng nghĩa khinh tài và lòng hào sảng của các nhân vật trong tác phẩm của nhà văn Sơn Nam. Ngôn ngữ Nam Bộ mộc mạc nhưng giàu sức gợi cảm biến đời sống khẩn hoang thành một thiên sử thi phương Nam.'
      }
    ];
  });

  // Modal & Toast States
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorProfile | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isBilingualModalOpen, setIsBilingualModalOpen] = useState<boolean>(false);
  const [bilingualLookupWord, setBilingualLookupWord] = useState<string>('Chào mừng');
  const [toast, setToast] = useState<{ id: number; title: string; message: string } | null>(null);

  const handleOpenBilingual = (word?: string) => {
    if (word) {
      setBilingualLookupWord(word);
    }
    setIsBilingualModalOpen(true);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('gddp_user_points', userPoints.toString());
  }, [userPoints]);

  useEffect(() => {
    localStorage.setItem('gddp_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('gddp_user_email', userEmail);
  }, [userEmail]);

  useEffect(() => {
    localStorage.setItem('gddp_user_school', userSchool);
  }, [userSchool]);

  useEffect(() => {
    localStorage.setItem('gddp_user_notes', JSON.stringify(notes));
  }, [notes]);

  const showToast = (title: string, message: string) => {
    setToast({ id: Date.now(), title, message });
    setTimeout(() => {
      setToast(prev => (prev?.title === title ? null : prev));
    }, 4500);
  };

  const handleAddPoints = (amount: number) => {
    setUserPoints(prev => prev + amount);
  };

  const handleSaveNote = (topic: string, content: string, email?: string) => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      topic,
      content
    };
    setNotes(prev => [newNote, ...prev]);
    if (email && email !== userEmail) {
      setUserEmail(email);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleSaveUser = (name: string, email: string, school: string) => {
    setUserName(name);
    setUserEmail(email);
    setUserSchool(school);
    showToast("Hồ sơ đã lưu", `Chào mừng bạn ${name}! Thông tin cá nhân và Sổ tay văn hóa đã được cập nhật.`);
  };

  // Scroll to top when changing tab
  const handleSelectTab = (tab: NavigationTab | 'ban-do' | 'so-tay') => {
    const normalized: NavigationTab = 
      tab === 'ban-do' ? 'ban-do-tuong-tac' :
      tab === 'so-tay' ? 'so-tay-hoc-tap' :
      (tab as NavigationTab);

    setCurrentTab(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fef7ff] text-[#1e1926] font-['Be_Vietnam_Pro',sans-serif] selection:bg-[#deb7fe] selection:text-[#2a0946]">
      {/* Universal Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        userPoints={userPoints}
        userEmail={userEmail}
        onOpenRegisterModal={() => setIsRegisterOpen(true)}
        onOpenBilingualModal={() => handleOpenBilingual('Chào mừng')}
      />

      {/* Main Content Area with Animated Route Transitions */}
      <main className="flex-1 w-full pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full flex flex-col"
          >
            {currentTab === 'trang-chu' && (
              <HomeView
                onNavigateToGrade={handleSelectTab}
                onNavigateToGrade11={() => handleSelectTab('khoi-11')}
                onNavigateToMap={() => handleSelectTab('ban-do-tuong-tac')}
                onAddPoints={handleAddPoints}
                onShowToast={showToast}
                onOpenBilingualWord={(word) => handleOpenBilingual(word)}
              />
            )}

            {currentTab === 'khoi-11' && (
              <Grade11View
                onAddPoints={handleAddPoints}
                onSaveNote={handleSaveNote}
                onShowToast={showToast}
                onOpenAuthorModal={(author) => setSelectedAuthor(author)}
                userPoints={userPoints}
                userEmail={userEmail}
              />
            )}

            {currentTab === 'khoi-10' && (
              <GradeOverviewView
                grade="khoi-10"
                onNavigateToGrade11={() => handleSelectTab('khoi-11')}
                onShowToast={showToast}
              />
            )}

            {currentTab === 'khoi-12' && (
              <GradeOverviewView
                grade="khoi-12"
                onNavigateToGrade11={() => handleSelectTab('khoi-11')}
                onShowToast={showToast}
              />
            )}

            {currentTab === 'ban-do-tuong-tac' && (
              <InteractiveMapView
                onShowToast={showToast}
                onNavigateToTopic={() => handleSelectTab('khoi-11')}
              />
            )}

            {currentTab === 'so-tay-hoc-tap' && (
              <NotebookView
                userPoints={userPoints}
                userEmail={userEmail}
                userName={userName}
                userSchool={userSchool}
                notes={notes}
                onDeleteNote={handleDeleteNote}
                onAddNote={(topic, content) => handleSaveNote(topic, content)}
                onShowToast={showToast}
                onOpenRegisterModal={() => setIsRegisterOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer 
        onSelectTab={handleSelectTab} 
        onOpenRegisterModal={() => setIsRegisterOpen(true)} 
      />

      {/* Modals & Popups */}
      <AuthorAnalysisModal
        author={selectedAuthor}
        onClose={() => setSelectedAuthor(null)}
        onShowToast={showToast}
        onSaveToNotebook={(topic, content) => handleSaveNote(topic, content)}
      />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSaveUser={handleSaveUser}
        currentName={userName}
        currentEmail={userEmail}
        currentSchool={userSchool}
      />

      {/* Bilingual English Dictionary Modal */}
      <BilingualDictionaryModal
        isOpen={isBilingualModalOpen}
        onClose={() => setIsBilingualModalOpen(false)}
        initialWord={bilingualLookupWord}
        onSaveToNotebook={handleSaveNote}
        onShowToast={showToast}
      />

      {/* Floating Interactive Text Selection Popover */}
      <BilingualSelectionPopover
        onOpenFullModal={(word) => handleOpenBilingual(word)}
      />

      {/* Persistent Floating Bilingual Assistant Launcher */}
      <BilingualFloatingButton
        onOpenModal={(word) => handleOpenBilingual(word)}
      />

      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;

