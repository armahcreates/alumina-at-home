=============================================================================
ENVIRONMENT SETUP - QUICK START
=============================================================================

OPTION 1: Automatic Setup (Recommended)
----------------------------------------
Run this command from the project root:

    ./setup-env.sh

This will automatically create .env.local with all required variables.


OPTION 2: Manual Setup
-----------------------
1. Create .env.local file in project root:
   
   touch .env.local

2. Copy and paste this into .env.local:

DATABASE_URL='postgresql://neondb_owner:npg_6Q2jgMDxFVNI@ep-young-fog-a4qtobep-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
NEXT_PUBLIC_STACK_PROJECT_ID='86b2c6f2-ad1c-49d7-849a-bd97b2948d40'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='pck_4aq7sjhggt24syv1m2wrp9ms4p8n8natjwgyh2m6pzc7r'
STACK_SECRET_SERVER_KEY='ssk_m7j2qac4env4t1nmspnhaj0h3ystfeawc5943mmzgs7gr'


VERIFY SETUP
------------
After creating .env.local, verify it works:

    npm run dev

You should NOT see any warnings about missing environment variables.


DATABASE SETUP
--------------
Before using the app, run the database migration:

    psql $DATABASE_URL -f database/schema.sql

Or copy the SQL from database/schema.sql into Neon Console SQL Editor.


NEED HELP?
----------
See these files for detailed documentation:
- ENV_SETUP.md - Detailed environment setup guide
- DATABASE_MIGRATION.md - Complete database migration guide

=============================================================================

