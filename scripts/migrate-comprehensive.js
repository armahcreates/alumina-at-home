#!/usr/bin/env node

/**
 * Comprehensive Database Migration Script
 * Migrates all tables needed for Alumina At Home app
 */

const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL not found in environment variables');
  console.error('Make sure .env.local exists and contains DATABASE_URL');
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

async function runComprehensiveMigration() {
  try {
    console.log('🔄 Starting COMPREHENSIVE database migration...\n');
    console.log('📊 This will create all tables needed for the app:\n');
    console.log('   1. users - Core user information');
    console.log('   2. user_profiles - Onboarding data');
    console.log('   3. user_stats - Gamification (streaks, points)');
    console.log('   4. daily_metrics - Daily tracking');
    console.log('   5. completed_tasks - Protocol completions');
    console.log('   6. achievements - Unlocked achievements');
    console.log('   7. supplements_tracking - Supplement intake');
    console.log('   8. protocol_timers - Timer sessions');
    console.log('   9. user_equipment - Owned equipment');
    console.log('   10. video_progress - Video viewing');
    console.log('   11. achievements_catalog - Achievement definitions\n');

    // Read schema file
    const schemaPath = path.join(__dirname, '../database/schema-comprehensive.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📄 Schema file loaded from:', schemaPath);
    console.log('🔗 Connecting to Neon database...\n');

    const client = await pool.connect();
    
    try {
      // Execute schema as a single query
      console.log('📝 Executing comprehensive schema migration...\n');
      await client.query(schema);
      console.log('✓ Schema executed successfully\n');
      
      // Verify tables were created
      console.log('🔍 Verifying migration...\n');
      const result = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name
      `);

      console.log('✓ Tables created:');
      result.rows.forEach((row, index) => {
        console.log(`   ${index + 1}. ${row.table_name}`);
      });
      console.log('');

      // Show statistics
      const tableCount = result.rows.length;
      console.log('📊 Migration Statistics:');
      console.log(`   Total Tables: ${tableCount}`);
      
      // Check for indexes
      const indexResult = await client.query(`
        SELECT COUNT(*) as count
        FROM pg_indexes
        WHERE schemaname = 'public'
      `);
      console.log(`   Total Indexes: ${indexResult.rows[0].count}`);

      // Check for triggers
      const triggerResult = await client.query(`
        SELECT COUNT(*) as count
        FROM information_schema.triggers
        WHERE trigger_schema = 'public'
      `);
      console.log(`   Total Triggers: ${triggerResult.rows[0].count}`);

      // Check for functions
      const functionResult = await client.query(`
        SELECT COUNT(*) as count
        FROM information_schema.routines
        WHERE routine_schema = 'public'
      `);
      console.log(`   Total Functions: ${functionResult.rows[0].count}\n`);

      // Show achievements catalog
      const achievementsResult = await client.query(`
        SELECT COUNT(*) as count FROM achievements_catalog
      `);
      console.log(`✓ ${achievementsResult.rows[0].count} achievements loaded in catalog\n`);

      console.log('═'.repeat(60));
      console.log('✅ COMPREHENSIVE DATABASE MIGRATION COMPLETED!');
      console.log('═'.repeat(60));
      console.log('\n📱 Your app now has full database support for:');
      console.log('   • User Authentication & Profiles');
      console.log('   • Daily Protocol Tracking');
      console.log('   • Gamification (Streaks, Points, Levels)');
      console.log('   • Health Metrics (Energy, Sleep, Mood)');
      console.log('   • Achievement System');
      console.log('   • Supplement Tracking');
      console.log('   • Equipment Ownership');
      console.log('   • Video Progress');
      console.log('   • Timer Sessions\n');

      console.log('Next steps:');
      console.log('  1. Run: npm run dev');
      console.log('  2. Test the API: http://localhost:3000');
      console.log('  3. Check database in Neon Console\n');
      
    } finally {
      client.release();
      await pool.end();
    }
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    if (error.detail) {
      console.error('Details:', error.detail);
    }
    if (error.hint) {
      console.error('Hint:', error.hint);
    }
    console.error('\n💡 If tables already exist, this is expected.');
    console.error('   The schema uses IF NOT EXISTS to prevent errors.\n');
    process.exit(1);
  }
}

// Run migration
runComprehensiveMigration();

