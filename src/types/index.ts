// User types
export interface User {
  id: string;
  name: string;
  specialization: 'embedded' | 'vlsi';
  createdAt: string; // ISO date string
}

export type TaskCategory =
  | 'revision'
  | 'coding'
  | 'interview'
  | 'question-practice'
  | 'project'
  | 'review';

export type TaskEffort = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  effort: TaskEffort;
  xpReward: number;
  completed: boolean;
  createdAt: string; // ISO date string
  completedAt?: string;
  userId: string;
  tags?: string[];
}

export interface StreakData {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // ISO date string or empty string
  totalDaysActive: number;
}

export interface XPData {
  userId: string;
  totalXP: number;
  level: number;
  levelProgress: number; // percentage to next level
}

export interface LevelInfo {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
}

export type BattleStatus = 'upcoming' | 'active' | 'completed';
export type BattleType = 'question-battle' | 'speed-run' | 'revision-duel';

export interface Battle {
  id: string;
  title: string;
  type: BattleType;
  status: BattleStatus;
  participants: string[]; // user IDs
  xpStake: number;
  winnerId?: string;
  createdAt: string;
  updatedAt: string;
}

export type ReviewStatus = 'pending' | 'completed' | 'scheduled';
export type ReviewType = 'topic-review' | 'question-review' | 'mock-interview';

export interface Review {
  id: string;
  topic: string;
  type: ReviewType;
  status: ReviewStatus;
  notes?: string;
  xpReward: number;
  scheduledFor?: string;
  completedAt?: string;
  createdAt: string;
  userId: string;
}

export interface AppState {
  users: User[];
  tasks: Task[];
  streakData: { [userId: string]: StreakData };
  xpData: { [userId: string]: XPData };
  battles: Battle[];
  reviews: Review[];
  currentUserId: string | null;
}

export interface AppContextType {
  state: AppState;
  addUser: (user: User) => void;
  setCurrentUser: (userId: string) => void;
  addTask: (task: Task) => void;
  completeTask: (taskId: string) => void;
  addBattle: (battle: Battle) => void;
  addReview: (review: Review) => void;
}
