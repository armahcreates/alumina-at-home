import { Type, Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

// ============================================================================
// TYPEBOX VALIDATION SCHEMAS
// ============================================================================

// Experience level enum
export const ExperienceLevelSchema = Type.Union([
  Type.Literal('beginner'),
  Type.Literal('intermediate'),
  Type.Literal('advanced')
]);

// Budget enum
export const BudgetSchema = Type.Union([
  Type.Literal('essential'),
  Type.Literal('intermediate'),
  Type.Literal('premium')
]);

// Time of day enum
export const TimeOfDaySchema = Type.Union([
  Type.Literal('morning'),
  Type.Literal('afternoon'),
  Type.Literal('evening'),
  Type.Literal('bedtime')
]);

// User schema
export const UserSchema = Type.Object({
  id: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
  name: Type.String({ minLength: 1 }),
  hasCompletedOnboarding: Type.Optional(Type.Boolean()),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String()),
  lastLoginAt: Type.Optional(Type.String())
});

// User profile schema
export const UserProfileSchema = Type.Object({
  userId: Type.String({ minLength: 1 }),
  goals: Type.Array(Type.String()),
  experienceLevel: ExperienceLevelSchema,
  availableTime: Type.Number({ minimum: 0 }),
  healthConditions: Type.Array(Type.String()),
  budget: BudgetSchema,
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String())
});

// User stats schema
export const UserStatsSchema = Type.Object({
  userId: Type.String({ minLength: 1 }),
  currentStreak: Type.Number({ minimum: 0 }),
  longestStreak: Type.Number({ minimum: 0 }),
  totalPoints: Type.Number({ minimum: 0 }),
  level: Type.Number({ minimum: 1 }),
  lastActivityDate: Type.Optional(Type.String()),
  totalProtocolsCompleted: Type.Number({ minimum: 0 }),
  totalDaysActive: Type.Number({ minimum: 0 }),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String())
});

// Daily metric schema
export const DailyMetricSchema = Type.Object({
  id: Type.Optional(Type.Number()),
  userId: Type.String({ minLength: 1 }),
  date: Type.String(),
  energy: Type.Number({ minimum: 1, maximum: 10 }),
  sleep: Type.Number({ minimum: 1, maximum: 10 }),
  mood: Type.Number({ minimum: 1, maximum: 10 }),
  notes: Type.Optional(Type.String()),
  protocolsCompleted: Type.Number({ minimum: 0 }),
  createdAt: Type.Optional(Type.String())
});

// Completed task schema
export const CompletedTaskSchema = Type.Object({
  id: Type.Optional(Type.Number()),
  userId: Type.String({ minLength: 1 }),
  taskId: Type.String({ minLength: 1 }),
  taskName: Type.String({ minLength: 1 }),
  taskCategory: Type.Optional(Type.String()),
  pointsEarned: Type.Number({ minimum: 0 }),
  completedAt: Type.Optional(Type.String()),
  date: Type.Optional(Type.String())
});

// Achievement schema
export const AchievementSchema = Type.Object({
  id: Type.Optional(Type.Number()),
  userId: Type.String({ minLength: 1 }),
  achievementId: Type.String({ minLength: 1 }),
  achievementTitle: Type.String({ minLength: 1 }),
  achievementDescription: Type.Optional(Type.String()),
  pointsEarned: Type.Number({ minimum: 0 }),
  unlockedAt: Type.Optional(Type.String())
});

// Supplement tracking schema
export const SupplementTrackingSchema = Type.Object({
  id: Type.Optional(Type.Number()),
  userId: Type.String({ minLength: 1 }),
  supplementName: Type.String({ minLength: 1 }),
  dosage: Type.Optional(Type.String()),
  timeOfDay: Type.Optional(TimeOfDaySchema),
  takenAt: Type.Optional(Type.String()),
  date: Type.Optional(Type.String())
});

// Protocol timer schema
export const ProtocolTimerSchema = Type.Object({
  id: Type.Optional(Type.Number()),
  userId: Type.String({ minLength: 1 }),
  protocolId: Type.String({ minLength: 1 }),
  protocolName: Type.String({ minLength: 1 }),
  durationSeconds: Type.Number({ minimum: 1 }),
  completed: Type.Boolean(),
  startedAt: Type.Optional(Type.String()),
  completedAt: Type.Optional(Type.String())
});

// User equipment schema
export const UserEquipmentSchema = Type.Object({
  id: Type.Optional(Type.Number()),
  userId: Type.String({ minLength: 1 }),
  equipmentId: Type.String({ minLength: 1 }),
  equipmentName: Type.String({ minLength: 1 }),
  tier: Type.Optional(BudgetSchema),
  markedOwnedAt: Type.Optional(Type.String())
});

// Video progress schema
export const VideoProgressSchema = Type.Object({
  id: Type.Optional(Type.Number()),
  userId: Type.String({ minLength: 1 }),
  videoId: Type.String({ minLength: 1 }),
  videoTitle: Type.String({ minLength: 1 }),
  category: Type.Optional(Type.String()),
  watchedAt: Type.Optional(Type.String())
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type User = Static<typeof UserSchema>;
export type UserProfile = Static<typeof UserProfileSchema>;
export type UserStats = Static<typeof UserStatsSchema>;
export type DailyMetric = Static<typeof DailyMetricSchema>;
export type CompletedTask = Static<typeof CompletedTaskSchema>;
export type Achievement = Static<typeof AchievementSchema>;
export type SupplementTracking = Static<typeof SupplementTrackingSchema>;
export type ProtocolTimer = Static<typeof ProtocolTimerSchema>;
export type UserEquipment = Static<typeof UserEquipmentSchema>;
export type VideoProgress = Static<typeof VideoProgressSchema>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export function validateUser(data: unknown): User {
  if (!Value.Check(UserSchema, data)) {
    const errors = [...Value.Errors(UserSchema, data)];
    throw new Error(`User validation failed: ${JSON.stringify(errors)}`);
  }
  return data as User;
}

export function validateUserProfile(data: unknown): UserProfile {
  if (!Value.Check(UserProfileSchema, data)) {
    const errors = [...Value.Errors(UserProfileSchema, data)];
    throw new Error(`UserProfile validation failed: ${JSON.stringify(errors)}`);
  }
  return data as UserProfile;
}

export function validateDailyMetric(data: unknown): DailyMetric {
  if (!Value.Check(DailyMetricSchema, data)) {
    const errors = [...Value.Errors(DailyMetricSchema, data)];
    throw new Error(`DailyMetric validation failed: ${JSON.stringify(errors)}`);
  }
  return data as DailyMetric;
}

export function validateCompletedTask(data: unknown): CompletedTask {
  if (!Value.Check(CompletedTaskSchema, data)) {
    const errors = [...Value.Errors(CompletedTaskSchema, data)];
    throw new Error(`CompletedTask validation failed: ${JSON.stringify(errors)}`);
  }
  return data as CompletedTask;
}

// Generic validator
export function validate<T>(schema: TSchema, data: unknown): T {
  if (!Value.Check(schema, data)) {
    const errors = [...Value.Errors(schema, data)];
    throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
  }
  return data as T;
}

import type { TSchema } from '@sinclair/typebox';

