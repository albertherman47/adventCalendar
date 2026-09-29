import { PricingTier, UserProgress } from '../types';
import { supabase } from './supabase';
export type { PricingTier } from '../types';

export interface AccountEntitlement {
  userId: string;
  tier: PricingTier;
}

// Feature gates are UX only. The database policies and any future paid API
// endpoints must independently enforce the user's entitlement.
export function checkFeatureAccess(
  feature: 'day' | 'budget' | 'gifts' | 'emergency' | 'ai-card' | 'gift-helper' | 'printables-basic' | 'printables-full',
  tier: PricingTier = 'free',
  dayId?: number,
): { allowed: boolean; requiredTier: 'standard' | 'premium'; reason?: string } {
  if (tier === 'premium') return { allowed: true, requiredTier: 'premium' };
  if (tier === 'standard') {
    if (['emergency', 'ai-card', 'printables-full'].includes(feature)) {
      return { allowed: false, requiredTier: 'premium', reason: 'Ez a funkció a Prémium csomag része.' };
    }
    return { allowed: true, requiredTier: 'standard' };
  }
  if (feature === 'day' && (dayId === 1 || dayId === 4)) return { allowed: true, requiredTier: 'standard' };
  if (feature === 'budget' || feature === 'gifts' || feature === 'printables-basic') {
    return { allowed: true, requiredTier: 'standard' };
  }
  return { allowed: false, requiredTier: 'standard', reason: 'Ez a funkció Standard vagy Prémium csomaggal érhető el.' };
}

export async function loadAccountEntitlement(userId: string): Promise<AccountEntitlement> {
  const { data, error } = await supabase
    .from('account_entitlements')
    .select('tier')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  const tier = data?.tier;
  return { userId, tier: tier === 'standard' || tier === 'premium' ? tier : 'free' };
}

export async function loadUserProgress(userId: string): Promise<Partial<UserProgress> | null> {
  const { data, error } = await supabase
    .from('account_progress')
    .select('progress')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return (data?.progress as Partial<UserProgress> | undefined) ?? null;
}

export async function saveUserProgress(userId: string, progress: UserProgress): Promise<void> {
  const { error } = await supabase.from('account_progress').upsert({
    user_id: userId,
    progress,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) throw error;
}

// The app intentionally has no client-side API for granting a paid tier.
// Entitlements are written by a trusted operator or a verified payment webhook.
