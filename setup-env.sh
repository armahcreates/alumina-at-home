#!/bin/bash

# Environment Setup Script for Alumina At Home
# This script creates the .env.local file with the correct environment variables

echo "Setting up environment variables for Alumina At Home..."
echo ""

# Create .env.local file
cat > .env.local << 'EOF'
# Neon Database
DATABASE_URL='postgresql://neondb_owner:npg_6Q2jgMDxFVNI@ep-young-fog-a4qtobep-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'

# Stack Auth (Neon Auth)
NEXT_PUBLIC_STACK_PROJECT_ID='86b2c6f2-ad1c-49d7-849a-bd97b2948d40'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='pck_4aq7sjhggt24syv1m2wrp9ms4p8n8natjwgyh2m6pzc7r'
STACK_SECRET_SERVER_KEY='ssk_m7j2qac4env4t1nmspnhaj0h3ystfeawc5943mmzgs7gr'
EOF

echo "✓ Created .env.local file with environment variables"
echo ""
echo "Environment variables configured:"
echo "  - DATABASE_URL (Neon PostgreSQL)"
echo "  - NEXT_PUBLIC_STACK_PROJECT_ID"
echo "  - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY"
echo "  - STACK_SECRET_SERVER_KEY"
echo ""
echo "Next steps:"
echo "  1. Run: npm run dev"
echo "  2. Visit: http://localhost:3000"
echo ""
echo "See ENV_SETUP.md for more details."

