# Database Migration: Supabase to Neon DB

## Migration Summary

**Date:** October 30, 2025  
**Status:** Complete  
**Database:** Neon PostgreSQL with Stack Auth

---

## What Changed

### Removed
- `@supabase/supabase-js` package
- `lib/supabase.ts` file
- Supabase environment variables

### Added
- `@neondatabase/serverless` package
- `@stackframe/stack` package (Stack Auth)
- `lib/db.ts` - New Neon database client
- `database/schema.sql` - Database schema migration file

### Updated
- `app/api/profile/update/route.ts` - Now uses Neon DB client
- `lib/profileMachine.ts` - Imports from new db.ts file
- `package.json` - Updated dependencies

---

## Environment Variables

### Required Variables

Create a `.env.local` file in the project root with:

```env
# Neon Database
DATABASE_URL='your_neon_database_connection_string'

# Stack Auth (Neon Auth)
NEXT_PUBLIC_STACK_PROJECT_ID='your_stack_project_id'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='your_stack_publishable_key'
STACK_SECRET_SERVER_KEY='your_stack_secret_key'
```

### Getting Your Credentials

1. **Neon Database:**
   - Go to [Neon Console](https://console.neon.tech/)
   - Copy your connection string (pooler recommended)

2. **Stack Auth:**
   - Go to [Stack Auth Dashboard](https://app.stack-auth.com/)
   - Copy your project credentials

---

## Database Setup

### 1. Create Database Schema

Run the migration file on your Neon database:

```bash
# Option 1: Using psql
psql $DATABASE_URL -f database/schema.sql

# Option 2: Using Neon SQL Editor
# Copy and paste contents of database/schema.sql into Neon Console SQL Editor
```

### 2. Verify Schema

Check that the `profiles` table was created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'profiles';
```

---

## Database Schema

### Profiles Table

```sql
CREATE TABLE profiles (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  goals TEXT[] DEFAULT '{}',
  experience_level VARCHAR(50) DEFAULT 'beginner',
  available_time INTEGER DEFAULT 0,
  health_conditions TEXT[] DEFAULT '{}',
  budget VARCHAR(50) DEFAULT 'essential',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id` - User ID from Stack Auth
- `email` - User's email address
- `name` - User's display name
- `goals` - Array of user's wellness goals
- `experience_level` - beginner | intermediate | advanced
- `available_time` - Minutes available per day
- `health_conditions` - Array of health conditions
- `budget` - essential | intermediate | premium
- `created_at` - Timestamp when profile was created
- `updated_at` - Timestamp when profile was last updated (auto-updated)

---

## API Changes

### No Breaking Changes

The API endpoints remain the same:

- `POST /api/profile/update` - Create/update profile
- `GET /api/profile/update?userId={id}` - Get profile

Request/response formats are unchanged.

---

## Migration Benefits

1. **Performance:** Neon's serverless Postgres with auto-scaling
2. **Cost:** Pay-per-use pricing, free tier available
3. **Modern Stack:** Native PostgreSQL with modern tooling
4. **Authentication:** Integrated Stack Auth for seamless user management
5. **Developer Experience:** Standard SQL queries, no proprietary API

---

## Testing

### 1. Test Database Connection

```bash
npm run dev
```

The app should start without Supabase environment variable warnings.

### 2. Test Profile API

```bash
# Create/update profile
curl -X POST http://localhost:3000/api/profile/update \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-123",
    "email": "test@example.com",
    "name": "Test User",
    "goals": ["longevity", "energy"],
    "experience_level": "beginner"
  }'

# Get profile
curl http://localhost:3000/api/profile/update?userId=test-user-123
```

---

## Troubleshooting

### Connection Issues

**Error:** `DATABASE_URL environment variable is not set`
- **Solution:** Check `.env.local` file exists and contains `DATABASE_URL`

**Error:** `connection timeout`
- **Solution:** Verify Neon database is active (may be in sleep mode)

### Schema Issues

**Error:** `relation "profiles" does not exist`
- **Solution:** Run the schema migration file: `psql $DATABASE_URL -f database/schema.sql`

### Authentication Issues

**Error:** Stack Auth not working
- **Solution:** Verify all three Stack Auth environment variables are set correctly

---

## Rollback Plan

If you need to rollback to Supabase:

1. Reinstall Supabase:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Restore `lib/supabase.ts` from git history:
   ```bash
   git checkout HEAD~1 -- lib/supabase.ts
   ```

3. Revert import changes in `app/api/profile/update/route.ts` and `lib/profileMachine.ts`

4. Update environment variables back to Supabase credentials

---

## Next Steps

1. Update authentication flow to use Stack Auth
2. Implement user session management
3. Add more database tables as needed (achievements, progress, etc.)
4. Set up database backups in Neon Console
5. Configure branch databases for development/staging

---

## Resources

- [Neon Documentation](https://neon.tech/docs)
- [Stack Auth Documentation](https://docs.stack-auth.com/)
- [@neondatabase/serverless](https://www.npmjs.com/package/@neondatabase/serverless)
- [Neon Serverless Driver](https://neon.tech/docs/serverless/serverless-driver)

---

**Migration Complete!** Your app now uses Neon PostgreSQL with Stack Auth.

