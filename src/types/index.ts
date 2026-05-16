// User types
export interface User {
  id: string;
  name: string;
  specialization: 'embedded' | 'vlsi';
  email?: string;
  bio?: string;
  createdAt: string; // ISO date string
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  notificationsEnabled: boolean;
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

export type BattleStatus = 'open' | 'active' | 'completed';
export type BattleType = 'question-battle' | 'speed-run' | 'revision-duel';
export type BattleTopic =
  | 'embedded-fundamentals'
  | 'vlsi-basics'
  | 'digital-logic'
  | 'interview-prep'
  | 'debugging'
  | 'architecture'
  | 'problem-solving';

export type QuestionStatus = 'unanswered' | 'answered' | 'solved' | 'disputed';

export interface BattleQuestion {
  id: string;
  userId: string; // who asked
  question: string;
  description?: string;
  topic: BattleTopic;
  status: QuestionStatus;
  xpReward: number;
  answers: BattleAnswer[];
  createdAt: string;
  solvedAt?: string;
  solvedBy?: string; // user ID who solved it
}

export interface BattleAnswer {
  id: string;
  userId: string;
  answer: string;
  isCorrect: boolean;
  votes: number;
  createdAt: string;
}

export interface Battle {
  id: string;
  title: string;
  type: BattleType;
  topic: BattleTopic;
  status: BattleStatus;
  participants: string[]; // user IDs
  scores?: { [userId: string]: number };
  history?: {
    id: string;
    event: string;
    userId?: string;
    payload?: any;
    createdAt: string;
  }[];
  questions: BattleQuestion[];
  xpStake: number;
  winnerId?: string;
  createdAt: string;
  updatedAt: string;
  endsAt?: string;
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
  preferences: { [userId: string]: UserPreferences };
  battles: Battle[];
  reviews: Review[];
  currentUserId: string | null;
}

export interface AppContextType {
  state: AppState;
  currentUser?: User | null;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  updateUserPreferences: (userId: string, preferences: UserPreferences) => void;
  setCurrentUser: (userId: string) => void;
  addTask: (task: Task) => void;
  completeTask: (taskId: string) => void;
  addBattle: (battle: Battle) => void;
  addQuestionToBattle: (battleId: string, question: BattleQuestion) => void;
  addAnswerToQuestion: (battleId: string, questionId: string, answer: BattleAnswer) => void;
  markQuestionSolved: (battleId: string, questionId: string, solvedBy: string) => void;
  completeBattle: (battleId: string, winnerId: string) => void;
  addReview: (review: Review) => void;
  addParticipantToBattle: (battleId: string, userId: string) => void;
  recordBattleEvent: (battleId: string, event: string, userId?: string, payload?: any) => void;
  updateBattleScore: (battleId: string, userId: string, delta: number) => void;
}
