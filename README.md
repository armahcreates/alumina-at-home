# Alumina At Home

A comprehensive mobile-first wellness platform for implementing the Alumina Protocol - a science-backed longevity and wellness system.

## Overview

**Alumina At Home** is the product that delivers the **Alumina Protocol** - an evidence-based longevity program inspired by Tulum's premier integrative wellness resort. Users transform their homes into personal wellness sanctuaries through daily protocols, environment optimization, and sustainable habits.

## Features Built (Phase 1 MVP)

### Authentication & Onboarding
- **Login/Signup Flow** - Email-based authentication with social login placeholders
- **5-Step Personalized Questionnaire**:
  1. Name collection
  2. Goal selection (8 wellness goals)
  3. Experience level (Beginner/Intermediate/Advanced)
  4. Time commitment (15-120 min/day)
  5. Equipment budget (Essential/Intermediate/Premium)
- **Personalized Protocol Generation** based on user responses

### Dashboard & Daily Protocols
- **Personalized Welcome** with user's name
- **Daily Protocol Checklist** with 7 time-based protocols
- **Interactive Timers** for each protocol with visual countdown
- **Progress Ring** showing daily completion rate
- **Quick Stats** cards for Energy and Sleep
- **Points & Streak** tracking in header

### Gamification System
- **Streak Counter** 🔥 displayed in header
- **Points System** ⭐ with rewards
- **Persistent State** using Zustand + localStorage
- **Achievement Tracking** with milestone celebrations

### Protocol Library
- **6 Core Protocols** with full details
- **Expandable Cards** with steps and benefits
- **Category Filters** (Foundation/Intermediate/Advanced)
- **Start Protocol** buttons with timer integration

### Environment Optimization
- **Room-by-Room Guidance** for 4 spaces
- **Optimization Scores** for each room
- **Actionable Recommendations** with priority levels

### Supplement Tracker
- **Time-Based Schedules** (Morning/Afternoon/Evening/Bedtime)
- **Foundation Longevity Stack** with 11 supplements
- **Interactive Checklists** with completion tracking

### Progress Tracking
- **Streak System** with longest/current streaks
- **Weekly Activity Chart**
- **6 Key Health Metrics** with trends
- **Biological Age Calculator**

### Video Library
- **6 Protocol Videos** with embedded ReactPlayer
- **Category Filters** for easy navigation
- **Full-screen video modal**

### Equipment Guide
- **3-Tier System** (Essential/Intermediate/Premium)
- **6 Curated Equipment Items** with benefits & buy links
- **"Mark as Owned" functionality**

### Achievements System
- **9 Unlockable Achievements** with point rewards
- **Modal Display** with unlock status

## 🎨 Design System

### Color Palette
- **Primary**: `#235B4E` (Deep Teal)
- **Accent**: `#EFC2B3` (Soft Peach)
- Calming, spa-like aesthetic

### Mobile-First
- Bottom Navigation (6 tabs)
- Touch-optimized interactions
- Responsive layouts

## 🛠 Tech Stack

- **Next.js 15.5.4** (App Router)
- **React 19** with TypeScript
- **Tailwind CSS**
- **Zustand** (state management)
- **Framer Motion** (animations)
- **React Player** (video)

## 🚦 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3007](http://localhost:3007)

### First-Time Flow
1. Sign Up → 2. Complete Onboarding → 3. Start Protocols

## 📊 Data Persistence

All data stored in localStorage via Zustand:
- User profile & auth
- Completed tasks
- Streaks & points
- Achievements

## 🔮 Phase 2 Features

- Real authentication (NextAuth)
- Backend database
- Wearable integration
- Community features
- Push notifications
- Payment processing

---

**Built for longevity and optimal health** 🌿
