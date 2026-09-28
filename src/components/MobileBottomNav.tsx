import React from 'react';
import { Calendar, AlertTriangle, FileText, Sparkles, Home, CreditCard } from 'lucide-react';
import { SupportedLanguage, PricingTier } from '../types';
import { NavTab } from './Navbar';

interface MobileBottomNavProps {
  language: SupportedLanguage;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenPricing: () => void;
  userTier?: PricingTier;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  language,
  activeTab,
  onTabChange,
  onOpenPricing,
  userTier = 'free',
}) => {
  const isHu = language === 'hu';
  const isDe = language === 'de';

  const items = [
    {
      id: 'landing' as NavTab,
      label: isHu ? 'Főoldal' : isDe ? 'Start' : 'Home',
      icon: Home,
      action: () => onTabChange('landing'),
      isActive: activeTab === 'landing',
    },
    {
      id: 'calendar' as NavTab,
      label: isHu ? 'Naptár' : isDe ? 'Kalender' : 'Calendar',
      icon: Calendar,
      action: () => onTabChange('calendar'),
      isActive: activeTab === 'calendar',
    },
    {
      id: 'emergency' as NavTab,
      label: isHu ? 'Vészhelyzet' : isDe ? 'Notfall' : 'Emergency',
      icon: AlertTriangle,
      action: () => onTabChange('emergency'),
      isActive: activeTab === 'emergency',
      badge: isHu ? 'Új' : 'New',
    },
    {
      id: 'printables' as NavTab,
      label: isHu ? 'Anyagok' : isDe ? 'Vorlagen' : 'Printables',
      icon: FileText,
      action: () => onTabChange('printables'),
      isActive: activeTab === 'printables' || activeTab === 'downloads',
    },
    {
      id: 'pricing' as NavTab,
      label: userTier === 'premium' ? (isHu ? 'Prémium' : 'Premium') : (isHu ? 'Csomagok' : 'Pricing'),
      icon: userTier === 'premium' ? Sparkles : CreditCard,
      action: onOpenPricing,
      isActive: false,
      highlight: userTier !== 'premium',
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE3D5] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom no-print"
    >
      <div className="grid grid-cols-5 items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative cursor-pointer min-h-[44px] ${
                active 
                  ? 'text-[#621927]' 
                  : item.highlight 
                  ? 'text-[#C29B48] font-bold' 
                  : 'text-[#7E7468] hover:text-[#2C0B12]'
              }`}
            >
              {item.badge && (
                <span className="absolute top-0 right-2 px-1 py-0.2 rounded-full bg-[#621927] text-white text-[8px] font-bold leading-tight uppercase">
                  {item.badge}
                </span>
              )}

              <div className={`p-1 rounded-lg transition-transform ${active ? 'bg-[#FAF7F2] scale-110' : ''}`}>
                <Icon className={`w-4 h-4 ${active ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              </div>

              <span className={`text-[10px] leading-tight mt-0.5 truncate max-w-full ${active ? 'font-bold text-[#621927]' : 'font-medium'}`}>
                {item.label}
              </span>

              {active && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C29B48] absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
