#!/usr/bin/env node

/**
 * Comprehensive Database Testing Script
 * Tests all CRUD operations for Alumina At Home
 */

require('dotenv').config({ path: '.env.local' });

const {
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
  upsertProfile,
  getProfile
} = require('../lib/db.ts');

const TEST_USER_ID = 'test-user-' + Date.now();
const TEST_EMAIL = `test${Date.now()}@example.com`;

let testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(name, passed, details = '') {
  testResults.tests.push({ name, passed, details });
  if (passed) {
    testResults.passed++;
    console.log(`✓ ${name}`);
  } else {
    testResults.failed++;
    console.log(`✗ ${name}`);
    if (details) console.log(`  ${details}`);
  }
}

async function runComprehensiveTests() {
  console.log('\n🧪 Starting Comprehensive Database Tests...\n');
  console.log('═'.repeat(60));
  console.log('Test User ID:', TEST_USER_ID);
  console.log('═'.repeat(60) + '\n');

  try {
    // ========================================================================
    // 1. USER OPERATIONS
    // ========================================================================
    console.log('📋 Testing User Operations...\n');

    // Create User
    const createUserResult = await createUser({
      id: TEST_USER_ID,
      email: TEST_EMAIL,
      name: 'Test User'
    });
    logTest('Create User', createUserResult.data && createUserResult.data.id === TEST_USER_ID);

    // Get User
    const getUserResult = await getUser(TEST_USER_ID);
    logTest('Get User', getUserResult.data && getUserResult.data.email === TEST_EMAIL);

    // Update Onboarding
    const updateOnboardingResult = await updateUserOnboarding(TEST_USER_ID, true);
    logTest('Update Onboarding', updateOnboardingResult.data && updateOnboardingResult.data.has_completed_onboarding === true);

    // ========================================================================
    // 2. USER PROFILE OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing User Profile Operations...\n');

    const profileData = {
      goals: ['longevity', 'energy'],
      experience_level: 'intermediate',
      available_time: 60,
      health_conditions: ['none'],
      budget: 'premium'
    };

    const upsertProfileResult = await upsertUserProfile(TEST_USER_ID, profileData);
    logTest('Upsert User Profile', upsertProfileResult.data && upsertProfileResult.data.goals.includes('longevity'));

    const getProfileResult = await getUserProfile(TEST_USER_ID);
    logTest('Get User Profile', getProfileResult.data && getProfileResult.data.experience_level === 'intermediate');

    // ========================================================================
    // 3. USER STATS OPERATIONS (Gamification)
    // ========================================================================
    console.log('\n📋 Testing User Stats Operations...\n');

    const getStatsResult = await getUserStats(TEST_USER_ID);
    logTest('Get User Stats (Auto-Create)', getStatsResult.data && getStatsResult.data.user_id === TEST_USER_ID);

    const updateStatsResult = await updateUserStats(TEST_USER_ID, {
      current_streak: 5,
      longest_streak: 10,
      total_points: 500
    });
    logTest('Update User Stats', updateStatsResult.data && updateStatsResult.data.current_streak === 5);

    const incrementStreakResult = await incrementStreak(TEST_USER_ID);
    logTest('Increment Streak', incrementStreakResult.data && incrementStreakResult.data.current_streak === 6);

    const addPointsResult = await addPoints(TEST_USER_ID, 100);
    logTest('Add Points', addPointsResult.data && addPointsResult.data.total_points === 600);

    // ========================================================================
    // 4. DAILY METRICS OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Daily Metrics Operations...\n');

    const addMetricResult = await addDailyMetric({
      user_id: TEST_USER_ID,
      date: new Date().toISOString().split('T')[0],
      energy: 8,
      sleep: 7,
      mood: 9,
      notes: 'Feeling great!',
      protocols_completed: 5
    });
    logTest('Add Daily Metric', addMetricResult.data && addMetricResult.data.energy === 8);

    const getMetricsResult = await getDailyMetrics(TEST_USER_ID, 7);
    logTest('Get Daily Metrics', getMetricsResult.data && getMetricsResult.data.length > 0);

    // ========================================================================
    // 5. COMPLETED TASKS OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Completed Tasks Operations...\n');

    const addTaskResult = await addCompletedTask({
      user_id: TEST_USER_ID,
      task_id: 'morning-light',
      task_name: 'Morning Light Exposure',
      task_category: 'circadian',
      points_earned: 10
    });
    logTest('Add Completed Task', addTaskResult.data && addTaskResult.data.task_id === 'morning-light');

    const getTasksResult = await getCompletedTasks(TEST_USER_ID);
    logTest('Get Completed Tasks', getTasksResult.data && getTasksResult.data.length > 0);

    const getTodayTasksResult = await getTodayCompletedTasks(TEST_USER_ID);
    logTest('Get Today Completed Tasks', getTodayTasksResult.data && getTodayTasksResult.data.length > 0);

    // ========================================================================
    // 6. ACHIEVEMENTS OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Achievements Operations...\n');

    const unlockAchievementResult = await unlockAchievement({
      user_id: TEST_USER_ID,
      achievement_id: 'first-day',
      achievement_title: 'First Steps',
      achievement_description: 'Complete your first day',
      points_earned: 50
    });
    logTest('Unlock Achievement', unlockAchievementResult.data && unlockAchievementResult.data.achievement_id === 'first-day');

    const getAchievementsResult = await getUserAchievements(TEST_USER_ID);
    logTest('Get User Achievements', getAchievementsResult.data && getAchievementsResult.data.length > 0);

    // ========================================================================
    // 7. SUPPLEMENTS TRACKING OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Supplements Tracking Operations...\n');

    const addSupplementResult = await addSupplementTracking({
      user_id: TEST_USER_ID,
      supplement_name: 'Vitamin D3',
      dosage: '5000 IU',
      time_of_day: 'morning'
    });
    logTest('Add Supplement Tracking', addSupplementResult.data && addSupplementResult.data.supplement_name === 'Vitamin D3');

    const getTodaySupplementsResult = await getTodaySupplements(TEST_USER_ID);
    logTest('Get Today Supplements', getTodaySupplementsResult.data && getTodaySupplementsResult.data.length > 0);

    // ========================================================================
    // 8. PROTOCOL TIMER OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Protocol Timer Operations...\n');

    const startTimerResult = await startProtocolTimer({
      user_id: TEST_USER_ID,
      protocol_id: 'breathwork',
      protocol_name: 'Breathwork Session',
      duration_seconds: 600,
      completed: false
    });
    logTest('Start Protocol Timer', startTimerResult.data && startTimerResult.data.protocol_id === 'breathwork');

    if (startTimerResult.data && startTimerResult.data.id) {
      const completeTimerResult = await completeProtocolTimer(startTimerResult.data.id);
      logTest('Complete Protocol Timer', completeTimerResult.data && completeTimerResult.data.completed === true);
    }

    // ========================================================================
    // 9. USER EQUIPMENT OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing User Equipment Operations...\n');

    const markEquipmentResult = await markEquipmentOwned({
      user_id: TEST_USER_ID,
      equipment_id: 'red-light-panel',
      equipment_name: 'Red Light Therapy Panel',
      tier: 'premium'
    });
    logTest('Mark Equipment Owned', markEquipmentResult.data && markEquipmentResult.data.equipment_id === 'red-light-panel');

    const getEquipmentResult = await getUserEquipment(TEST_USER_ID);
    logTest('Get User Equipment', getEquipmentResult.data && getEquipmentResult.data.length > 0);

    // ========================================================================
    // 10. VIDEO PROGRESS OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Video Progress Operations...\n');

    const markVideoResult = await markVideoWatched({
      user_id: TEST_USER_ID,
      video_id: 'morning-routine',
      video_title: 'Morning Routine Protocol',
      category: 'protocols'
    });
    logTest('Mark Video Watched', markVideoResult.data && markVideoResult.data.video_id === 'morning-routine');

    const getVideosResult = await getWatchedVideos(TEST_USER_ID);
    logTest('Get Watched Videos', getVideosResult.data && getVideosResult.data.length > 0);

    // ========================================================================
    // 11. LEGACY PROFILE OPERATIONS
    // ========================================================================
    console.log('\n📋 Testing Legacy Profile Operations...\n');

    const legacyUpsertResult = await upsertProfile(TEST_USER_ID, {
      email: TEST_EMAIL,
      name: 'Test User Updated',
      goals: ['longevity', 'energy', 'focus'],
      experience_level: 'advanced',
      available_time: 90,
      health_conditions: ['none'],
      budget: 'premium'
    });
    logTest('Legacy Upsert Profile', legacyUpsertResult.data !== null);

    const legacyGetResult = await getProfile(TEST_USER_ID);
    logTest('Legacy Get Profile', legacyGetResult.data && legacyGetResult.data.goals.includes('focus'));

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('\n' + '═'.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('═'.repeat(60));
    console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
    console.log(`✓ Passed: ${testResults.passed}`);
    console.log(`✗ Failed: ${testResults.failed}`);
    console.log('═'.repeat(60) + '\n');

    if (testResults.failed === 0) {
      console.log('🎉 ALL TESTS PASSED!');
      console.log('\n✅ Your Neon database is fully configured and working!\n');
      console.log('📱 All app features are now backed by the database:');
      console.log('   • User authentication & profiles');
      console.log('   • Gamification (streaks, points, achievements)');
      console.log('   • Daily metrics tracking');
      console.log('   • Protocol completions');
      console.log('   • Supplement tracking');
      console.log('   • Equipment ownership');
      console.log('   • Video progress');
      console.log('   • Timer sessions\n');
      process.exit(0);
    } else {
      console.log('⚠️  SOME TESTS FAILED');
      console.log('\nFailed tests:');
      testResults.tests.filter(t => !t.passed).forEach(t => {
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
runComprehensiveTests();

