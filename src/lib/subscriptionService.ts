import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { 
  saveSubscriptionToSupabase, 
  syncUserProgressToSupabase, 
  restoreSubscriptionFromSupabase 
} from './supabase';
import { PricingTier, UserProgress } from '../types';

export interface SubscriptionRecord {
  id: string;
  userId: string;
  email: string;
  customerName: string;
  tier: 'standard' | 'premium';
  amount: number;
  currency: string;
  isGift: boolean;
  giftRecipientEmail?: string;
  status: 'active' | 'completed';
  createdAt: string;
}

export interface UserSubscriptionProfile {
  userId: string;
  email: string;
  firstName?: string;
  tier: PricingTier;
  hasPurchased: boolean;
  purchasedAt?: string;
  progressData?: string;
  updatedAt?: string;
}

// Check feature access by tier
export function checkFeatureAccess(
  feature: 'day' | 'budget' | 'gifts' | 'emergency' | 'ai-card' | 'gift-helper' | 'printables-basic' | 'printables-full',
  tier: PricingTier = 'free',
  dayId?: number
): { allowed: boolean; requiredTier: 'standard' | 'premium'; reason?: string } {
  // Premium has access to everything
  if (tier === 'premium') {
    return { allowed: true, requiredTier: 'premium' };
  }

  // Standard has access to all days, budget, gifts, basic printables
  if (tier === 'standard') {
    if (feature === 'emergency') {
      return { allowed: false, requiredTier: 'premium', reason: 'A teljes Vészhelyzet Mód a Prémium csomag része.' };
    }
    if (feature === 'ai-card') {
      return { allowed: false, requiredTier: 'premium', reason: 'A korlátlan AI Képeslap Studio a Prémium csomag része.' };
    }
    if (feature === 'printables-full') {
      return { allowed: false, requiredTier: 'premium', reason: 'A prémium nyomtatható sabloncsomag a Prémium csomag része.' };
    }
    return { allowed: true, requiredTier: 'standard' };
  }

  // Free tier constraints
  if (feature === 'day') {
    // Only Day 1 and Day 4 are freely unlocked as demo
    if (dayId === 1 || dayId === 4) {
      return { allowed: true, requiredTier: 'standard' };
    }
    return { 
      allowed: false, 
      requiredTier: 'standard', 
      reason: `A(z) ${dayId}. nap a Standard vagy Prémium csomag megvásárlásával érhető el.` 
    };
  }

  if (feature === 'budget' || feature === 'gifts') {
    return { allowed: true, requiredTier: 'standard' }; // Teaser preview
  }

  if (feature === 'printables-basic') {
    return { allowed: true, requiredTier: 'standard' };
  }

  return { 
    allowed: false, 
    requiredTier: 'standard', 
    reason: 'Ez a funkció előfizetéssel vagy egyszeri végleges vásárlással érhető el.' 
  };
}

// Generate persistent unique local ID for unauthenticated visitors
export function getOrCreateLocalUserId(): string {
  const KEY = 'christmas_reset_uid_2026';
  let uid = localStorage.getItem(KEY);
  if (!uid) {
    uid = 'usr_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
    localStorage.setItem(KEY, uid);
  }
  return uid;
}

// Save a real purchase / subscription to Firestore
export async function saveSubscriptionToDatabase(details: {
  userId: string;
  email: string;
  customerName: string;
  tier: 'standard' | 'premium';
  amount: number;
  currency: string;
  isGift?: boolean;
  giftRecipientEmail?: string;
}): Promise<SubscriptionRecord> {
  const subscriptionId = 'sub_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  const record: SubscriptionRecord = {
    id: subscriptionId,
    userId: details.userId,
    email: details.email.trim().toLowerCase(),
    customerName: details.customerName,
    tier: details.tier,
    amount: details.amount,
    currency: details.currency || 'EUR',
    isGift: Boolean(details.isGift),
    giftRecipientEmail: details.giftRecipientEmail ? details.giftRecipientEmail.trim().toLowerCase() : '',
    status: 'active',
    createdAt: now,
  };

  const subDocPath = `subscriptions/${subscriptionId}`;
  try {
    await setDoc(doc(db, 'subscriptions', subscriptionId), record);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, subDocPath);
  }

  // Update user profile in Firestore
  const userDocPath = `users/${details.userId}`;
  try {
    const userProfile: UserSubscriptionProfile = {
      userId: details.userId,
      email: details.email.trim().toLowerCase(),
      firstName: details.customerName,
      tier: details.tier,
      hasPurchased: true,
      purchasedAt: now,
      updatedAt: now,
    };
    await setDoc(doc(db, 'users', details.userId), userProfile, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userDocPath);
  }

  // Also persist simultaneously into Supabase database
  try {
    saveSubscriptionToSupabase({
      userId: details.userId,
      email: details.email,
      customerName: details.customerName,
      tier: details.tier,
      amount: details.amount,
      currency: details.currency || 'EUR',
      isGift: Boolean(details.isGift),
      giftRecipientEmail: details.giftRecipientEmail,
    }).catch((e) => console.info('Supabase sync note:', e));
  } catch {
    // Non-blocking fallback
  }

  return record;
}

// Restore subscription by email from Firestore database and Supabase
export async function restoreSubscriptionByEmail(email: string): Promise<UserSubscriptionProfile | null> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return null;

  try {
    const q = query(collection(db, 'subscriptions'), where('email', '==', cleanEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Find highest tier subscription in Firestore
      let highestTier: PricingTier = 'standard';
      let purchasedAt = '';
      let customerName = '';

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as SubscriptionRecord;
        if (data.tier === 'premium') {
          highestTier = 'premium';
        }
        if (!purchasedAt || data.createdAt > purchasedAt) {
          purchasedAt = data.createdAt;
        }
        if (data.customerName) {
          customerName = data.customerName;
        }
      });

      const localUid = getOrCreateLocalUserId();
      const profile: UserSubscriptionProfile = {
        userId: localUid,
        email: cleanEmail,
        firstName: customerName,
        tier: highestTier,
        hasPurchased: true,
        purchasedAt,
        updatedAt: new Date().toISOString(),
      };

      // Save linked locally and in Firestore users doc
      await setDoc(doc(db, 'users', localUid), profile, { merge: true });
      return profile;
    }

    // Check Supabase database if not found in Firestore
    const supabaseTier = await restoreSubscriptionFromSupabase(cleanEmail);
    if (supabaseTier) {
      const localUid = getOrCreateLocalUserId();
      const profile: UserSubscriptionProfile = {
        userId: localUid,
        email: cleanEmail,
        firstName: 'Kedves Előfizetőnk',
        tier: supabaseTier,
        hasPurchased: true,
        purchasedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', localUid), profile, { merge: true });
      return profile;
    }

    return null;
  } catch (error) {
    console.error('Failed to lookup subscription by email:', error);
    // As safety fallback, try Supabase directly
    try {
      const supabaseTier = await restoreSubscriptionFromSupabase(cleanEmail);
      if (supabaseTier) {
        const localUid = getOrCreateLocalUserId();
        return {
          userId: localUid,
          email: cleanEmail,
          firstName: 'Kedves Előfizetőnk',
          tier: supabaseTier,
          hasPurchased: true,
          purchasedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
    } catch {
      // ignore
    }
    return null;
  }
}

// Sync user progress with Firestore & Supabase
export async function syncUserProgressToDatabase(userId: string, progress: UserProgress, email?: string): Promise<void> {
  if (!userId) return;

  const userDocPath = `users/${userId}`;
  try {
    const payload: Partial<UserSubscriptionProfile> = {
      userId,
      tier: progress.selectedTier || (progress.hasPurchased ? 'premium' : 'free'),
      hasPurchased: progress.hasPurchased,
      progressData: JSON.stringify({
        completedDays: progress.completedDays,
        budgetData: progress.budgetData,
        giftList: progress.giftList,
        checklistStates: progress.checklistStates,
        userNotes: progress.userNotes,
        emergencyCompletedTasks: progress.emergencyCompletedTasks,
      }),
      updatedAt: new Date().toISOString(),
    };

    if (email) {
      payload.email = email.trim().toLowerCase();
    }

    await setDoc(doc(db, 'users', userId), payload, { merge: true });

    // Also sync to Supabase
    syncUserProgressToSupabase(userId, progress).catch(() => {});
  } catch (error) {
    // Non-fatal sync error
    console.warn('Progress sync failed:', error);
  }
}
