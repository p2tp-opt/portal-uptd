// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://smbmebkindtrqbhnygti.supabase.co';

export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Instance Supabase Client
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
