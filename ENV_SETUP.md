# Environment Variables Setup Guide

## Quick Setup

1. Create a `.env.local` file in the project root (it's already in `.gitignore`)
2. Copy the environment variables below into your `.env.local` file

---

## Environment Variables

### Copy these into `.env.local`:

```env
# Neon Database
DATABASE_URL='postgresql://neondb_owner:npg_6Q2jgMDxFVNI@ep-young-fog-a4qtobep-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'

# Stack Auth (Neon Auth)
NEXT_PUBLIC_STACK_PROJECT_ID='86b2c6f2-ad1c-49d7-849a-bd97b2948d40'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='pck_4aq7sjhggt24syv1m2wrp9ms4p8n8natjwgyh2m6pzc7r'
STACK_SECRET_SERVER_KEY='ssk_m7j2qac4env4t1nmspnhaj0h3ystfeawc5943mmzgs7gr'
```

---

## Setup Instructions

### Step 1: Create .env.local file

```bash
# From project root
touch .env.local
```

### Step 2: Add the environment variables

Open `.env.local` in your editor and paste:

```env
DATABASE_URL='postgresql://neondb_owner:npg_6Q2jgMDxFVNI@ep-young-fog-a4qtobep-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
NEXT_PUBLIC_STACK_PROJECT_ID='86b2c6f2-ad1c-49d7-849a-bd97b2948d40'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='pck_4aq7sjhggt24syv1m2wrp9ms4p8n8natjwgyh2m6pzc7r'
STACK_SECRET_SERVER_KEY='ssk_m7j2qac4env4t1nmspnhaj0h3ystfeawc5943mmzgs7gr'
```

### Step 3: Verify setup

```bash
# Restart your dev server
npm run dev
```

You should see NO warnings about missing environment variables.

---

## What Each Variable Does

### DATABASE_URL
- **Purpose:** Connection string for Neon PostgreSQL database
- **Used by:** `lib/db.ts` - All database operations
- **Format:** `postgresql://user:password@host/database?sslmode=require`

### NEXT_PUBLIC_STACK_PROJECT_ID
- **Purpose:** Your Stack Auth project identifier
- **Used by:** Stack Auth SDK (client-side)
- **Public:** Yes (safe to expose to browser)

### NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
- **Purpose:** Publishable key for Stack Auth client SDK
- **Used by:** Stack Auth SDK (client-side authentication)
- **Public:** Yes (safe to expose to browser)

### STACK_SECRET_SERVER_KEY
- **Purpose:** Secret key for Stack Auth server-side operations
- **Used by:** Stack Auth SDK (server-side API routes)
- **Security:** NEVER expose this in client-side code or commit to git

---

## Security Notes

### What's Safe to Commit?
- `.env.example` - YES (template with placeholder values)
- `.env.local` - NO (contains real credentials, already in .gitignore)

### Public vs Private Variables
**Public (NEXT_PUBLIC_*):**
- These are exposed to the browser
- Safe to use in client-side React components
- Should not contain sensitive secrets

**Private (no prefix):**
- Only available in server-side code (API routes, server components)
- Never exposed to the browser
- Can contain sensitive secrets

---

## Troubleshooting

### "DATABASE_URL is not set" warning
**Cause:** Environment variable not found  
**Solution:** 
1. Check `.env.local` exists in project root
2. Verify the file contains `DATABASE_URL=...`
3. Restart dev server: `npm run dev`

### Database connection fails
**Cause:** Neon database may be in sleep mode  
**Solution:** Wait 10-20 seconds for Neon to wake up, then try again

### Stack Auth not working
**Cause:** Missing or incorrect Stack Auth credentials  
**Solution:** 
1. Verify all three Stack variables are in `.env.local`
2. Check for typos in the keys
3. Verify keys match your Stack Auth dashboard

---

## For Production (Vercel, Netlify, etc.)

Add these environment variables in your hosting platform's dashboard:

1. Go to your project settings
2. Find "Environment Variables" section
3. Add each variable:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_STACK_PROJECT_ID`
   - `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
   - `STACK_SECRET_SERVER_KEY`

**Note:** Some platforms require redeployment after adding environment variables.

---

## Quick Test

After setup, test your configuration:

```bash
# Start dev server
npm run dev

# In another terminal, test the API
curl http://localhost:3000/api/profile/update?userId=test-123
```

If configured correctly, you'll get a response (even if "Profile not found" - that's OK!).

---

## Need Help?

- [Neon Documentation](https://neon.tech/docs)
- [Stack Auth Documentation](https://docs.stack-auth.com/)
- Check `DATABASE_MIGRATION.md` for full migration guide

