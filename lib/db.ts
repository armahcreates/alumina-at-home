// Legacy exports - now using Drizzle ORM
// This file is kept for backwards compatibility

// Export database client and schema
export { db } from './db/index';
export * from './db/schema';

// Export all database operations
export * from './db/operations';

// Export validation schemas (with different naming to avoid conflicts)
export {
  UserSchema,
  UserProfileSchema,
  UserStatsSchema,
  DailyMetricSchema,
  CompletedTaskSchema,
  AchievementSchema,
  SupplementTrackingSchema,
  ProtocolTimerSchema,
  UserEquipmentSchema,
  VideoProgressSchema,
  ExperienceLevelSchema,
  BudgetSchema,
  TimeOfDaySchema,
  validate,
  validateUser,
  validateUserProfile,
  validateDailyMetric,
  validateCompletedTask
} from './db/validation';
