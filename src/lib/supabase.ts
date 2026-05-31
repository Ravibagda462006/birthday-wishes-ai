import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Wish = {
  id: string;
  recipient_name: string;
  relationship: 'crush' | 'girlfriend';
  wish_type: 'romantic' | 'cute' | 'emotional' | 'flirty' | 'poetic';
  wish_content: string;
  created_at: string;
};

export type LoveLetter = {
  id: string;
  recipient_name: string;
  relationship: 'crush' | 'girlfriend';
  letter_type: 'short' | 'long' | 'good_morning';
  letter_content: string;
  created_at: string;
};
