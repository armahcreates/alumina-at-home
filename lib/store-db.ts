import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Database-integrated store
 * Works with Neon DB instead of just localStorage
 */

interface UserProfile {
  name: string;
  email: string;
  goals: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  availableTime: number;
  healthConditions: string[];
  budget: 'essential' | 'intermediate' | 'premium';
}

interface AppState {
  // Auth state
  userId: string | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  
  // User data (synced from DB)
  user: UserProfile | null;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  level: number;
  
  // UI state (local only)
  completedTasksToday: string[];
  loading: boolean;
  
  // Actions
  login: (userId: string) => Promise<void>;
  logout: () => void;
  loadUserData: (userId: string) => Promise<void>;
  toggleTask: (taskId: string, taskName: string, category?: string) => Promise<void>;
  updatePoints: (points: number) => Promise<void>;
  completeOnboarding: (profile: UserProfile) => Promise<void>;
}

export const useStoreDb = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userId: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      user: null,
      currentStreak: 0,
      longestStreak: 0,
      totalPoints: 0,
      level: 1,
      completedTasksToday: [],
      loading: false,

      // Login - loads user data from database
      login: async (userId: string) => {
        try {
          set({ loading: true });
          
          // Fetch user data
          const [userRes, profileRes, statsRes, tasksRes] = await Promise.all([
            fetch(`/api/user/${userId}`),
            fetch(`/api/user/${userId}/profile`),
            fetch(`/api/user/${userId}/stats`),
            fetch(`/api/user/${userId}/tasks/today`)
          ]);

          const user = userRes.ok ? (await userRes.json()).data : null;
          const profile = profileRes.ok ? (await profileRes.json()).data : null;
          const stats = statsRes.ok ? (await statsRes.json()).data : null;
          const tasks = tasksRes.ok ? (await tasksRes.json()).data : [];

          if (user && profile) {
            set({
              userId,
              isAuthenticated: true,
              hasCompletedOnboarding: user.hasCompletedOnboarding,
              user: {
                name: user.name,
                email: user.email,
                goals: profile.goals || [],
                experienceLevel: profile.experienceLevel || 'beginner',
                availableTime: profile.availableTime || 0,
                healthConditions: profile.healthConditions || [],
                budget: profile.budget || 'essential'
              },
              currentStreak: stats?.currentStreak || 0,
              longestStreak: stats?.longestStreak || 0,
              totalPoints: stats?.totalPoints || 0,
              level: stats?.level || 1,
              completedTasksToday: tasks.map((t: { taskId: string; }) => t.taskId),
              loading: false
            });
          } else {
            throw new Error('Failed to load user data');
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ loading: false });
          throw error;
        }
      },

      // Load/refresh user data
      loadUserData: async (userId: string) => {
        try {
          const [profileRes, statsRes, tasksRes] = await Promise.all([
            fetch(`/api/user/${userId}/profile`),
            fetch(`/api/user/${userId}/stats`),
            fetch(`/api/user/${userId}/tasks/today`)
          ]);

          const profile = profileRes.ok ? (await profileRes.json()).data : null;
          const stats = statsRes.ok ? (await statsRes.json()).data : null;
          const tasks = tasksRes.ok ? (await tasksRes.json()).data : [];

          if (profile && stats) {
            set({
              currentStreak: stats.currentStreak || 0,
              longestStreak: stats.longestStreak || 0,
              totalPoints: stats.totalPoints || 0,
              level: stats.level || 1,
              completedTasksToday: tasks.map((t: { taskId: string; }) => t.taskId)
            });
          }
        } catch (error) {
          console.error('Load user data error:', error);
        }
      },

      // Toggle task - saves to database
      toggleTask: async (taskId: string, taskName: string, category?: string) => {
        const { userId, completedTasksToday } = get();
        if (!userId) return;

        const isCompleting = !completedTasksToday.includes(taskId);

        if (isCompleting) {
          // Add task to database
          try {
            const res = await fetch(`/api/user/${userId}/tasks/today`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                taskId,
                taskName,
                taskCategory: category,
                pointsEarned: 10
              })
            });

            if (res.ok) {
              // Update local state
              set({
                completedTasksToday: [...completedTasksToday, taskId],
                totalPoints: get().totalPoints + 10
              });

              // Update points in database
              await fetch(`/api/user/${userId}/stats`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  totalPoints: get().totalPoints
                })
              });
            }
          } catch (error) {
            console.error('Error toggling task:', error);
          }
        } else {
          // Just remove from local state (we don't delete from DB)
          set({
            completedTasksToday: completedTasksToday.filter(t => t !== taskId)
          });
        }
      },

      // Update points
      updatePoints: async (points: number) => {
        const { userId, totalPoints } = get();
        if (!userId) return;

        const newTotal = totalPoints + points;
        set({ totalPoints: newTotal });

        // Save to database
        try {
          await fetch(`/api/user/${userId}/stats`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalPoints: newTotal })
          });
        } catch (error) {
          console.error('Error updating points:', error);
        }
      },

      // Complete onboarding
      completeOnboarding: async (profile: UserProfile) => {
        const { userId } = get();
        if (!userId) return;

        try {
          // Update user onboarding status
          await fetch(`/api/user/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hasCompletedOnboarding: true })
          });

          // Save profile
          await fetch(`/api/user/${userId}/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              goals: profile.goals,
              experienceLevel: profile.experienceLevel,
              availableTime: profile.availableTime,
              healthConditions: profile.healthConditions,
              budget: profile.budget
            })
          });

          set({
            hasCompletedOnboarding: true,
            user: profile
          });
        } catch (error) {
          console.error('Error completing onboarding:', error);
        }
      },

      // Logout
      logout: () => {
        set({
          userId: null,
          isAuthenticated: false,
          hasCompletedOnboarding: false,
          user: null,
          currentStreak: 0,
          longestStreak: 0,
          totalPoints: 0,
          level: 1,
          completedTasksToday: []
        });
      }
    }),
    {
      name: 'alumina-db-storage',
      // Only persist auth state, not data
      partialize: (state) => ({
        userId: state.userId,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

