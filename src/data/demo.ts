/**
 * Demo data seeding for development/testing
 * Helps verify the dashboard works with real data
 */

import type { AppState, User, Task } from '../types/index';
import { STORAGE_KEYS } from '../constants/index';
import { saveData, loadDataOrNull } from '../utils/storage';

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
  const existingState = loadDataOrNull<AppState>(STORAGE_KEYS.APP_STATE);

  if (!existingState) {
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
      preferences: {
        'user-yash': { theme: 'dark', notificationsEnabled: true },
        'user-bhav': { theme: 'dark', notificationsEnabled: true },
      },
      revisionHistory: [
        {
          id: 'session-1',
          userId: 'user-yash',
          subject: 'Embedded Systems',
          topic: 'Interrupts',
          difficulty: 'Medium',
          questionCount: 3,
          correctCount: 2,
          accuracy: 67,
          xpEarned: 55,
          weakTopics: ['Interrupts'],
          strongTopics: ['Microcontrollers'],
          questionTypes: ['concept', 'mcq'],
          startedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        },
      ],
      battles: [],
      reviews: [],
      currentUserId: 'user-yash',
    };

    saveData(STORAGE_KEYS.APP_STATE, demoState);
    console.log('✓ Demo data seeded successfully');
    return;
  }

  const missingDemoUsers = DEMO_USERS.filter(
    (demoUser) => !existingState.users.some((savedUser) => savedUser.id === demoUser.id),
  );

  if (missingDemoUsers.length === 0) {
    console.log('Demo data already exists, no missing users to add');
    return;
  }

  const mergedState: AppState = {
    ...existingState,
    users: [...existingState.users, ...missingDemoUsers],
    currentUserId: existingState.currentUserId || existingState.users[0]?.id || DEMO_USERS[0]?.id || null,
  };

  saveData(STORAGE_KEYS.APP_STATE, mergedState);
  console.log(`✓ Added ${missingDemoUsers.length} missing demo user(s)`);
};
