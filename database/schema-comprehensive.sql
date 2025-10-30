-- Alumina At Home - Comprehensive Database Schema
-- Database: Neon PostgreSQL
-- Based on complete app analysis

-- ============================================================================
-- 1. USERS TABLE (Core user information with Stack Auth integration)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,  -- Stack Auth user ID
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  has_completed_onboarding BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- ============================================================================
-- 2. USER_PROFILES TABLE (Onboarding data and preferences)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  goals TEXT[] DEFAULT '{}',
  experience_level VARCHAR(50) DEFAULT 'beginner' CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  available_time INTEGER DEFAULT 0,  -- minutes per day
  health_conditions TEXT[] DEFAULT '{}',
  budget VARCHAR(50) DEFAULT 'essential' CHECK (budget IN ('essential', 'intermediate', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. USER_STATS TABLE (Gamification: streaks, points, levels)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_stats (
  user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  last_activity_date DATE,
  total_protocols_completed INTEGER DEFAULT 0,
  total_days_active INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_stats_streak ON user_stats(current_streak DESC);
CREATE INDEX IF NOT EXISTS idx_user_stats_points ON user_stats(total_points DESC);

-- ============================================================================
-- 4. DAILY_METRICS TABLE (Daily tracking: energy, sleep, mood)
-- ============================================================================
CREATE TABLE IF NOT EXISTS daily_metrics (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  energy INTEGER CHECK (energy >= 1 AND energy <= 10),
  sleep INTEGER CHECK (sleep >= 1 AND sleep <= 10),
  mood INTEGER CHECK (mood >= 1 AND mood <= 10),
  notes TEXT,
  protocols_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_date ON daily_metrics(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON daily_metrics(date DESC);

-- ============================================================================
-- 5. COMPLETED_TASKS TABLE (Protocol completion tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS completed_tasks (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  task_id VARCHAR(255) NOT NULL,  -- e.g., 'morning-light', 'cold-shower'
  task_name VARCHAR(255) NOT NULL,
  task_category VARCHAR(100),  -- e.g., 'circadian', 'contrast', 'breathwork'
  points_earned INTEGER DEFAULT 10,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  date DATE DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_completed_tasks_user ON completed_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_tasks_user_date ON completed_tasks(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_completed_tasks_date ON completed_tasks(date DESC);

-- ============================================================================
-- 6. ACHIEVEMENTS TABLE (Unlocked achievements)
-- ============================================================================
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  achievement_id VARCHAR(255) NOT NULL,  -- e.g., 'streak-7', 'first-day'
  achievement_title VARCHAR(255) NOT NULL,
  achievement_description TEXT,
  points_earned INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_unlocked ON achievements(unlocked_at DESC);

-- ============================================================================
-- 7. SUPPLEMENTS_TRACKING TABLE (Supplement intake tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS supplements_tracking (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  supplement_name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  time_of_day VARCHAR(50),  -- 'morning', 'afternoon', 'evening', 'bedtime'
  taken_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  date DATE DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_supplements_user_date ON supplements_tracking(user_id, date DESC);

-- ============================================================================
-- 8. PROTOCOL_TIMERS TABLE (Timer session history)
-- ============================================================================
CREATE TABLE IF NOT EXISTS protocol_timers (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  protocol_id VARCHAR(255) NOT NULL,
  protocol_name VARCHAR(255) NOT NULL,
  duration_seconds INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_protocol_timers_user ON protocol_timers(user_id);
CREATE INDEX IF NOT EXISTS idx_protocol_timers_date ON protocol_timers(started_at DESC);

-- ============================================================================
-- 9. USER_EQUIPMENT TABLE (Owned equipment tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_equipment (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  equipment_id VARCHAR(255) NOT NULL,
  equipment_name VARCHAR(255) NOT NULL,
  tier VARCHAR(50) CHECK (tier IN ('essential', 'intermediate', 'premium')),
  marked_owned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, equipment_id)
);

CREATE INDEX IF NOT EXISTS idx_user_equipment_user ON user_equipment(user_id);

-- ============================================================================
-- 10. VIDEO_PROGRESS TABLE (Video viewing progress)
-- ============================================================================
CREATE TABLE IF NOT EXISTS video_progress (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  video_id VARCHAR(255) NOT NULL,
  video_title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  watched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, video_id)
);

CREATE INDEX IF NOT EXISTS idx_video_progress_user ON video_progress(user_id);

-- ============================================================================
-- TRIGGERS FOR AUTO-UPDATING updated_at TIMESTAMPS
-- ============================================================================

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to user_profiles table
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to user_stats table
CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to calculate streak
CREATE OR REPLACE FUNCTION calculate_streak(p_user_id VARCHAR)
RETURNS TABLE(current_streak INTEGER, longest_streak INTEGER) AS $$
DECLARE
  v_current_streak INTEGER := 0;
  v_longest_streak INTEGER := 0;
  v_last_date DATE;
  v_streak_count INTEGER := 0;
BEGIN
  -- Calculate current streak from daily_metrics
  FOR v_last_date IN 
    SELECT date 
    FROM daily_metrics 
    WHERE user_id = p_user_id 
    ORDER BY date DESC
  LOOP
    IF v_streak_count = 0 THEN
      -- First record
      IF v_last_date = CURRENT_DATE OR v_last_date = CURRENT_DATE - INTERVAL '1 day' THEN
        v_streak_count := 1;
        v_current_streak := 1;
      ELSE
        EXIT;
      END IF;
    ELSE
      -- Check if consecutive
      IF v_last_date = CURRENT_DATE - (v_streak_count || ' days')::INTERVAL THEN
        v_streak_count := v_streak_count + 1;
        v_current_streak := v_streak_count;
      ELSE
        EXIT;
      END IF;
    END IF;
  END LOOP;

  -- Get longest streak from user_stats
  SELECT user_stats.longest_streak INTO v_longest_streak
  FROM user_stats
  WHERE user_id = p_user_id;

  IF v_longest_streak IS NULL THEN
    v_longest_streak := v_current_streak;
  ELSE
    v_longest_streak := GREATEST(v_longest_streak, v_current_streak);
  END IF;

  RETURN QUERY SELECT v_current_streak, v_longest_streak;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SEED DEFAULT ACHIEVEMENTS (Optional)
-- ============================================================================

-- Create achievements reference table
CREATE TABLE IF NOT EXISTS achievements_catalog (
  achievement_id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(10),
  points INTEGER DEFAULT 0,
  unlock_criteria JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default achievements
INSERT INTO achievements_catalog (achievement_id, title, description, icon, points, unlock_criteria) VALUES
('first-day', 'First Steps', 'Complete your first day of protocols', '1ST', 50, '{"type": "first_completion"}'),
('streak-7', 'Week Warrior', 'Maintain a 7-day streak', '7D', 100, '{"type": "streak", "days": 7}'),
('streak-30', 'Monthly Master', 'Maintain a 30-day streak', '30D', 300, '{"type": "streak", "days": 30}'),
('streak-90', 'Quarterly Champion', 'Maintain a 90-day streak', '90D', 1000, '{"type": "streak", "days": 90}'),
('all-protocols', 'Protocol Perfectionist', 'Complete all daily protocols in one day', '100', 150, '{"type": "all_protocols_one_day"}'),
('early-bird', 'Early Bird', 'Complete morning protocol before 7 AM', 'AM', 75, '{"type": "time_based", "before": "07:00"}'),
('cold-plunge-10', 'Ice Warrior', 'Complete 10 cold exposure sessions', 'ICE', 200, '{"type": "protocol_count", "protocol": "cold-shower", "count": 10}'),
('community-engage', 'Community Champion', 'Help 5 members in the community', 'COM', 250, '{"type": "community_interaction", "count": 5}'),
('bio-age-reverse', 'Time Traveler', 'Reverse your biological age by 5+ years', 'AGE', 500, '{"type": "bio_age_improvement", "years": 5}')
ON CONFLICT (achievement_id) DO NOTHING;

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Additional composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_completed_tasks_user_task ON completed_tasks(user_id, task_id);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_energy ON daily_metrics(user_id, energy DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_user_unlocked ON achievements(user_id, unlocked_at DESC);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- This schema supports all app features:
-- - User authentication & profiles
-- - Daily protocol tracking
-- - Gamification (streaks, points, achievements)
-- - Health metrics tracking
-- - Supplement tracking
-- - Equipment ownership
-- - Video progress
-- - Timer sessions
-- ============================================================================

