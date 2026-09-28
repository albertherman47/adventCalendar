import React, { useState, useEffect } from 'react';
import { SupportedLanguage, DayData, UserProgress, PricingTier, GiftItem } from './types';
import { ADVENT_DAYS, getLocalizedAdventDays } from './data/adventDays';
import { Navbar, NavTab } from './components/Navbar';
import { SnowEffect } from './components/SnowEffect';
import { LandingPage } from './components/LandingPage';
import { AdventCalendar } from './components/AdventCalendar';
import { PrintableResourcesView } from './components/PrintableResourcesView';
import { ChristmasCardStudio } from './components/ChristmasCardStudio';
import { EmergencyMode } from './components/EmergencyMode';
import { GiftHelper } from './components/GiftHelper';
import { CompletionModal } from './components/CompletionModal';
import { DayModal } from './components/DayModal';
import { CheckoutModal } from './components/CheckoutModal';
import { LanguageSelectionModal } from './components/LanguageSelectionModal';
import { DatabaseStatusModal } from './components/DatabaseStatusModal';
import { MarketingBanner } from './components/MarketingBanner';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TierFeatureGateModal } from './components/TierFeatureGateModal';
import { RestoreSubscriptionModal } from './components/RestoreSubscriptionModal';
import { Footer } from './components/Footer';
import { toggleFireplaceAudio } from './utils/audio';
import { trackEvent } from './utils/analytics';
import { testConnection } from './lib/firebase';
import { 
  getOrCreateLocalUserId, 
  syncUserProgressToDatabase, 
  checkFeatureAccess 
} from './lib/subscriptionService';

const STORAGE_KEY = 'christmas_reset_progress_2026';
const LANGUAGE_STORAGE_KEY = 'christmas_reset_lang_2026';

const DEFAULT_PROGRESS: UserProgress = {
  hasPurchased: false,
  selectedTier: 'free',
  isPreviewMode: false, // Default to false so tier restrictions & marketing strategy are immediately live and testable
  completedDays: [1], // Day 1 completed as welcoming demo
  unlockedDays: [1, 4], // Days 1 & 4 available on free tier
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
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage;
      if (saved && ['hu', 'en', 'de', 'ro', 'pl', 'cz', 'sk'].includes(saved)) {
        return saved;
      }
    } catch {
      // safe fallback
    }
    try {
      const navLang = navigator.language?.toLowerCase() || '';
      if (navLang.startsWith('hu')) return 'hu';
      if (navLang.startsWith('de')) return 'de';
      if (navLang.startsWith('ro')) return 'ro';
      if (navLang.startsWith('pl')) return 'pl';
      if (navLang.startsWith('cs') || navLang.startsWith('cz')) return 'cz';
      if (navLang.startsWith('sk')) return 'sk';
      if (navLang.startsWith('en')) return 'en';
    } catch {
      // safe fallback
    }
    return 'hu';
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(() => {
    try {
      const confirmed = localStorage.getItem('christmas_reset_lang_selected_2026');
      return !confirmed; // First visit: immediately show language selector!
    } catch {
      return true;
    }
  });

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      localStorage.setItem('christmas_reset_lang_selected_2026', 'true');
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
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState<boolean>(false);
  const [isFeatureGateModalOpen, setIsFeatureGateModalOpen] = useState<boolean>(false);
  const [isDatabaseStatusModalOpen, setIsDatabaseStatusModalOpen] = useState<boolean>(false);
  const [gateDetails, setGateDetails] = useState<{
    requiredTier: 'standard' | 'premium';
    title: string;
    subtitle?: string;
  }>({
    requiredTier: 'standard',
    title: 'Teljes Adventi Kalendárium',
  });

  const [selectedTier, setSelectedTier] = useState<PricingTier>('premium');
  const [selectedPrintableId, setSelectedPrintableId] = useState<string | null>(null);

  // Test Firestore database connectivity on startup as mandated by firebase-skill
  useEffect(() => {
    testConnection().then((connected) => {
      if (connected) {
        console.log('Firebase Firestore connection verified successfully.');
      }
    });
  }, []);

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

  const currentTier: PricingTier = userProgress.selectedTier || (userProgress.hasPurchased ? 'premium' : 'free');

  // Save on updates and sync to cloud database
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch {
      // storage error fallback
    }

    const localUid = getOrCreateLocalUserId();
    syncUserProgressToDatabase(localUid, userProgress);
  }, [userProgress]);

  // Audio ambient toggle
  const handleToggleAudio = () => {
    const isNowPlaying = toggleFireplaceAudio(0.3);
    setIsPlayingAudio(isNowPlaying);
    trackEvent('ambient_audio_toggle', { playing: isNowPlaying });
  };

  // Day Modal Handlers with Tier Gating
  const handleOpenDayModal = (day: DayData) => {
    const access = checkFeatureAccess('day', currentTier, day.id);
    if (!access.allowed && !userProgress.isPreviewMode) {
      setGateDetails({
        requiredTier: access.requiredTier,
        title: `${day.id}. Nap: ${day.title}`,
        subtitle: access.reason || 'A 24 napos teljes adventi naptár a Standard és Prémium csomagban érhető el.',
      });
      setIsFeatureGateModalOpen(true);
      return;
    }

    setSelectedDay(day);
    setIsDayModalOpen(true);
  };

  const handleCloseDayModal = () => {
    setIsDayModalOpen(false);
  };

  // Paywall opener for specific feature
  const handleOpenPaywallForFeature = (featureTitle?: string, subtitle?: string, reqTier: 'standard' | 'premium' = 'standard') => {
    setGateDetails({
      requiredTier: reqTier,
      title: featureTitle || (language === 'hu' ? 'Prémium Funkció Feloldása' : 'Unlock Premium Feature'),
      subtitle: subtitle || (language === 'hu' ? 'Azonnali végleges hozzáférés mind a 24 naphoz és a felhőbeli adatbázis-szinkronizációhoz.' : 'Permanent cloud access to all tools and planners.'),
    });
    setIsFeatureGateModalOpen(true);
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

  // Update Start Date
  const handleUpdateStartDate = (newStartDate: string) => {
    setUserProgress((prev) => ({
      ...prev,
      startDate: newStartDate,
    }));
  };

  // Pricing & Checkout
  const handleOpenCheckoutWithTier = (tier: PricingTier) => {
    setSelectedTier(tier === 'free' ? 'premium' : tier);
    setIsCheckoutModalOpen(true);
  };

  // Successful purchase unlock
  const handleSuccessUnlock = (purchasedTier: PricingTier, customerEmail: string) => {
    setUserProgress((prev) => ({
      ...prev,
      hasPurchased: true,
      selectedTier: purchasedTier,
      unlockedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    }));

    setIsCheckoutModalOpen(false);
    setIsFeatureGateModalOpen(false);
    setActiveTab('calendar');
  };

  // Quick switch tier for testing / reviewers
  const handleQuickSimulateTier = (tier: PricingTier) => {
    setUserProgress((prev) => ({
      ...prev,
      selectedTier: tier,
      hasPurchased: tier !== 'free',
      unlockedDays: tier === 'free' ? [1, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    }));
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
      {/* Marketing Urgency & Social Proof Toast Banner */}
      <MarketingBanner
        language={language}
        onOpenPricing={() => handleOpenCheckoutWithTier('premium')}
        hasPurchased={userProgress.hasPurchased && currentTier === 'premium'}
      />

      {/* Visual Snow Effect */}
      {isSnowing && <SnowEffect />}

      {/* Primary Navigation Bar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
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
        userTier={currentTier}
        onOpenRestoreModal={() => setIsRestoreModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-20 sm:pb-0">
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
            onNavigateCardStudio={() => {
              setActiveTab('ai-card');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onToggleChecklist={handleUpdateChecklist}
            onOpenRestoreModal={() => setIsRestoreModalOpen(true)}
          />
        )}

        {activeTab === 'calendar' && (
          <AdventCalendar
            language={language}
            days={currentAdventDays}
            userProgress={userProgress}
            onOpenDayModal={handleOpenDayModal}
            onTogglePreviewMode={handleTogglePreviewMode}
            onUpdateStartDate={handleUpdateStartDate}
            onBackToLanding={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPaywall={(day) => {
              if (day) {
                handleOpenPaywallForFeature(
                  `${day.id}. Nap: ${day.title}`,
                  language === 'hu' 
                    ? `Ez az adventi nap a Standard vagy Prémium csomag része. Nyisd fel a 24 napos utat!` 
                    : `This door is part of the Standard or Premium plan.`
                );
              } else {
                handleOpenPaywallForFeature();
              }
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
            onOpenPaywall={() => {
              handleOpenPaywallForFeature(
                language === 'hu' ? 'Karácsonyi Vészhelyzet Mód' : 'Emergency Mode Lifesaver',
                language === 'hu'
                  ? 'A 14, 7, 3 napos és szenteste mentőakció a Prémium csomag része.'
                  : 'Unlock the complete panic-free emergency roadmap.',
                'premium'
              );
            }}
          />
        )}

        {activeTab === 'ai-card' && (
          <ChristmasCardStudio
            language={language}
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
            userTier={currentTier}
            isPreviewMode={userProgress.isPreviewMode}
            onOpenPaywall={() => {
              handleOpenPaywallForFeature(
                language === 'hu' ? 'Prémium Nyomtatható Munkalapok' : 'Premium Printables Suite',
                language === 'hu'
                  ? 'A teljes 9 kötetes, nagy felbontású PDF munkalap-kollekció a Prémium csomag része.'
                  : 'Get all 9 high-res PDF planners and family games.',
                'premium'
              );
            }}
          />
        )}
      </main>
      
      {/* Mobile Fixed Bottom Navigation Bar for natural thumb navigation */}
      <MobileBottomNav
        language={language}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPricing={() => handleOpenCheckoutWithTier('premium')}
        userTier={currentTier}
      />

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

      {/* Feature Gating Paywall Modal */}
      <TierFeatureGateModal
        isOpen={isFeatureGateModalOpen}
        onClose={() => setIsFeatureGateModalOpen(false)}
        requiredTier={gateDetails.requiredTier}
        featureTitle={gateDetails.title}
        featureSubtitle={gateDetails.subtitle}
        language={language}
        onSelectTier={(tier) => {
          setIsFeatureGateModalOpen(false);
          handleOpenCheckoutWithTier(tier);
        }}
        onOpenRestoreModal={() => {
          setIsFeatureGateModalOpen(false);
          setIsRestoreModalOpen(true);
        }}
      />

      {/* Database Purchase Restore Modal */}
      <RestoreSubscriptionModal
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
        language={language}
        onSuccessRestore={(restoredTier) => {
          setUserProgress((prev) => ({
            ...prev,
            hasPurchased: true,
            selectedTier: restoredTier,
            unlockedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          }));
        }}
        onQuickSimulateTier={handleQuickSimulateTier}
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

      {/* Multinational Entry & Global Language Selection Modal */}
      <LanguageSelectionModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={language}
        onSelectLanguage={handleLanguageChange}
        isFirstVisit={!Boolean(localStorage.getItem('christmas_reset_lang_selected_2026'))}
      />

      {/* Footer */}
      <Footer
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        onOpenDatabaseStatus={() => setIsDatabaseStatusModalOpen(true)}
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
          const el = document.getElementById('pricing-section') || document.getElementById('planuri-acces');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else handleOpenCheckoutWithTier('standard');
        }}
      />

      {/* Supabase Database Status & Live Test Modal */}
      <DatabaseStatusModal
        isOpen={isDatabaseStatusModalOpen}
        onClose={() => setIsDatabaseStatusModalOpen(false)}
        language={language}
      />
    </div>
  );
}
