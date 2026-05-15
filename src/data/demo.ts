/**
 * Demo data seeding for development/testing
 * Helps verify the dashboard works with real data
 */

import type { User, Task } from '../types/index';
import { STORAGE_KEYS } from '../constants/index';
import { saveData } from '../utils/storage';

export const DEMO_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Aditya',
    specialization: 'embedded',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-2',
    name: 'Priya',
    specialization: 'vlsi',
    createdAt: new Date().toISOString(),
  },
];

export const DEMO_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'ARM Assembly Study',
    description: 'Review ARM ISA documentation',
    category: 'revision',
    effort: 'medium',
    completed: false,
    xpReward: 25,
    createdAt: new Date().toISOString(),
    userId: 'user-1',
  },
  {
    id: 'task-2',
    title: 'GPIO Exercise',
    description: 'Complete GPIO manipulation problem',
    category: 'coding',
    effort: 'medium',
    completed: true,
    xpReward: 30,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    userId: 'user-1',
  },
  {
    id: 'task-3',
    title: 'Verilog Module',
    description: 'Write a simple Verilog module',
    category: 'project',
    effort: 'high',
    completed: false,
    xpReward: 25,
    createdAt: new Date().toISOString(),
    userId: 'user-2',
  },
];

/**
 * Initialize demo data in localStorage
 * Only use in development!
 */
export const seedDemoData = (): void => {
  const existingState = localStorage.getItem(STORAGE_KEYS.APP_STATE);

  if (existingState) {
    console.log('Demo data already exists, skipping seed');
    return;
  }

  const demoState = {
    users: DEMO_USERS,
    tasks: DEMO_TASKS,
    streakData: {
      'user-1': {
        userId: 'user-1',
        currentStreak: 3,
        longestStreak: 5,
        lastActivityDate: new Date().toISOString().split('T')[0],
        totalDaysActive: 8,
      },
      'user-2': {
        userId: 'user-2',
        currentStreak: 1,
        longestStreak: 2,
        lastActivityDate: new Date().toISOString().split('T')[0],
        totalDaysActive: 3,
      },
    },
    xpData: {
      'user-1': {
        userId: 'user-1',
        totalXP: 150,
        level: 2,
        levelProgress: 50,
      },
      'user-2': {
        userId: 'user-2',
        totalXP: 45,
        level: 1,
        levelProgress: 45,
      },
    },
    battles: [],
    reviews: [],
    currentUserId: 'user-1',
  };

  saveData(STORAGE_KEYS.APP_STATE, demoState);
  console.log('✓ Demo data seeded successfully');
};
