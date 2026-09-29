import { createClient } from '@supabase/supabase-js';

// These values are publishable client configuration, not secret credentials.
// Override them per deployment with the Vite environment variables.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://clapfpjmglvlyyoklnpe.supabase.co';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  || import.meta.env.VITE_SUPABASE_ANON_KEY
  || 'sb_publishable_CZDZq1S9h8RSKVM6Vcq1FA_lD-qXjjA';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
