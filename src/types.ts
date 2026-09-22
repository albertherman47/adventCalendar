export type PhaseId = 1 | 2 | 3 | 4;

export type ToolType = 
  | 'budget' 
  | 'gifts' 
  | 'planner' 
  | 'checklist' 
  | 'gift-ideas' 
  | 'challenge' 
  | 'cards' 
  | 'playlist' 
  | 'diy' 
  | 'game' 
  | 'movie' 
  | 'photo' 
  | 'reflection'
  | 'recipe'
  | 'resource';

export interface PrintableResource {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  downloadFilename: string;
  previewUrl?: string;
  includedInTiers: ('basic' | 'premium' | 'family')[];
}

export interface DayData {
  id: number;
  title: string;
  phase: PhaseId;
  phaseName: string;
  category: string;
  shortIntro: string;
  timeEstimate: string;
  iconName: string;
  toolType: ToolType;
  content: {
    headline: string;
    description: string;
    ritualTip?: string;
    actionSteps: string[];
    reflectionQuestion?: string;
  };
  printableResource?: PrintableResource;
}

export interface BudgetItem {
  category: string;
  label: string;
  allocated: number;
  spent?: number;
  actual?: number;
  notes?: string;
}

export interface BudgetData {
  totalBudget: number;
  items: BudgetItem[];
}

export interface GiftItem {
  id: string;
  recipient: string;
  category: 'partner' | 'parent' | 'friend' | 'colleague' | 'child' | 'other';
  idea: string;
  budget: number;
  purchased: boolean;
  wrapped: boolean;
  notes?: string;
}

export interface PlannerEvent {
  id: string;
  day: number; // 1 to 25 December
  title: string;
  time?: string;
  type: 'shopping' | 'social' | 'cooking' | 'relaxation' | 'prep';
  completed: boolean;
}

export type PricingTier = 'free' | 'standard' | 'premium' | 'basic' | 'family';

export interface EmergencyTask {
  id: string;
  title: string;
  category: 'gifts' | 'food' | 'home' | 'cards' | 'eve' | 'mindset';
  completed: boolean;
  priority: 'high' | 'urgent' | 'essential';
  suggestedDayId?: number;
}

export type EmergencyTimeframe = '30-days' | '14-days' | '7-days' | '3-days' | 'tomorrow';

export interface UserProgress {
  completedDays: number[];
  unlockedDays: number[];
  isPreviewMode: boolean;
  hasPurchased: boolean;
  selectedTier?: PricingTier;
  budgetData: BudgetData;
  giftList: GiftItem[];
  plannerEvents?: PlannerEvent[];
  checklistStates: Record<string, boolean>;
  userNotes: Record<number, string>;
  emergencyCompletedTasks?: Record<string, boolean>;
  activeTab?: 'landing' | 'calendar' | 'downloads' | 'printables' | 'emergency' | 'gift-helper';
}

export type SupportedLanguage = 'ro' | 'hu' | 'pl' | 'cz' | 'sk' | 'hr' | 'en';

export interface Milestone {
  days: number;
  message: string;
  badge: string;
}
