#!/usr/bin/env tsx

/**
 * Drizzle ORM + Typebox Testing Script
 * Comprehensive tests for type-safe database operations
 */

// IMPORTANT: Load environment variables FIRST before any other imports
import { config } from 'dotenv';
config({ path: '.env.local' });

// Verify DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL not found in .env.local');
  console.error('Please ensure .env.local exists and contains DATABASE_URL');
  process.exit(1);
}

import {
  createUser,
  getUser,
  updateUserOnboarding,
  upsertUserProfile,
  getUserProfile,
  getUserStats,
  updateUserStats,
  incrementStreak,
  addPoints,
  addDailyMetric,
  getDailyMetrics,
  addCompletedTask,
  getCompletedTasks,
  getTodayCompletedTasks,
  unlockAchievement,
  getUserAchievements,
  addSupplementTracking,
  getTodaySupplements,
  startProtocolTimer,
  completeProtocolTimer,
  markEquipmentOwned,
  getUserEquipment,
  markVideoWatched,
  getWatchedVideos,
  validateUser,
  validateUserProfile,
  validateDailyMetric
} from '../lib/db';

const TEST_USER_ID = 'test-drizzle-' + Date.now();
const TEST_EMAIL = `test-drizzle-${Date.now()}@example.com`;

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
}

const testResults: TestResult[] = [];

function logTest(name: string, passed: boolean, details = '') {
  testResults.push({ name, passed, details });
  if (passed) {
    console.log(`✓ ${name}`);
  } else {
    console.log(`✗ ${name}`);
    if (details) console.log(`  ${details}`);
  }
}

async function runDrizzleTests() {
  console.log('\n🧪 Starting Drizzle ORM + Typebox Tests...\n');
  console.log('═'.repeat(60));
  console.log('Test User ID:', TEST_USER_ID);
  console.log('═'.repeat(60) + '\n');

  try {
    // ========================================================================
    // 1. USER OPERATIONS
    // ========================================================================
    console.log('📋 Testing User Operations (Drizzle)...\n');

    // Create User
    const createUserResult = await createUser({
      id: TEST_USER_ID,
      email: TEST_EMAIL,
      name: 'Test Drizzle User'
    });
    logTest('Drizzle: Create User', createUserResult.data?.id === TEST_USER_ID);

    // Validate user with Typebox
    if (createUserResult.data) {
      try {
        validateUser(createUserResult.data);
        logTest('Typebox: Validate User', true);
      } catch (error) {
        logTest('Typebox: Validate User', false, (error as Error).message);
      }
    }

    // Get User
    const getUserResult = await getUser(TEST_USER_ID);
    logTest('Drizzle: Get User', getUserResult.data?.email === TEST_EMAIL);

    // Update Onboarding
    const updateOnboardingResult = await updateUserOnboarding(TEST_USER_ID, true);
    logTest('Drizzle: Update Onboarding', updateOnboardingResult.data?.hasCompletedOnboarding === true);

    // ========================================================================
    // 2. USER PROFILE OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing User Profile Operations (Drizzle)...\n');

    const profileData = {
      goals: ['longevity', 'energy'],
      experienceLevel: 'intermediate' as const,
      availableTime: 60,
      healthConditions: ['none'],
      budget: 'premium' as const
    };

    const upsertProfileResult = await upsertUserProfile(TEST_USER_ID, profileData);
    logTest('Drizzle: Upsert User Profile', upsertProfileResult.data?.goals?.includes('longevity') || false);

    // Validate profile with Typebox
    if (upsertProfileResult.data) {
      try {
        validateUserProfile(upsertProfileResult.data);
        logTest('Typebox: Validate User Profile', true);
      } catch (error) {
        logTest('Typebox: Validate User Profile', false, (error as Error).message);
      }
    }

    const getProfileResult = await getUserProfile(TEST_USER_ID);
    logTest('Drizzle: Get User Profile', getProfileResult.data?.experienceLevel === 'intermediate');

    // ========================================================================
    // 3. USER STATS OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing User Stats Operations (Drizzle)...\n');

    const getStatsResult = await getUserStats(TEST_USER_ID);
    logTest('Drizzle: Get User Stats (Auto-Create)', getStatsResult.data?.userId === TEST_USER_ID);

    const updateStatsResult = await updateUserStats(TEST_USER_ID, {
      currentStreak: 5,
      longestStreak: 10,
      totalPoints: 500
    });
    logTest('Drizzle: Update User Stats', updateStatsResult.data?.currentStreak === 5);

    const incrementStreakResult = await incrementStreak(TEST_USER_ID);
    logTest('Drizzle: Increment Streak', incrementStreakResult.data?.currentStreak === 6);

    const addPointsResult = await addPoints(TEST_USER_ID, 100);
    logTest('Drizzle: Add Points', addPointsResult.data?.totalPoints === 600);

    // ========================================================================
    // 4. DAILY METRICS OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Daily Metrics Operations (Drizzle)...\n');

    const today = new Date().toISOString().split('T')[0];
    const addMetricResult = await addDailyMetric({
      userId: TEST_USER_ID,
      date: today,
      energy: 8,
      sleep: 7,
      mood: 9,
      notes: 'Feeling great!',
      protocolsCompleted: 5
    });
    logTest('Drizzle: Add Daily Metric', addMetricResult.data?.energy === 8);

    // Validate metric with Typebox
    if (addMetricResult.data) {
      try {
        validateDailyMetric(addMetricResult.data);
        logTest('Typebox: Validate Daily Metric', true);
      } catch (error) {
        logTest('Typebox: Validate Daily Metric', false, (error as Error).message);
      }
    }

    const getMetricsResult = await getDailyMetrics(TEST_USER_ID, 7);
    logTest('Drizzle: Get Daily Metrics', getMetricsResult.data.length > 0);

    // ========================================================================
    // 5. COMPLETED TASKS OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Completed Tasks Operations (Drizzle)...\n');

    const addTaskResult = await addCompletedTask({
      userId: TEST_USER_ID,
      taskId: 'morning-light',
      taskName: 'Morning Light Exposure',
      taskCategory: 'circadian',
      pointsEarned: 10
    });
    logTest('Drizzle: Add Completed Task', addTaskResult.data?.taskId === 'morning-light');

    const getTasksResult = await getCompletedTasks(TEST_USER_ID);
    logTest('Drizzle: Get Completed Tasks', getTasksResult.data.length > 0);

    const getTodayTasksResult = await getTodayCompletedTasks(TEST_USER_ID);
    logTest('Drizzle: Get Today Completed Tasks', getTodayTasksResult.data.length > 0);

    // ========================================================================
    // 6. ACHIEVEMENTS OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Achievements Operations (Drizzle)...\n');

    const unlockAchievementResult = await unlockAchievement({
      userId: TEST_USER_ID,
      achievementId: 'first-day',
      achievementTitle: 'First Steps',
      achievementDescription: 'Complete your first day',
      pointsEarned: 50
    });
    logTest('Drizzle: Unlock Achievement', unlockAchievementResult.data?.achievementId === 'first-day');

    const getAchievementsResult = await getUserAchievements(TEST_USER_ID);
    logTest('Drizzle: Get User Achievements', getAchievementsResult.data.length > 0);

    // ========================================================================
    // 7. SUPPLEMENTS TRACKING
    // ========================================================================
    console.log('\n📋 Testing Supplements Tracking (Drizzle)...\n');

    const addSupplementResult = await addSupplementTracking({
      userId: TEST_USER_ID,
      supplementName: 'Vitamin D3',
      dosage: '5000 IU',
      timeOfDay: 'morning'
    });
    logTest('Drizzle: Add Supplement Tracking', addSupplementResult.data?.supplementName === 'Vitamin D3');

    const getTodaySupplementsResult = await getTodaySupplements(TEST_USER_ID);
    logTest('Drizzle: Get Today Supplements', getTodaySupplementsResult.data.length > 0);

    // ========================================================================
    // 8. PROTOCOL TIMER
    // ========================================================================
    console.log('\n📋 Testing Protocol Timer (Drizzle)...\n');

    const startTimerResult = await startProtocolTimer({
      userId: TEST_USER_ID,
      protocolId: 'breathwork',
      protocolName: 'Breathwork Session',
      durationSeconds: 600,
      completed: false
    });
    logTest('Drizzle: Start Protocol Timer', startTimerResult.data?.protocolId === 'breathwork');

    if (startTimerResult.data?.id) {
      const completeTimerResult = await completeProtocolTimer(startTimerResult.data.id);
      logTest('Drizzle: Complete Protocol Timer', completeTimerResult.data?.completed === true);
    }

    // ========================================================================
    // 9. USER EQUIPMENT
    // ========================================================================
    console.log('\n📋 Testing User Equipment (Drizzle)...\n');

    const markEquipmentResult = await markEquipmentOwned({
      userId: TEST_USER_ID,
      equipmentId: 'red-light-panel',
      equipmentName: 'Red Light Therapy Panel',
      tier: 'premium'
    });
    logTest('Drizzle: Mark Equipment Owned', markEquipmentResult.data?.equipmentId === 'red-light-panel');

    const getEquipmentResult = await getUserEquipment(TEST_USER_ID);
    logTest('Drizzle: Get User Equipment', getEquipmentResult.data.length > 0);

    // ========================================================================
    // 10. VIDEO PROGRESS
    // ========================================================================
    console.log('\n📋 Testing Video Progress (Drizzle)...\n');

    const markVideoResult = await markVideoWatched({
      userId: TEST_USER_ID,
      videoId: 'morning-routine',
      videoTitle: 'Morning Routine Protocol',
      category: 'protocols'
    });
    logTest('Drizzle: Mark Video Watched', markVideoResult.data?.videoId === 'morning-routine');

    const getVideosResult = await getWatchedVideos(TEST_USER_ID);
    logTest('Drizzle: Get Watched Videos', getVideosResult.data.length > 0);

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('\n' + '═'.repeat(60));
    console.log('📊 DRIZZLE + TYPEBOX TEST SUMMARY');
    console.log('═'.repeat(60));
    
    const passed = testResults.filter(t => t.passed).length;
    const failed = testResults.filter(t => t.passed === false).length;
    
    console.log(`Total Tests: ${testResults.length}`);
    console.log(`✓ Passed: ${passed}`);
    console.log(`✗ Failed: ${failed}`);
    console.log('═'.repeat(60) + '\n');

    if (failed === 0) {
      console.log('🎉 ALL TESTS PASSED!');
      console.log('\n✅ Drizzle ORM + Typebox is fully configured and working!\n');
      console.log('📱 Benefits of your new stack:');
      console.log('   • Type-safe database queries with Drizzle ORM');
      console.log('   • Runtime validation with Typebox');
      console.log('   • Automatic TypeScript inference');
      console.log('   • Better developer experience');
      console.log('   • Schema introspection with Drizzle Studio');
      console.log('   • Type-safe migrations\n');
      console.log('💡 Try these commands:');
      console.log('   • npm run db:push - Push schema changes');
      console.log('   • npm run db:studio - Open Drizzle Studio GUI\n');
      process.exit(0);
    } else {
      console.log('⚠️  SOME TESTS FAILED');
      console.log('\nFailed tests:');
      testResults.filter(t => !t.passed).forEach(t => {
        console.log(`  • ${t.name}: ${t.details}`);
      });
      console.log('');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Test suite error:', error);
    process.exit(1);
  }
}

// Run tests
runDrizzleTests();

