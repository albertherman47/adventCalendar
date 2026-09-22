import React, { useState, useEffect } from 'react';
import { SupportedLanguage, DayData, UserProgress, PricingTier, GiftItem } from './types';
import { ADVENT_DAYS, getLocalizedAdventDays } from './data/adventDays';
import { Navbar, NavTab } from './components/Navbar';
import { SnowEffect } from './components/SnowEffect';
import { LandingPage } from './components/LandingPage';
import { AdventCalendar } from './components/AdventCalendar';
import { PrintableResourcesView } from './components/PrintableResourcesView';
import { EmergencyMode } from './components/EmergencyMode';
import { GiftHelper } from './components/GiftHelper';
import { CompletionModal } from './components/CompletionModal';
import { DayModal } from './components/DayModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { toggleFireplaceAudio, isFireplacePlaying } from './utils/audio';
import { trackEvent } from './utils/analytics';

const STORAGE_KEY = 'christmas_reset_progress_2026';
const LANGUAGE_STORAGE_KEY = 'christmas_reset_lang_2026';

const DEFAULT_PROGRESS: UserProgress = {
  hasPurchased: false,
  isPreviewMode: true, // Default to true so reviewers and customers can immediately test and explore all 24 days
  completedDays: [1], // Day 1 completed as welcoming demo
  unlockedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  emergencyCompletedTasks: {},
  budgetData: {
    totalBudget: 2500,
    items: [
      { category: 'Cadouri Familie & Partener', allocated: 1200, actual: 0, label: 'Cadouri Familie & Partener' },
      { category: 'Cadouri Prieteni & Colegi', allocated: 400, actual: 0, label: 'Cadouri Prieteni & Colegi' },
      { category: 'Masa de Crăciun & Băcănie', allocated: 600, actual: 0, label: 'Masa de Crăciun & Băcănie' },
      { category: 'Decorațiuni & Brad', allocated: 150, actual: 0, label: 'Decorațiuni & Brad' },
      { category: 'Rezervă Urgențe', allocated: 150, actual: 0, label: 'Rezervă Urgențe' },
    ],
  },
  giftList: [
    { id: '1', recipient: 'Mama', category: 'parent', idea: 'Pulover călduros din lână', budget: 200, purchased: true, wrapped: false },
    { id: '2', recipient: 'Partener', category: 'partner', idea: 'Weekend de SPA în ianuarie', budget: 350, purchased: false, wrapped: false },
    { id: '3', recipient: 'Ana (Prietena cea mai bună)', category: 'friend', idea: 'Cană artizanală ceramică & carte', budget: 120, purchased: false, wrapped: false },
  ],
  checklistStates: {
    'day4_step_0': true,
    'day4_step_1': true,
  },
  userNotes: {
    1: 'Am stabilit un buget realist anul acesta pentru a nu mai avea griji în ianuarie.',
  },
};

export default function App() {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'ro' || saved === 'hu' || saved === 'en') {
        return saved;
      }
    } catch {
      // safe fallback
    }
    return 'ro';
  });

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {
      // safe fallback
    }
  };

  const currentAdventDays = getLocalizedAdventDays(language);

  const [activeTab, setActiveTab] = useState<NavTab>('landing');
  const [isSnowing, setIsSnowing] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Modals state
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [isDayModalOpen, setIsDayModalOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier>('premium');
  const [selectedPrintableId, setSelectedPrintableId] = useState<string | null>(null);

  // Keep selectedDay synchronized with localized day when language changes
  useEffect(() => {
    if (selectedDay) {
      const updated = currentAdventDays.find((d) => d.id === selectedDay.id);
      if (updated) {
        setSelectedDay(updated);
      }
    }
  }, [language]);

  // User Progress state with LocalStorage persistence
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // safe fallback
    }
    return DEFAULT_PROGRESS;
  });

  // Save on updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch {
      // storage error fallback
    }
  }, [userProgress]);

  // Audio ambient toggle
  const handleToggleAudio = () => {
    const isNowPlaying = toggleFireplaceAudio(0.3);
    setIsPlayingAudio(isNowPlaying);
    trackEvent('ambient_audio_toggle', { playing: isNowPlaying });
  };

  // Day Modal Handlers
  const handleOpenDayModal = (day: DayData) => {
    setSelectedDay(day);
    setIsDayModalOpen(true);
  };

  const handleCloseDayModal = () => {
    setIsDayModalOpen(false);
  };

  // Day complete toggle
  const handleToggleCompleteDay = (dayId: number) => {
    setUserProgress((prev) => {
      const isAlreadyCompleted = prev.completedDays.includes(dayId);
      const newCompleted = isAlreadyCompleted
        ? prev.completedDays.filter((id) => id !== dayId)
        : [...prev.completedDays, dayId];

      if (!isAlreadyCompleted && (dayId === 24 || newCompleted.length === 24)) {
        setTimeout(() => setIsCompletionModalOpen(true), 600);
      }

      return {
        ...prev,
        completedDays: newCompleted,
      };
    });
  };

  // Emergency Mode Task Toggle
  const handleToggleEmergencyTask = (taskId: string) => {
    setUserProgress((prev) => {
      const current = prev.emergencyCompletedTasks || {};
      return {
        ...prev,
        emergencyCompletedTasks: {
          ...current,
          [taskId]: !current[taskId],
        },
      };
    });
  };

  // Save Gift from Gift Helper
  const handleSaveGiftFromHelper = (gift: { recipient: string; idea: string; budget: number }) => {
    setUserProgress((prev) => ({
      ...prev,
      giftList: [
        ...prev.giftList,
        {
          id: Date.now().toString(),
          recipient: gift.recipient,
          category: 'friend',
          idea: gift.idea,
          budget: gift.budget,
          purchased: false,
          wrapped: false,
        },
      ],
    }));
  };

  // Budget data updates
  const handleUpdateBudget = (budgetData: UserProgress['budgetData']) => {
    setUserProgress((prev) => ({
      ...prev,
      budgetData,
    }));
  };

  // Gift list updates
  const handleUpdateGiftList = (giftList: GiftItem[]) => {
    setUserProgress((prev) => ({
      ...prev,
      giftList,
    }));
  };

  // Checklists states
  const handleUpdateChecklist = (key: string, value: boolean) => {
    setUserProgress((prev) => ({
      ...prev,
      checklistStates: {
        ...prev.checklistStates,
        [key]: value,
      },
    }));
  };

  // User reflection notes
  const handleUpdateUserNote = (dayId: number, note: string) => {
    setUserProgress((prev) => ({
      ...prev,
      userNotes: {
        ...prev.userNotes,
        [dayId]: note,
      },
    }));
  };

  // Toggle Creator/Preview Mode
  const handleTogglePreviewMode = () => {
    setUserProgress((prev) => ({
      ...prev,
      isPreviewMode: !prev.isPreviewMode,
    }));
  };

  // Pricing & Checkout
  const handleOpenCheckoutWithTier = (tier: PricingTier) => {
    setSelectedTier(tier);
    setIsCheckoutModalOpen(true);
  };

  const handleSuccessUnlock = () => {
    setUserProgress((prev) => ({
      ...prev,
      hasPurchased: true,
      isPreviewMode: true,
    }));
    setIsCheckoutModalOpen(false);
    setActiveTab('calendar');
  };

  // Navigating to Printables
  const handleOpenPrintable = (resourceId: string) => {
    setSelectedPrintableId(resourceId);
    setIsDayModalOpen(false);
    setActiveTab('printables');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary-container selection:text-white relative font-sans">
      {/* Visual Snow Effect */}
      {isSnowing && <SnowEffect />}

      {/* Primary Navigation Bar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab === 'downloads' ? 'printables' : tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isPreviewMode={userProgress.isPreviewMode}
        onTogglePreviewMode={handleTogglePreviewMode}
        hasPurchased={userProgress.hasPurchased}
        onOpenCheckout={() => handleOpenCheckoutWithTier('premium')}
        snowEnabled={isSnowing}
        onToggleSnow={() => setIsSnowing(!isSnowing)}
        audioPlaying={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        completedCount={userProgress.completedDays.length}
      />

      {/* Main View Router */}
      <main className="flex-1 pt-20">
        {activeTab === 'landing' && (
          <LandingPage
            language={language}
            days={currentAdventDays}
            userProgress={userProgress}
            onStartClick={() => handleOpenCheckoutWithTier('premium')}
            onExploreCalendarClick={() => {
              setActiveTab('calendar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectDay={handleOpenDayModal}
            onSelectTier={handleOpenCheckoutWithTier}
            onOpenStarterPack={() => {
              setActiveTab('printables');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPrintable={handleOpenPrintable}
            onNavigateEmergency={() => {
              setActiveTab('emergency');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateGifts={() => {
              setActiveTab('gift-helper');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onToggleChecklist={handleUpdateChecklist}
          />
        )}

        {activeTab === 'calendar' && (
          <AdventCalendar
            language={language}
            days={currentAdventDays}
            userProgress={userProgress}
            onOpenDayModal={handleOpenDayModal}
            onTogglePreviewMode={handleTogglePreviewMode}
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyMode
            language={language}
            userProgress={userProgress}
            onToggleTask={handleToggleEmergencyTask}
            onNavigateToCalendar={() => {
              setActiveTab('calendar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'gift-helper' && (
          <GiftHelper
            language={language}
            onSaveToGiftList={handleSaveGiftFromHelper}
            onNavigateToGiftPlanner={() => {
              const day3 = currentAdventDays.find((d) => d.id === 3);
              if (day3) {
                handleOpenDayModal(day3);
              } else {
                setActiveTab('calendar');
              }
            }}
          />
        )}

        {activeTab === 'printables' && (
          <PrintableResourcesView
            language={language}
            onBackToHome={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedResourceId={selectedPrintableId}
          />
        )}
      </main>

      {/* Global Interactive Day Modal */}
      <DayModal
        day={selectedDay}
        language={language}
        isOpen={isDayModalOpen}
        onClose={handleCloseDayModal}
        userProgress={userProgress}
        onToggleCompleteDay={handleToggleCompleteDay}
        onUpdateBudget={handleUpdateBudget}
        onUpdateGiftList={handleUpdateGiftList}
        onUpdateChecklist={handleUpdateChecklist}
        onUpdateUserNote={handleUpdateUserNote}
        onOpenPrintable={handleOpenPrintable}
      />

      {/* Day 24 Celebration & Social Sharing Modal */}
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        language={language}
        onNavigateToPrintables={() => {
          setIsCompletionModalOpen(false);
          setActiveTab('printables');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        selectedTier={selectedTier}
        onTierChange={setSelectedTier}
        language={language}
        onSuccessUnlock={handleSuccessUnlock}
      />

      {/* Footer */}
      <Footer
        language={language}
        onLanguageChange={handleLanguageChange}
        onNavigateHome={() => {
          setActiveTab('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateCalendar={() => {
          setActiveTab('calendar');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigatePrintables={() => {
          setActiveTab('printables');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateEmergency={() => {
          setActiveTab('emergency');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateGifts={() => {
          setActiveTab('gift-helper');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigatePricing={() => {
          const el = document.getElementById('planuri-acces');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else handleOpenCheckoutWithTier('standard');
        }}
      />
    </div>
  );
}
