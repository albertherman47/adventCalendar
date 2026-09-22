import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, ArrowRight, Check, Lock } from 'lucide-react';
import { SupportedLanguage, DayData, PhaseId } from '../types';
import { getTranslations } from '../data/translations';

interface WhatsInsideProps {
  language: SupportedLanguage;
  days: DayData[];
  onSelectDay: (day: DayData) => void;
  onGoToFullCalendar: () => void;
}

export const WhatsInside: React.FC<WhatsInsideProps> = ({
  language,
  days,
  onSelectDay,
  onGoToFullCalendar,
}) => {
  const t = getTranslations(language);
  const [selectedPhase, setSelectedPhase] = useState<PhaseId | 0>(0);

  const filteredDays = selectedPhase === 0
    ? days
    : days.filter(d => d.phase === selectedPhase);

  return (
    <section id="phases-section" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE3D5] text-xs text-[#7E2232] font-medium mb-4">
            <Sparkles className="w-3 h-3 text-[#C29B48]" />
            <span>Structură gândită pas cu pas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2C0B12] mb-4">
            {t.phasesSection.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#6B645B]">
            {t.phasesSection.subheading}
          </p>
        </div>

        {/* The 4 Phase Cards summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {t.phasesSection.phases.map((phase) => {
            const isSelected = selectedPhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(isSelected ? 0 : (phase.id as PhaseId))}
                className={`p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#621927] text-white border-[#621927] shadow-md -translate-y-0.5'
                    : 'bg-white hover:bg-[#FDFBF7] text-[#2C0B12] border-[#EAE3D5] hover:border-[#C29B48]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-[#D8B76E]' : 'bg-[#F1E9DB] text-[#7E7468]'
                  }`}>
                    {phase.dateRange}
                  </span>
                  <span className={`text-xs font-serif italic ${isSelected ? 'text-[#D8B76E]' : 'text-[#A8A096]'}`}>
                    6 zile
                  </span>
                </div>
                <h3 className={`font-serif text-lg font-semibold mb-2 ${isSelected ? 'text-white' : 'text-[#2C0B12]'}`}>
                  {phase.name}
                </h3>
                <p className={`text-xs leading-relaxed ${isSelected ? 'text-[#FAF7F2]/90' : 'text-[#5E574D]'}`}>
                  {phase.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Filter Indicator */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE3D5]">
          <div className="text-sm font-medium text-[#4A453E]">
            {selectedPhase === 0
              ? "Toate cele 24 de zile interactive:"
              : `Afișate zilele din ${t.phasesSection.phases.find(p => p.id === selectedPhase)?.name}:`}
          </div>
          {selectedPhase !== 0 && (
            <button
              onClick={() => setSelectedPhase(0)}
              className="text-xs text-[#621927] hover:underline font-semibold"
            >
              Arată toate cele 24 de zile
            </button>
          )}
        </div>

        {/* Visual Cards Grid for the 24 days */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDays.map((day) => (
            <div
              key={day.id}
              onClick={() => onSelectDay(day)}
              className="group bg-white hover:bg-[#FDFBF7] rounded-xl p-5 border border-[#EAE3D5] hover:border-[#C29B48] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold text-[#621927] group-hover:text-[#2C0B12] transition-colors">
                      {day.id}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[#7E7468] tracking-widest">
                      Decembrie
                    </span>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#7E7468] border border-[#EAE3D5]">
                    {day.category}
                  </span>
                </div>

                <h4 className="font-serif text-lg font-semibold text-[#2C0B12] group-hover:text-[#621927] transition-colors mb-2">
                  {day.title}
                </h4>

                <p className="text-xs text-[#5E574D] leading-relaxed line-clamp-2 mb-4">
                  {day.shortIntro}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1E9DB] flex items-center justify-between text-xs text-[#7E7468]">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#2E5844]" />
                  {day.timeEstimate}
                </span>
                <span className="text-[#621927] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explorează</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action button to switch directly to calendar view */}
        <div className="mt-12 text-center">
          <button
            onClick={onGoToFullCalendar}
            className="inline-flex items-center gap-2 bg-[#2E5844] hover:bg-[#172F24] text-white px-7 py-3.5 rounded-xl font-medium text-sm tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#D8B76E]" />
            <span>Deschide Calendarul Complet de Advent</span>
          </button>
        </div>
      </div>
    </section>
  );
};
