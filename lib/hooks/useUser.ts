import { useEffect, useState } from 'react';
import type { User, UserProfile, UserStats, DailyMetric } from '@/lib/db';

/**
 * Hook to load and manage user data from database
 * Replaces localStorage-based state management
 */
export function useUser(userId: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function loadUserData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all user data in parallel
        const [userRes, profileRes, statsRes] = await Promise.all([
          fetch(`/api/user/${userId}`),
          fetch(`/api/user/${userId}/profile`),
          fetch(`/api/user/${userId}/stats`)
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.data);
        }

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData.data);
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData.data);
        }
      } catch (err) {
        console.error('Error loading user data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [userId]);

  const refetch = async () => {
    if (!userId) return;

    try {
      const [userRes, profileRes, statsRes] = await Promise.all([
        fetch(`/api/user/${userId}`),
        fetch(`/api/user/${userId}/profile`),
        fetch(`/api/user/${userId}/stats`)
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.data);
      }

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData.data);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data);
      }
    } catch (err) {
      console.error('Error refetching user data:', err);
    }
  };

  return {
    user,
    profile,
    stats,
    loading,
    error,
    refetch
  };
}

/**
 * Hook to load completed tasks for today
 */
export function useTodayTasks(userId: string | null) {
  const [tasks, setTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function loadTasks() {
      try {
        const res = await fetch(`/api/user/${userId}/tasks/today`);
        if (res.ok) {
          const data = await res.json();
          setTasks(data.data.map((t: { taskId: string; }) => t.taskId));
        }
      } catch (err) {
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [userId]);

  return { tasks, loading, setTasks };
}

/**
 * Hook to load daily metrics
 */
export function useDailyMetrics(userId: string | null, days: number = 7) {
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function loadMetrics() {
      try {
        const res = await fetch(`/api/user/${userId}/metrics?days=${days}`);
        if (res.ok) {
          const data = await res.json();
          setMetrics(data.data as DailyMetric[]);
        }
      } catch (err) {
        console.error('Error loading metrics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, [userId, days]);

  return { metrics, loading };
}

