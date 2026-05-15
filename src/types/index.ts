// User types
export interface User {
  id: string;
  name: string;
  specialization: 'embedded' | 'vlsi';
  createdAt: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  xpReward: number;
  createdAt: string;
  completedAt?: string;
  userId: string;
}

// Streak types
export interface StreakData {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // ISO date string
  totalDaysActive: number;
}

// XP & Level types
export interface XPData {
  userId: string;
  totalXP: number;
  level: number;
  levelProgress: number; // 0-100 percentage to next level
}

export interface LevelInfo {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
}

// Global state
export interface AppState {
  users: User[];
  tasks: Task[];
  streakData: { [userId: string]: StreakData };
  xpData: { [userId: string]: XPData };
  currentUserId: string | null;
}

// Context types
export interface AppContextType {
  state: AppState;
  addUser: (user: User) => void;
  setCurrentUser: (userId: string) => void;
  addTask: (task: Task) => void;
  completeTask: (taskId: string, userId: string) => void;
  updateStreak: (userId: string, streakData: StreakData) => void;
  updateXP: (userId: string, xpData: XPData) => void;
}
