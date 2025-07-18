import { createClient } from "@supabase/supabase-js";

// Supabase configuration from environment variables
const supabaseUrl: string | undefined = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey: string | undefined =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file.",
  );
}

// At this point, supabaseUrl and supabaseAnonKey are guaranteed to be non-null
const validatedSupabaseUrl = supabaseUrl!;
const validatedSupabaseAnonKey = supabaseAnonKey!;

// Create and export the Supabase client
export const supabase = createClient(
  validatedSupabaseUrl,
  validatedSupabaseAnonKey,
);

// Database types matching the schema
export interface User {
  id: string;
  name: string;
  date_of_birth: string | null;
  email: string | null;
  phone_number: string | null;
  is_parent: boolean;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  duration_minutes: number;
  breaks_taken: number;
  hints_given: number;
  distractions: number;
  points_earned: number;
  ended_early: boolean;
  created_at: string;
}

export interface Points {
  id: string;
  user_id: string;
  total_points: number;
  last_updated: string;
}

export interface Reward {
  id: string;
  user_id: string;
  reward_description: string;
  points_spent: number;
  redeemed_at: string;
}

export interface Settings {
  user_id: string;
  notifications_enabled: boolean;
  dark_mode_enabled: boolean;
}
