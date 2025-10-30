#!/usr/bin/env node

/**
 * Database Test Script
 * Tests database connection and CRUD operations
 */

const { neon, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL not found');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function testDatabase() {
  try {
    console.log('🧪 Testing Neon Database Connection...\n');

    // Test 1: Create a test profile
    console.log('Test 1: Creating test profile...');
    const testUserId = `test-${Date.now()}`;
    const testProfile = {
      id: testUserId,
      email: 'test@alumina.app',
      name: 'Test User',
      goals: ['longevity', 'energy'],
      experience_level: 'beginner',
      available_time: 30,
      health_conditions: [],
      budget: 'essential'
    };

    const insertResult = await sql`
      INSERT INTO profiles (
        id, email, name, goals, experience_level,
        available_time, health_conditions, budget
      ) VALUES (
        ${testProfile.id},
        ${testProfile.email},
        ${testProfile.name},
        ${testProfile.goals},
        ${testProfile.experience_level},
        ${testProfile.available_time},
        ${testProfile.health_conditions},
        ${testProfile.budget}
      )
      RETURNING *
    `;

    console.log('✓ Profile created successfully');
    console.log('  User ID:', insertResult[0].id);
    console.log('  Email:', insertResult[0].email, '\n');

    // Test 2: Read the profile
    console.log('Test 2: Reading profile...');
    const selectResult = await sql`
      SELECT * FROM profiles WHERE id = ${testUserId}
    `;

    console.log('✓ Profile retrieved successfully');
    console.log('  Name:', selectResult[0].name);
    console.log('  Goals:', selectResult[0].goals.join(', '), '\n');

    // Test 3: Update the profile
    console.log('Test 3: Updating profile...');
    const updateResult = await sql`
      UPDATE profiles
      SET name = 'Updated Test User',
          goals = ${['longevity', 'energy', 'fitness']},
          experience_level = 'intermediate'
      WHERE id = ${testUserId}
      RETURNING *
    `;

    console.log('✓ Profile updated successfully');
    console.log('  New name:', updateResult[0].name);
    console.log('  New goals:', updateResult[0].goals.join(', '));
    console.log('  New level:', updateResult[0].experience_level, '\n');

    // Test 4: Delete the test profile
    console.log('Test 4: Cleaning up test profile...');
    await sql`
      DELETE FROM profiles WHERE id = ${testUserId}
    `;

    console.log('✓ Test profile deleted\n');

    // Test 5: Verify deletion
    console.log('Test 5: Verifying deletion...');
    const verifyResult = await sql`
      SELECT * FROM profiles WHERE id = ${testUserId}
    `;

    if (verifyResult.length === 0) {
      console.log('✓ Deletion verified\n');
    } else {
      throw new Error('Deletion verification failed');
    }

    // Summary
    console.log('═'.repeat(50));
    console.log('✅ ALL TESTS PASSED!');
    console.log('═'.repeat(50));
    console.log('\nDatabase Status:');
    console.log('  ✓ Connection: Working');
    console.log('  ✓ INSERT: Working');
    console.log('  ✓ SELECT: Working');
    console.log('  ✓ UPDATE: Working');
    console.log('  ✓ DELETE: Working');
    console.log('\n🎉 Database is fully operational!\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.detail) {
      console.error('Details:', error.detail);
    }
    process.exit(1);
  }
}

// Run tests
testDatabase();

