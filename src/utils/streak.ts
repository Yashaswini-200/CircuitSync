/**
 * Streak calculation utilities
 * IMPORTANT: Handles timezone-aware date comparisons
 * Prevents accidental streak resets on day boundaries
 */

import type { StreakData } from '../types/index';

/**
 * Get today's date as ISO string (YYYY-MM-DD format)
 * Uses UTC to ensure consistency across timezones
 * @returns Today's date in YYYY-MM-DD format
 */
export const getTodayDateString = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

/**
 * Get yesterday's date as ISO string
 * @returns Yesterday's date in YYYY-MM-DD format
 */
export const getYesterdayDateString = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

/**
 * Check if a date is today
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns boolean
 */
export const isToday = (dateString: string): boolean => {
  return dateString === getTodayDateString();
};

/**
 * Check if a date is yesterday
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns boolean
 */
export const isYesterday = (dateString: string): boolean => {
  return dateString === getYesterdayDateString();
};

/**
 * Calculate days difference between two dates
 * @param fromDate - ISO date string (YYYY-MM-DD)
 * @param toDate - ISO date string (YYYY-MM-DD)
 * @returns Number of days (positive = toDate is after fromDate)
 */
export const daysBetween = (fromDate: string, toDate: string): number => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  // Use UTC to avoid timezone issues
  const diffMs = to.getTime() - from.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Update streak after user activity
 * CRITICAL LOGIC: Handles multiple daily submissions, missed days, resets
 * @param currentStreak - Current streak data
 * @returns Updated streak data
 */
export const updateStreakAfterActivity = (currentStreak: StreakData): StreakData => {
  const today = getTodayDateString();
  const lastDate = currentStreak.lastActivityDate;

  // Case 1: First activity today (same-day multiple submissions don't reset)
  if (isToday(lastDate)) {
    return currentStreak;
  }

  // Case 2: Activity continues yesterday → today (streak extends)
  if (isYesterday(lastDate)) {
    const newStreak = currentStreak.currentStreak + 1;
    return {
      ...currentStreak,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, currentStreak.longestStreak),
      lastActivityDate: today,
      totalDaysActive: currentStreak.totalDaysActive + 1,
    };
  }

  // Case 3: Gap > 1 day (streak resets)
  // Only add 1 to totalDaysActive if starting fresh
  return {
    ...currentStreak,
    currentStreak: 1,
    lastActivityDate: today,
    totalDaysActive: currentStreak.totalDaysActive + 1,
  };
};

/**
 * Get streak bonus multiplier for XP calculations
 * Higher streaks = better XP multiplier
 * @param streakDays - Current streak days
 * @returns Multiplier (1.0 = no bonus, 1.5 = 50% bonus, etc.)
 */
export const getStreakMultiplier = (streakDays: number): number => {
  if (streakDays <= 0) return 1.0;
  if (streakDays <= 3) return 1.0;
  if (streakDays <= 7) return 1.1;
  if (streakDays <= 14) return 1.2;
  if (streakDays <= 30) return 1.35;
  return 1.5; // Max multiplier at 30+ days
};

/**
 * Check if streak is at risk of breaking
 * Used for warnings/notifications
 * @param lastActivityDate - Last activity date (YYYY-MM-DD)
 * @returns boolean - true if streak will break tomorrow if no activity
 */
export const isStreakAtRisk = (lastActivityDate: string): boolean => {
  // Streak breaks if more than 1 day has passed
  const daysSinceLastActivity = daysBetween(lastActivityDate, getTodayDateString());
  return daysSinceLastActivity >= 1;
};

/**
 * Initialize fresh streak data for a user
 * @param userId - User ID
 * @returns New StreakData
 */
export const initializeStreak = (userId: string): StreakData => {
  return {
    userId,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: '', // Empty until first activity
    totalDaysActive: 0,
  };
};
