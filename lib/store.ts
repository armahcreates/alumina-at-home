import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  name: string;
  email: string;
  goals: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  availableTime: number; // minutes per day
  healthConditions: string[];
  budget: 'essential' | 'intermediate' | 'premium';
}

interface DailyMetrics {
  date: string;
  energy: number;
  sleep: number;
  mood: number;
  completed: string[];
  notes?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface AppState {
  // User & Auth
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  user: UserProfile | null;

  // Gamification
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  achievements: Achievement[];

  // Daily Tracking
  completedTasks: string[];
  dailyMetrics: DailyMetrics[];

  // Actions
  login: (email: string, password: string) => void;
  logout: () => void;
  completeOnboarding: (profile: UserProfile) => void;
  toggleTask: (taskId: string) => void;
  addDailyMetric: (metric: DailyMetrics) => void;
  unlockAchievement: (achievementId: string) => void;
  incrementStreak: () => void;
  addPoints: (points: number) => void;
  resetDay: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      user: null,
      currentStreak: 0,
      longestStreak: 0,
      totalPoints: 0,
      achievements: [],
      completedTasks: [],
      dailyMetrics: [],

      // Actions
      login: (email: string, password: string) => {
        // Simple auth for MVP - replace with real auth later
        set({
          isAuthenticated: true,
          user: { ...get().user!, email }
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          hasCompletedOnboarding: false
        });
      },

      completeOnboarding: (profile: UserProfile) => {
        set({
          hasCompletedOnboarding: true,
          user: profile
        });
      },

      toggleTask: (taskId: string) => {
        const current = get().completedTasks;
        const newTasks = current.includes(taskId)
          ? current.filter(t => t !== taskId)
          : [...current, taskId];

        set({ completedTasks: newTasks });

        // Award points
        if (newTasks.length > current.length) {
          get().addPoints(10);
        }
      },

      addDailyMetric: (metric: DailyMetrics) => {
        set({
          dailyMetrics: [...get().dailyMetrics, metric]
        });
      },

      unlockAchievement: (achievementId: string) => {
        const achievements = get().achievements;
        const achievement = achievements.find(a => a.id === achievementId);

        if (achievement && !achievement.unlockedAt) {
          set({
            achievements: achievements.map(a =>
              a.id === achievementId
                ? { ...a, unlockedAt: new Date().toISOString() }
                : a
            )
          });

          // Award bonus points for achievement
          get().addPoints(100);
        }
      },

      incrementStreak: () => {
        const newStreak = get().currentStreak + 1;
        const longestStreak = Math.max(newStreak, get().longestStreak);

        set({
          currentStreak: newStreak,
          longestStreak
        });

        // Check for streak achievements
        if (newStreak === 7) get().unlockAchievement('streak-7');
        if (newStreak === 30) get().unlockAchievement('streak-30');
        if (newStreak === 90) get().unlockAchievement('streak-90');
      },

      addPoints: (points: number) => {
        set({ totalPoints: get().totalPoints + points });
      },

      resetDay: () => {
        set({ completedTasks: [] });
      }
    }),
    {
      name: 'alumina-storage',
    }
  )
);
