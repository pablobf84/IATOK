import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Initialize Supabase client using environment variables or Expo config extras.
const supabaseUrl = (Constants.expoConfig?.extra as any)?.SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = (Constants.expoConfig?.extra as any)?.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

// Export the configured Supabase client. This client can be used throughout the app for
// authentication, database queries and storage interactions. Ensure that the environment
// variables SUPABASE_URL and SUPABASE_ANON_KEY are defined in your .env or expo config.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);