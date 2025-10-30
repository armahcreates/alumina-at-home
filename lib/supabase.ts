import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for the profile table
export interface Profile {
  id: string;
  email: string;
  name: string;
  goals: string[];
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  available_time: number;
  health_conditions: string[];
  budget: 'essential' | 'intermediate' | 'premium';
  created_at?: string;
  updated_at?: string;
}

// Helper function to upsert profile (insert or update)
export async function upsertProfile(userId: string, profileData: Partial<Profile>) {
  try {
    // First, try to get the existing profile
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // If profile doesn't exist, insert it
    if (!existingProfile) {
      const { data, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      return { data, error: null };
    }

    // If profile exists, update it
    const { data, error: updateError } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error upserting profile:', error);
    return { data: null, error };
  }
}

// Helper function to get profile
export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { data: null, error };
  }
}