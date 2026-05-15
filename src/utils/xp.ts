/**
 * XP and leveling system utilities
 * Handles XP calculations, level progression, and XP-to-level conversions
 */

import { LEVELS } from '../constants/index';
import type { XPData, LevelInfo } from '../types/index';

/**
 * Get level info for a specific level
 * @param level - Level number
 * @returns LevelInfo or undefined if invalid
 */
export const getLevelInfo = (level: number): LevelInfo | undefined => {
  return LEVELS.find((l) => l.level === level);
};

/**
 * Get total XP required to reach a specific level
 * @param level - Target level
 * @returns Total XP needed from level 1
 */
export const getTotalXPForLevel = (level: number): number => {
  const targetLevel = Math.min(level, LEVELS.length);
  const levelInfo = LEVELS[targetLevel - 1];
  return levelInfo ? levelInfo.minXP : 0;
};

/**
 * Calculate current level from total XP
 * @param totalXP - Total accumulated XP
 * @returns Current level (1-5)
 */
export const calculateLevelFromXP = (totalXP: number): number => {
  let currentLevel = 1;

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].minXP) {
      currentLevel = LEVELS[i].level;
      break;
    }
  }

  return currentLevel;
};

/**
 * Calculate progress percentage to next level (0-100)
 * @param totalXP - Total accumulated XP
 * @returns Progress percentage (0-100)
 */
export const calculateLevelProgress = (totalXP: number): number => {
  const currentLevel = calculateLevelFromXP(totalXP);
  const currentLevelInfo = LEVELS[currentLevel - 1];
  const nextLevelInfo = LEVELS[currentLevel];

  if (!nextLevelInfo || nextLevelInfo.maxXP === Infinity) {
    return 100; // Max level
  }

  const xpInCurrentLevel = totalXP - currentLevelInfo.minXP;
  const xpNeededForLevel = nextLevelInfo.minXP - currentLevelInfo.minXP;

  const progress = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForLevel) * 100));
  return Math.round(progress);
};

/**
 * Calculate XP reward for task completion
 * Includes streak bonus multiplier
 * @param baseXP - Base XP reward
 * @param streakBonus - Streak multiplier (1.0 = no bonus)
 * @returns Final XP to award
 */
export const calculateTaskXP = (baseXP: number, streakBonus: number = 1.0): number => {
  return Math.round(baseXP * streakBonus);
};

/**
 * Add XP to user's total and calculate new level data
 * @param currentXPData - Current XP data
 * @param xpToAdd - XP to add
 * @param streakMultiplier - Streak bonus multiplier
 * @returns Updated XP data
 */
export const addXPAndUpdateLevel = (
  currentXPData: XPData,
  xpToAdd: number,
  streakMultiplier: number = 1.0
): XPData => {
  const finalXP = calculateTaskXP(xpToAdd, streakMultiplier);
  const newTotalXP = currentXPData.totalXP + finalXP;
  const newLevel = calculateLevelFromXP(newTotalXP);
  const levelProgress = calculateLevelProgress(newTotalXP);

  return {
    userId: currentXPData.userId,
    totalXP: newTotalXP,
    level: newLevel,
    levelProgress,
  };
};

/**
 * Get XP needed for next level
 * @param currentLevel - Current level
 * @returns XP needed to reach next level (or 0 if at max)
 */
export const getXPForNextLevel = (currentLevel: number): number => {
  if (currentLevel >= LEVELS.length) {
    return 0; // Already at max level
  }

  const currentLevelInfo = LEVELS[currentLevel - 1];
  const nextLevelInfo = LEVELS[currentLevel];

  if (!nextLevelInfo) return 0;

  return nextLevelInfo.minXP - currentLevelInfo.minXP;
};

/**
 * Get remaining XP to next level from total XP
 * @param totalXP - Total accumulated XP
 * @returns XP needed to reach next level
 */
export const getRemainingXPToNextLevel = (totalXP: number): number => {
  const currentLevel = calculateLevelFromXP(totalXP);

  if (currentLevel >= LEVELS.length) {
    return 0; // At max level
  }

  const nextLevelInfo = LEVELS[currentLevel];
  return Math.max(0, nextLevelInfo.minXP - totalXP);
};

/**
 * Initialize fresh XP data for a user
 * @param userId - User ID
 * @returns New XPData
 */
export const initializeXPData = (userId: string): XPData => {
  return {
    userId,
    totalXP: 0,
    level: 1,
    levelProgress: 0,
  };
};

/**
 * Get level title from total XP
 * @param totalXP - Total accumulated XP
 * @returns Level title (e.g., "Beginner Debugger")
 */
export const getLevelTitle = (totalXP: number): string => {
  const level = calculateLevelFromXP(totalXP);
  const levelInfo = LEVELS[level - 1];
  return levelInfo ? levelInfo.title : 'Unknown Level';
};
