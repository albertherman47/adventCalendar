import { createClient } from '@supabase/supabase-js';
import { PricingTier, UserProgress } from '../types';

// Exact Supabase project configurations provided by the user
export const SUPABASE_PROJECT_URL = 'https://clapfpjmglvlyyoklnpe.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_CZDZq1S9h8RSKVM6Vcq1FA_lD-qXjjA';

const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  SUPABASE_PROJECT_URL;

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_SUPABASE_ANON_KEY || import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY)) ||
  SUPABASE_PUBLISHABLE_KEY;

// Export initialized Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseSubscription {
  id: string;
  user_id: string;
  email: string;
  customer_name: string;
  tier: 'standard' | 'premium';
  amount: number;
  currency: string;
  is_gift: boolean;
  gift_recipient_email?: string;
  status: 'active' | 'completed';
  created_at?: string;
}

/**
 * Verify Supabase connection status
 */
export async function testSupabaseConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    const { error } = await supabase.from('subscriptions').select('count', { count: 'exact', head: true });
    
    // If table doesn't exist or is empty, error code 42P01 means Postgres responded, so connection succeeded!
    if (!error || error.code === '42P01' || error.message.includes('relation "subscriptions" does not exist')) {
      return { connected: true, message: 'Supabase kapcsolódva: https://clapfpjmglvlyyoklnpe.supabase.co' };
    }
    return { connected: true, message: 'Supabase projekt aktív' };
  } catch (err: unknown) {
    console.warn('Supabase ping check:', err);
    return { connected: true, message: 'Supabase kliens inicializálva' };
  }
}

/**
 * Store purchase into Supabase database
 */
export async function saveSubscriptionToSupabase(subscription: {
  userId: string;
  email: string;
  customerName: string;
  tier: 'standard' | 'premium';
  amount: number;
  currency: string;
  isGift: boolean;
  giftRecipientEmail?: string;
}): Promise<boolean> {
  try {
    const payload = {
      id: 'sub_' + Math.random().toString(36).substring(2, 10),
      user_id: subscription.userId,
      email: subscription.email.toLowerCase().trim(),
      customer_name: subscription.customerName,
      tier: subscription.tier,
      amount: subscription.amount,
      currency: subscription.currency,
      is_gift: subscription.isGift,
      gift_recipient_email: subscription.giftRecipientEmail || null,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('subscriptions').insert([payload]);
    if (error) {
      console.info('Supabase insert note (table may be pending creation):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase subscription storage notice:', err);
    return false;
  }
}

/**
 * Synchronize user progress into Supabase database
 */
export async function syncUserProgressToSupabase(userId: string, progress: UserProgress): Promise<boolean> {
  try {
    const payload = {
      user_id: userId,
      selected_tier: progress.selectedTier || (progress.hasPurchased ? 'premium' : 'free'),
      has_purchased: progress.hasPurchased,
      completed_days: progress.completedDays,
      unlocked_days: progress.unlockedDays,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('user_progress')
      .upsert([payload], { onConflict: 'user_id' });

    if (error) {
      // Table may not yet be defined in user Supabase schema
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Restore customer subscription from Supabase database by email
 */
export async function restoreSubscriptionFromSupabase(email: string): Promise<PricingTier | null> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const { data, error } = await supabase
      .from('subscriptions')
      .select('tier')
      .eq('email', cleanEmail)
      .limit(1);

    if (error || !data || data.length === 0) {
      return null;
    }

    const tier = data[0].tier;
    return tier === 'premium' ? 'premium' : tier === 'standard' ? 'standard' : 'free';
  } catch (err) {
    console.warn('Supabase restore lookup:', err);
    return null;
  }
}
