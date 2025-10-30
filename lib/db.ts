import { neon } from '@neondatabase/serverless';

// Neon database connection
const databaseUrl = process.env.DATABASE_URL || '';

if (!databaseUrl) {
  console.warn('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);

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
    const existingProfile = await sql`
      SELECT * FROM profiles WHERE id = ${userId}
    `;

    const now = new Date().toISOString();

    // If profile doesn't exist, insert it
    if (existingProfile.length === 0) {
      const result = await sql`
        INSERT INTO profiles (
          id,
          email,
          name,
          goals,
          experience_level,
          available_time,
          health_conditions,
          budget,
          created_at,
          updated_at
        ) VALUES (
          ${userId},
          ${profileData.email || ''},
          ${profileData.name || ''},
          ${profileData.goals || []},
          ${profileData.experience_level || 'beginner'},
          ${profileData.available_time || 0},
          ${profileData.health_conditions || []},
          ${profileData.budget || 'essential'},
          ${now},
          ${now}
        )
        RETURNING *
      `;

      return { data: result[0], error: null };
    }

    // If profile exists, update it
    const result = await sql`
      UPDATE profiles
      SET
        email = COALESCE(${profileData.email}, email),
        name = COALESCE(${profileData.name}, name),
        goals = COALESCE(${profileData.goals}, goals),
        experience_level = COALESCE(${profileData.experience_level}, experience_level),
        available_time = COALESCE(${profileData.available_time}, available_time),
        health_conditions = COALESCE(${profileData.health_conditions}, health_conditions),
        budget = COALESCE(${profileData.budget}, budget),
        updated_at = ${now}
      WHERE id = ${userId}
      RETURNING *
    `;

    return { data: result[0], error: null };
  } catch (error) {
    console.error('Error upserting profile:', error);
    return { data: null, error };
  }
}

// Helper function to get profile
export async function getProfile(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM profiles WHERE id = ${userId}
    `;

    if (result.length === 0) {
      return { data: null, error: null };
    }

    return { data: result[0] as Profile, error: null };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { data: null, error };
  }
}

