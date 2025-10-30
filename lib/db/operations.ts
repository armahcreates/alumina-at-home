import { eq, and, desc, sql } from 'drizzle-orm';
import { db } from './index';
import * as schema from './schema';
import type { NewUser, NewUserProfile, NewDailyMetric, NewCompletedTask, NewAchievement, NewSupplementTracking, NewProtocolTimer, NewUserEquipment, NewVideoProgress } from './schema';

// ============================================================================
// USER OPERATIONS
// ============================================================================

export async function createUser(userData: NewUser) {
  try {
    const [user] = await db
      .insert(schema.users)
      .values(userData)
      .onConflictDoUpdate({
        target: schema.users.id,
        set: { lastLoginAt: sql`CURRENT_TIMESTAMP` }
      })
      .returning();
    return { data: user, error: null };
  } catch (error) {
    console.error('Error creating user:', error);
    return { data: null, error };
  }
}

export async function getUser(userId: string) {
  try {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId));
    return { data: user || null, error: null };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { data: null, error };
  }
}

export async function updateUserOnboarding(userId: string, completed: boolean) {
  try {
    const [user] = await db
      .update(schema.users)
      .set({ hasCompletedOnboarding: completed })
      .where(eq(schema.users.id, userId))
      .returning();
    return { data: user, error: null };
  } catch (error) {
    console.error('Error updating user onboarding:', error);
    return { data: null, error };
  }
}

// ============================================================================
// USER PROFILE OPERATIONS
// ============================================================================

export async function upsertUserProfile(userId: string, profileData: Omit<NewUserProfile, 'userId'>) {
  try {
    const [profile] = await db
      .insert(schema.userProfiles)
      .values({ userId, ...profileData })
      .onConflictDoUpdate({
        target: schema.userProfiles.userId,
        set: {
          ...profileData,
          updatedAt: sql`CURRENT_TIMESTAMP`
        }
      })
      .returning();
    return { data: profile, error: null };
  } catch (error) {
    console.error('Error upserting user profile:', error);
    return { data: null, error };
  }
}

export async function getUserProfile(userId: string) {
  try {
    const [profile] = await db
      .select()
      .from(schema.userProfiles)
      .where(eq(schema.userProfiles.userId, userId));
    return { data: profile || null, error: null };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { data: null, error };
  }
}

// ============================================================================
// USER STATS OPERATIONS (Gamification)
// ============================================================================

export async function getUserStats(userId: string) {
  try {
    let [stats] = await db
      .select()
      .from(schema.userStats)
      .where(eq(schema.userStats.userId, userId));

    // Initialize stats if they don't exist
    if (!stats) {
      [stats] = await db
        .insert(schema.userStats)
        .values({ userId })
        .returning();
    }

    return { data: stats, error: null };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return { data: null, error };
  }
}

export async function updateUserStats(userId: string, statsData: Partial<Omit<schema.UserStats, 'userId'>>) {
  try {
    const [stats] = await db
      .insert(schema.userStats)
      .values({ userId, ...statsData })
      .onConflictDoUpdate({
        target: schema.userStats.userId,
        set: {
          ...statsData,
          updatedAt: sql`CURRENT_TIMESTAMP`
        }
      })
      .returning();
    return { data: stats, error: null };
  } catch (error) {
    console.error('Error updating user stats:', error);
    return { data: null, error };
  }
}

export async function incrementStreak(userId: string) {
  try {
    const [stats] = await db
      .insert(schema.userStats)
      .values({ userId, currentStreak: 1, longestStreak: 1, lastActivityDate: sql`CURRENT_DATE` })
      .onConflictDoUpdate({
        target: schema.userStats.userId,
        set: {
          currentStreak: sql`${schema.userStats.currentStreak} + 1`,
          longestStreak: sql`GREATEST(${schema.userStats.longestStreak}, ${schema.userStats.currentStreak} + 1)`,
          lastActivityDate: sql`CURRENT_DATE`,
          updatedAt: sql`CURRENT_TIMESTAMP`
        }
      })
      .returning();
    return { data: stats, error: null };
  } catch (error) {
    console.error('Error incrementing streak:', error);
    return { data: null, error };
  }
}

export async function addPoints(userId: string, points: number) {
  try {
    const [stats] = await db
      .insert(schema.userStats)
      .values({ userId, totalPoints: points })
      .onConflictDoUpdate({
        target: schema.userStats.userId,
        set: {
          totalPoints: sql`${schema.userStats.totalPoints} + ${points}`,
          updatedAt: sql`CURRENT_TIMESTAMP`
        }
      })
      .returning();
    return { data: stats, error: null };
  } catch (error) {
    console.error('Error adding points:', error);
    return { data: null, error };
  }
}

// ============================================================================
// DAILY METRICS OPERATIONS
// ============================================================================

export async function addDailyMetric(metric: NewDailyMetric) {
  try {
    const [result] = await db
      .insert(schema.dailyMetrics)
      .values(metric)
      .onConflictDoUpdate({
        target: [schema.dailyMetrics.userId, schema.dailyMetrics.date],
        set: {
          energy: metric.energy,
          sleep: metric.sleep,
          mood: metric.mood,
          notes: metric.notes,
          protocolsCompleted: metric.protocolsCompleted
        }
      })
      .returning();
    return { data: result, error: null };
  } catch (error) {
    console.error('Error adding daily metric:', error);
    return { data: null, error };
  }
}

export async function getDailyMetrics(userId: string, limit: number = 30) {
  try {
    const results = await db
      .select()
      .from(schema.dailyMetrics)
      .where(eq(schema.dailyMetrics.userId, userId))
      .orderBy(desc(schema.dailyMetrics.date))
      .limit(limit);
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching daily metrics:', error);
    return { data: [], error };
  }
}

// ============================================================================
// COMPLETED TASKS OPERATIONS
// ============================================================================

export async function addCompletedTask(task: NewCompletedTask) {
  try {
    const [result] = await db
      .insert(schema.completedTasks)
      .values(task)
      .returning();
    return { data: result, error: null };
  } catch (error) {
    console.error('Error adding completed task:', error);
    return { data: null, error };
  }
}

export async function getCompletedTasks(userId: string, date?: string) {
  try {
    const results = date
      ? await db
          .select()
          .from(schema.completedTasks)
          .where(and(
            eq(schema.completedTasks.userId, userId),
            eq(schema.completedTasks.date, date)
          ))
          .orderBy(desc(schema.completedTasks.completedAt))
      : await db
          .select()
          .from(schema.completedTasks)
          .where(eq(schema.completedTasks.userId, userId))
          .orderBy(desc(schema.completedTasks.completedAt))
          .limit(100);
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    return { data: [], error };
  }
}

export async function getTodayCompletedTasks(userId: string) {
  try {
    const results = await db
      .select()
      .from(schema.completedTasks)
      .where(and(
        eq(schema.completedTasks.userId, userId),
        eq(schema.completedTasks.date, sql`CURRENT_DATE`)
      ))
      .orderBy(desc(schema.completedTasks.completedAt));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching today completed tasks:', error);
    return { data: [], error };
  }
}

// ============================================================================
// ACHIEVEMENTS OPERATIONS
// ============================================================================

export async function unlockAchievement(achievement: NewAchievement) {
  try {
    const [result] = await db
      .insert(schema.achievements)
      .values(achievement)
      .onConflictDoNothing()
      .returning();

    if (result) {
      // Add points to user stats
      await addPoints(achievement.userId, achievement.pointsEarned || 0);
    }

    return { data: result || null, error: null };
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return { data: null, error };
  }
}

export async function getUserAchievements(userId: string) {
  try {
    const results = await db
      .select()
      .from(schema.achievements)
      .where(eq(schema.achievements.userId, userId))
      .orderBy(desc(schema.achievements.unlockedAt));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return { data: [], error };
  }
}

// ============================================================================
// SUPPLEMENTS TRACKING OPERATIONS
// ============================================================================

export async function addSupplementTracking(supplement: NewSupplementTracking) {
  try {
    const [result] = await db
      .insert(schema.supplementsTracking)
      .values(supplement)
      .returning();
    return { data: result, error: null };
  } catch (error) {
    console.error('Error adding supplement tracking:', error);
    return { data: null, error };
  }
}

export async function getTodaySupplements(userId: string) {
  try {
    const results = await db
      .select()
      .from(schema.supplementsTracking)
      .where(and(
        eq(schema.supplementsTracking.userId, userId),
        eq(schema.supplementsTracking.date, sql`CURRENT_DATE`)
      ))
      .orderBy(desc(schema.supplementsTracking.takenAt));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching today supplements:', error);
    return { data: [], error };
  }
}

// ============================================================================
// PROTOCOL TIMER OPERATIONS
// ============================================================================

export async function startProtocolTimer(timer: NewProtocolTimer) {
  try {
    const [result] = await db
      .insert(schema.protocolTimers)
      .values(timer)
      .returning();
    return { data: result, error: null };
  } catch (error) {
    console.error('Error starting protocol timer:', error);
    return { data: null, error };
  }
}

export async function completeProtocolTimer(timerId: number) {
  try {
    const [result] = await db
      .update(schema.protocolTimers)
      .set({ completed: true, completedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(schema.protocolTimers.id, timerId))
      .returning();
    return { data: result, error: null };
  } catch (error) {
    console.error('Error completing protocol timer:', error);
    return { data: null, error };
  }
}

// ============================================================================
// USER EQUIPMENT OPERATIONS
// ============================================================================

export async function markEquipmentOwned(equipment: NewUserEquipment) {
  try {
    const [result] = await db
      .insert(schema.userEquipment)
      .values(equipment)
      .onConflictDoNothing()
      .returning();
    return { data: result || null, error: null };
  } catch (error) {
    console.error('Error marking equipment owned:', error);
    return { data: null, error };
  }
}

export async function getUserEquipment(userId: string) {
  try {
    const results = await db
      .select()
      .from(schema.userEquipment)
      .where(eq(schema.userEquipment.userId, userId))
      .orderBy(desc(schema.userEquipment.markedOwnedAt));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching user equipment:', error);
    return { data: [], error };
  }
}

// ============================================================================
// VIDEO PROGRESS OPERATIONS
// ============================================================================

export async function markVideoWatched(video: NewVideoProgress) {
  try {
    const [result] = await db
      .insert(schema.videoProgress)
      .values(video)
      .onConflictDoUpdate({
        target: [schema.videoProgress.userId, schema.videoProgress.videoId],
        set: { watchedAt: sql`CURRENT_TIMESTAMP` }
      })
      .returning();
    return { data: result, error: null };
  } catch (error) {
    console.error('Error marking video watched:', error);
    return { data: null, error };
  }
}

export async function getWatchedVideos(userId: string) {
  try {
    const results = await db
      .select()
      .from(schema.videoProgress)
      .where(eq(schema.videoProgress.userId, userId))
      .orderBy(desc(schema.videoProgress.watchedAt));
    return { data: results, error: null };
  } catch (error) {
    console.error('Error fetching watched videos:', error);
    return { data: [], error };
  }
}

// ============================================================================
// LEGACY PROFILE OPERATIONS (for backwards compatibility)
// ============================================================================

export async function upsertProfile(userId: string, profileData: Partial<schema.Profile>) {
  try {
    // Create or update user
    if (profileData.email && profileData.name) {
      await createUser({
        id: userId,
        email: profileData.email,
        name: profileData.name
      });
    }

    // Upsert profile data if provided
    if (profileData.goals || profileData.experienceLevel || profileData.availableTime !== undefined || 
        profileData.healthConditions || profileData.budget) {
      await upsertUserProfile(userId, {
        goals: profileData.goals,
        experienceLevel: profileData.experienceLevel as 'beginner' | 'intermediate' | 'advanced' | undefined,
        availableTime: profileData.availableTime,
        healthConditions: profileData.healthConditions,
        budget: profileData.budget as 'essential' | 'intermediate' | 'premium' | undefined
      });
    }

    return await getProfile(userId);
  } catch (error) {
    console.error('Error upserting profile (legacy):', error);
    return { data: null, error };
  }
}

export async function getProfile(userId: string) {
  try {
    const userResult = await getUser(userId);
    const profileResult = await getUserProfile(userId);

    if (!userResult.data) {
      return { data: null, error: null };
    }

    const combinedProfile: schema.Profile = {
      id: userResult.data.id,
      email: userResult.data.email,
      name: userResult.data.name,
      goals: profileResult.data?.goals || [],
      experienceLevel: (profileResult.data?.experienceLevel || 'beginner') as string,
      availableTime: profileResult.data?.availableTime || 0,
      healthConditions: profileResult.data?.healthConditions || [],
      budget: (profileResult.data?.budget || 'essential') as string,
      createdAt: userResult.data.createdAt,
      updatedAt: profileResult.data?.updatedAt || userResult.data.updatedAt
    };

    return { data: combinedProfile, error: null };
  } catch (error) {
    console.error('Error fetching profile (legacy):', error);
    return { data: null, error };
  }
}

