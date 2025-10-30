#!/usr/bin/env tsx

/**
 * Database Seeding Script
 * Populates Neon DB with initial reference data and mock users
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import {
  createUser,
  upsertUserProfile,
  updateUserStats,
  addCompletedTask,
  addDailyMetric,
  db
} from '../lib/db';
import { achievementsCatalog } from '../lib/db/schema';

console.log('\n🌱 Starting Database Seeding...\n');
console.log('═'.repeat(60));

async function seedAchievementsCatalog() {
  console.log('\n📋 Seeding Achievements Catalog...\n');

  const achievements = [
    {
      achievementId: 'first-day',
      title: 'First Steps',
      description: 'Complete your first day of protocols',
      icon: '1ST',
      points: 50,
      unlockCriteria: { type: 'first_completion' }
    },
    {
      achievementId: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '7D',
      points: 100,
      unlockCriteria: { type: 'streak', days: 7 }
    },
    {
      achievementId: 'streak-30',
      title: 'Monthly Master',
      description: 'Maintain a 30-day streak',
      icon: '30D',
      points: 300,
      unlockCriteria: { type: 'streak', days: 30 }
    },
    {
      achievementId: 'streak-90',
      title: 'Quarterly Champion',
      description: 'Maintain a 90-day streak',
      icon: '90D',
      points: 1000,
      unlockCriteria: { type: 'streak', days: 90 }
    },
    {
      achievementId: 'all-protocols',
      title: 'Protocol Perfectionist',
      description: 'Complete all daily protocols in one day',
      icon: '100',
      points: 150,
      unlockCriteria: { type: 'all_protocols_one_day' }
    },
    {
      achievementId: 'early-bird',
      title: 'Early Bird',
      description: 'Complete morning protocol before 7 AM',
      icon: 'AM',
      points: 75,
      unlockCriteria: { type: 'time_based', before: '07:00' }
    },
    {
      achievementId: 'cold-plunge-10',
      title: 'Ice Warrior',
      description: 'Complete 10 cold exposure sessions',
      icon: 'ICE',
      points: 200,
      unlockCriteria: { type: 'protocol_count', protocol: 'cold-shower', count: 10 }
    },
    {
      achievementId: 'community-engage',
      title: 'Community Champion',
      description: 'Help 5 members in the community',
      icon: 'COM',
      points: 250,
      unlockCriteria: { type: 'community_interaction', count: 5 }
    },
    {
      achievementId: 'bio-age-reverse',
      title: 'Time Traveler',
      description: 'Reverse your biological age by 5+ years',
      icon: 'AGE',
      points: 500,
      unlockCriteria: { type: 'bio_age_improvement', years: 5 }
    }
  ];

  try {
    for (const achievement of achievements) {
      await db.insert(achievementsCatalog)
        .values(achievement)
        .onConflictDoNothing();
      console.log(`  ✓ ${achievement.title} (${achievement.points} pts)`);
    }
    console.log(`\n✅ Seeded ${achievements.length} achievements`);
  } catch (error) {
    console.error('❌ Error seeding achievements:', error);
  }
}

async function seedMockUsers() {
  console.log('\n👥 Seeding Mock Users...\n');

  const mockUsers = [
    {
      id: 'demo-user-1',
      email: 'demo@alumina.com',
      name: 'Alex Rivera',
      profile: {
        goals: ['longevity', 'energy', 'focus'],
        experienceLevel: 'intermediate' as const,
        availableTime: 60,
        healthConditions: [],
        budget: 'premium' as const
      },
      stats: {
        currentStreak: 12,
        longestStreak: 45,
        totalPoints: 2500,
        level: 3
      }
    },
    {
      id: 'demo-user-2',
      email: 'sarah@alumina.com',
      name: 'Sarah Chen',
      profile: {
        goals: ['sleep', 'stress', 'energy'],
        experienceLevel: 'beginner' as const,
        availableTime: 30,
        healthConditions: [],
        budget: 'intermediate' as const
      },
      stats: {
        currentStreak: 5,
        longestStreak: 8,
        totalPoints: 450,
        level: 1
      }
    },
    {
      id: 'demo-user-3',
      email: 'jordan@alumina.com',
      name: 'Jordan Taylor',
      profile: {
        goals: ['fitness', 'longevity', 'recovery'],
        experienceLevel: 'advanced' as const,
        availableTime: 90,
        healthConditions: [],
        budget: 'premium' as const
      },
      stats: {
        currentStreak: 67,
        longestStreak: 120,
        totalPoints: 8900,
        level: 7
      }
    }
  ];

  try {
    for (const user of mockUsers) {
      // Create user
      const { data: createdUser } = await createUser({
        id: user.id,
        email: user.email,
        name: user.name
      });

      if (createdUser) {
        console.log(`  ✓ Created user: ${user.name} (${user.email})`);

        // Add profile
        await upsertUserProfile(user.id, user.profile);
        console.log(`    → Profile added`);

        // Add stats
        await updateUserStats(user.id, user.stats);
        console.log(`    → Stats: ${user.stats.totalPoints} pts, ${user.stats.currentStreak} day streak`);
      }
    }
    console.log(`\n✅ Seeded ${mockUsers.length} demo users`);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
}

async function seedDemoActivityData() {
  console.log('\n📊 Seeding Demo Activity Data...\n');

  const demoUserId = 'demo-user-1';

  try {
    // Add recent completed tasks
    const tasks = [
      { id: 'morning-light', name: 'Morning Light Exposure', category: 'circadian' },
      { id: 'cold-shower', name: 'Cold Shower', category: 'contrast' },
      { id: 'breathwork', name: 'Breathwork Session', category: 'restoration' },
      { id: 'morning-supps', name: 'Morning Supplements', category: 'supplements' }
    ];

    for (const task of tasks) {
      await addCompletedTask({
        userId: demoUserId,
        taskId: task.id,
        taskName: task.name,
        taskCategory: task.category,
        pointsEarned: 10
      });
    }
    console.log(`  ✓ Added ${tasks.length} completed tasks for today`);

    // Add daily metrics for the past week
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      await addDailyMetric({
        userId: demoUserId,
        date: dateStr,
        energy: Math.floor(Math.random() * 3) + 7, // 7-10
        sleep: Math.floor(Math.random() * 3) + 6, // 6-9
        mood: Math.floor(Math.random() * 3) + 7, // 7-10
        protocolsCompleted: Math.floor(Math.random() * 3) + 4, // 4-7
        notes: i === 0 ? 'Feeling great today!' : undefined
      });
    }
    console.log(`  ✓ Added 7 days of health metrics`);

    console.log('\n✅ Demo activity data seeded');
  } catch (error) {
    console.error('❌ Error seeding activity data:', error);
  }
}

async function main() {
  try {
    await seedAchievementsCatalog();
    await seedMockUsers();
    await seedDemoActivityData();

    console.log('\n' + '═'.repeat(60));
    console.log('✅ DATABASE SEEDING COMPLETE!');
    console.log('═'.repeat(60));
    console.log('\n📱 Your database now has:');
    console.log('   • 9 Achievement definitions');
    console.log('   • 3 Demo users with profiles');
    console.log('   • Recent activity data');
    console.log('   • Daily health metrics\n');
    console.log('💡 Demo Login Credentials:');
    console.log('   • demo@alumina.com (Alex Rivera - Active user)');
    console.log('   • sarah@alumina.com (Sarah Chen - Beginner)');
    console.log('   • jordan@alumina.com (Jordan Taylor - Advanced)\n');
    console.log('🚀 Run: npm run dev');
    console.log('📊 Or view data: npm run db:studio\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();

