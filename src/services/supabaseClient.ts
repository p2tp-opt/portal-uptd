// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://smbmebkindtrqbhnygti.supabase.co';

// Kunci anon publik Supabase (Aman disematkan di frontend untuk akses publik RLS)
export const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtYm1lYmtpbmR0cnFiaG55Z3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNTY5NjEsImV4cCI6MjEwOTgzMjk2MX0.Y5OacSaDZrOyB4YMpovOZdCesbr96IzvFFmoYafw_Fg';

// Instance Supabase Client
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
