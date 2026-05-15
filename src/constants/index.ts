import type { LevelInfo } from '../types/index';

// XP System Constants
export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Beginner Debugger', minXP: 0, maxXP: 100 },
  { level: 2, title: 'Register Rookie', minXP: 100, maxXP: 300 },
  { level: 3, title: 'Interrupt Survivor', minXP: 300, maxXP: 600 },
  { level: 4, title: 'Firmware Warrior', minXP: 600, maxXP: 1200 },
  { level: 5, title: 'Embedded Beast', minXP: 1200, maxXP: Infinity },
];

// Streak System Constants
export const STREAK_CONFIG = {
  DAILY_CHECK_IN_XP: 10, // XP for daily check-in
  TASK_COMPLETION_XP_BASE: 20,
  STREAK_BONUS_MULTIPLIER: 1.1, // 10% bonus per streak day
  TIMEZONE: 'UTC', // Can be changed per user
};

// Default Task Templates
export const TASK_TEMPLATES = {
  embedded: [
    { title: 'Review ARM Assembly', description: 'Study 1 page of ARM ISA', xpReward: 25 },
    { title: 'GPIO Exercise', description: 'Complete 1 GPIO manipulation problem', xpReward: 30 },
    { title: 'Interrupt Handler Practice', description: 'Write 1 interrupt handler', xpReward: 40 },
  ],
  vlsi: [
    { title: 'Verilog Practice', description: 'Write 1 Verilog module', xpReward: 25 },
    { title: 'Logic Design Review', description: 'Study 1 logic gate circuit', xpReward: 30 },
    { title: 'FPGA Implementation', description: 'Implement 1 design on FPGA', xpReward: 40 },
  ],
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  APP_STATE: 'circuitsync_app_state',
  USER_PREFS: 'circuitsync_user_prefs',
  STREAK_DATA: 'circuitsync_streak_data',
  XP_DATA: 'circuitsync_xp_data',
};
