/**
 * Demo data seeding for development/testing
 * Helps verify the dashboard works with real data
 */

import type { User, Task } from '../types/index';
import { STORAGE_KEYS } from '../constants/index';
import { saveData } from '../utils/storage';

export const DEMO_USERS: User[] = [
  {
    id: 'user-yash',
    name: 'Yashaswini',
    specialization: 'embedded',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-bhav',
    name: 'Bhavani',
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
    userId: 'user-yash',
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
    userId: 'user-yash',
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
    userId: 'user-bhav',
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
      'user-yash': {
          userId: 'user-yash',
          currentStreak: 3,
          longestStreak: 5,
          lastActivityDate: new Date().toISOString().split('T')[0],
          totalDaysActive: 8,
        },
        'user-bhav': {
          userId: 'user-bhav',
          currentStreak: 1,
          longestStreak: 2,
          lastActivityDate: new Date().toISOString().split('T')[0],
          totalDaysActive: 3,
        },
    },
    xpData: {
      'user-yash': {
        userId: 'user-yash',
        totalXP: 150,
        level: 2,
        levelProgress: 50,
      },
      'user-bhav': {
        userId: 'user-bhav',
        totalXP: 45,
        level: 1,
        levelProgress: 45,
      },
    },
    battles: [],
    reviews: [],
    currentUserId: 'user-yash',
  };

  saveData(STORAGE_KEYS.APP_STATE, demoState);
  console.log('✓ Demo data seeded successfully');
};
