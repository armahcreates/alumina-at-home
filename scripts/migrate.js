#!/usr/bin/env node

/**
 * Database Migration Script
 * Runs the schema.sql file against Neon database
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

async function runMigration() {
  try {
    console.log('🔄 Starting database migration...\n');

    // Read schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📄 Schema file loaded from:', schemaPath);
    console.log('🔗 Connecting to Neon database...\n');

    // Execute the entire schema using Pool
    console.log(`📝 Executing schema migration...\n`);
    
    const client = await pool.connect();
    
    try {
      // Execute schema as a single query
      await client.query(schema);
      console.log('✓ Schema executed successfully\n');
      
      // Verify table was created
      console.log('🔍 Verifying migration...');
      const result = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'profiles'
      `);

      if (result.rows.length > 0) {
        console.log('✓ Migration verified: profiles table exists\n');
      } else {
        throw new Error('Migration verification failed: profiles table not found');
      }

      // Show table structure
      console.log('📋 Table structure:');
      const columns = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = 'profiles'
        ORDER BY ordinal_position
      `);

      console.table(columns.rows);

      console.log('\n✅ Database migration completed successfully!');
      console.log('\nNext steps:');
      console.log('  1. Run: npm run dev');
      console.log('  2. Test the API: http://localhost:3000/api/profile/update');
      
    } finally {
      client.release();
      await pool.end();
    }
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    if (error.detail) {
      console.error('Details:', error.detail);
    }
    process.exit(1);
  }
}

// Run migration
runMigration();

