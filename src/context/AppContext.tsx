/**
 * Global app state management using React Context
 * Handles users, tasks, streaks, and XP progression
 */

import { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  AppState,
  AppContextType,
  User,
  UserPreferences,
  Task,
  StreakData,
  XPData,
  Battle,
  Review,
  BattleQuestion,
  BattleAnswer,
} from '../types/index';
import { STORAGE_KEYS } from '../constants/index';
import { saveData, loadData } from '../utils/storage';
import {
  initializeStreak,
  updateStreakAfterActivity,
  getStreakMultiplier,
} from '../utils/streak';
import { initializeXPData, addXPAndUpdateLevel } from '../utils/xp';

// Initial state
const initialAppState: AppState = {
  users: [],
  tasks: [],
  streakData: {},
  xpData: {},
  preferences: {},
  battles: [],
  reviews: [],
  currentUserId: null,
};

const defaultUserPreferences = (): UserPreferences => ({
  theme: 'dark',
  notificationsEnabled: true,
});

const normalizeAppState = (state: Partial<AppState>): AppState => {
  const users = Array.isArray(state.users) ? state.users : initialAppState.users;
  const currentUserId = typeof state.currentUserId === 'string' && users.some((u) => u.id === state.currentUserId)
    ? state.currentUserId
    : users.length > 0
      ? users[0].id
      : null;

  const preferences = typeof state.preferences === 'object' && state.preferences !== null
    ? state.preferences
    : initialAppState.preferences;

  const normalizedPreferences = users.reduce<Record<string, UserPreferences>>((acc, user) => {
    acc[user.id] = preferences[user.id] ?? defaultUserPreferences();
    return acc;
  }, {});

  const rawStreakData = typeof state.streakData === 'object' && state.streakData !== null ? state.streakData : initialAppState.streakData;
  const normalizedStreakData = users.reduce<Record<string, StreakData>>((acc, user) => {
    acc[user.id] = rawStreakData[user.id] ?? initializeStreak(user.id);
    return acc;
  }, {});

  const rawXPData = typeof state.xpData === 'object' && state.xpData !== null ? state.xpData : initialAppState.xpData;
  const normalizedXPData = users.reduce<Record<string, XPData>>((acc, user) => {
    acc[user.id] = rawXPData[user.id] ?? initializeXPData(user.id);
    return acc;
  }, {});

  return {
    ...initialAppState,
    ...state,
    users,
    tasks: Array.isArray(state.tasks) ? state.tasks : initialAppState.tasks,
    streakData: normalizedStreakData,
    xpData: normalizedXPData,
    preferences: normalizedPreferences,
    battles: Array.isArray(state.battles) ? state.battles : initialAppState.battles,
    reviews: Array.isArray(state.reviews) ? state.reviews : initialAppState.reviews,
    currentUserId,
  };
};

const initAppState = (): AppState => {
  const persistedState = loadData<AppState>(STORAGE_KEYS.APP_STATE, initialAppState);
  return normalizeAppState(persistedState);
};

// Action types
type AppAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'SET_CURRENT_USER'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'COMPLETE_TASK'; payload: { taskId: string } }
  | { type: 'ADD_BATTLE'; payload: Battle }
  | { type: 'ADD_QUESTION_TO_BATTLE'; payload: { battleId: string; question: BattleQuestion } }
  | { type: 'ADD_ANSWER_TO_QUESTION'; payload: { battleId: string; questionId: string; answer: BattleAnswer } }
  | { type: 'MARK_QUESTION_SOLVED'; payload: { battleId: string; questionId: string; solvedBy: string } }
  | { type: 'COMPLETE_BATTLE'; payload: { battleId: string; winnerId: string } }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'ADD_PARTICIPANT_TO_BATTLE'; payload: { battleId: string; userId: string } }
  | { type: 'RECORD_BATTLE_EVENT'; payload: { battleId: string; event: string; userId?: string; payload?: any } }
  | { type: 'UPDATE_BATTLE_SCORE'; payload: { battleId: string; userId: string; delta: number } }
  | { type: 'UPDATE_STREAK'; payload: { userId: string; streakData: StreakData } }
  | { type: 'UPDATE_XP'; payload: { userId: string; xpData: XPData } }
  | { type: 'REMOVE_USER'; payload: { userId: string } }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: { userId: string; preferences: UserPreferences } };

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_USER': {
      const userExists = state.users.some((u) => u.id === action.payload.id);
      if (userExists) return state;

      const newUser = action.payload;
      return {
        ...state,
        users: [...state.users, newUser],
        currentUserId: state.currentUserId ?? newUser.id,
        streakData: {
          ...state.streakData,
          [newUser.id]: initializeStreak(newUser.id),
        },
        xpData: {
          ...state.xpData,
          [newUser.id]: initializeXPData(newUser.id),
        },
        preferences: {
          ...state.preferences,
          [newUser.id]: state.preferences[newUser.id] ?? defaultUserPreferences(),
        },
      };
    }

    case 'SET_CURRENT_USER': {
      if (!state.users.some((u) => u.id === action.payload)) {
        return state;
      }

      return {
        ...state,
        currentUserId: action.payload,
      };
    }

    case 'REMOVE_USER': {
      const { userId } = action.payload;
      const nextUsers = state.users.filter((u) => u.id !== userId);
      const nextCurrentUserId = state.currentUserId === userId ? nextUsers[0]?.id ?? null : state.currentUserId;
      const { [userId]: _, ...nextStreakData } = state.streakData;
      const { [userId]: __, ...nextXPData } = state.xpData;
      const { [userId]: ___, ...nextPreferences } = state.preferences;

      return {
        ...state,
        users: nextUsers,
        currentUserId: nextCurrentUserId,
        streakData: nextStreakData,
        xpData: nextXPData,
        preferences: nextPreferences,
      };
    }

    case 'UPDATE_USER_PREFERENCES': {
      const { userId, preferences } = action.payload;
      if (!state.users.some((u) => u.id === userId)) return state;

      return {
        ...state,
        preferences: {
          ...state.preferences,
          [userId]: {
            ...state.preferences[userId],
            ...preferences,
          },
        },
      };
    }

    case 'ADD_TASK': {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }

    case 'COMPLETE_TASK': {
      const { taskId } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task || task.completed) return state;

      const userId = task.userId;
      const updatedTasks = state.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
      );

      const currentStreak = state.streakData[userId] || initializeStreak(userId);
      const updatedStreak = updateStreakAfterActivity(currentStreak);
      const streakMultiplier = getStreakMultiplier(updatedStreak.currentStreak);

      const currentXP = state.xpData[userId] || initializeXPData(userId);
      const updatedXP = addXPAndUpdateLevel(currentXP, task.xpReward, streakMultiplier);

      return {
        ...state,
        tasks: updatedTasks,
        streakData: {
          ...state.streakData,
          [userId]: updatedStreak,
        },
        xpData: {
          ...state.xpData,
          [userId]: updatedXP,
        },
      };
    }

    case 'ADD_BATTLE': {
      const b = action.payload;
      const initialized: Battle = {
        ...b,
        scores: b.scores ?? b.participants.reduce<Record<string, number>>((acc, id) => { acc[id] = 0; return acc; }, {}),
        history: b.history ?? [],
      };

      return {
        ...state,
        battles: [...state.battles, initialized],
      };
    }
    case 'ADD_PARTICIPANT_TO_BATTLE': {
      const { battleId, userId } = action.payload;
      return {
        ...state,
        battles: state.battles.map((b) =>
          b.id === battleId
            ? {
                ...b,
                participants: b.participants.includes(userId) ? b.participants : [...b.participants, userId],
                scores: { ...(b.scores ?? {}), [userId]: (b.scores?.[userId] ?? 0) },
                history: [
                  ...(b.history ?? []),
                  { id: crypto.randomUUID(), event: 'participant_added', userId, payload: {}, createdAt: new Date().toISOString() },
                ],
                updatedAt: new Date().toISOString(),
              }
            : b
        ),
      };
    }
    case 'RECORD_BATTLE_EVENT': {
      const { battleId, event, userId, payload } = action.payload;
      return {
        ...state,
        battles: state.battles.map((b) =>
          b.id === battleId
            ? {
                ...b,
                history: [
                  ...(b.history ?? []),
                  { id: crypto.randomUUID(), event, userId, payload, createdAt: new Date().toISOString() },
                ],
                updatedAt: new Date().toISOString(),
              }
            : b
        ),
      };
    }
    case 'UPDATE_BATTLE_SCORE': {
      const { battleId, userId, delta } = action.payload;
      return {
        ...state,
        battles: state.battles.map((b) =>
          b.id === battleId
            ? {
                ...b,
                scores: { ...(b.scores ?? {}), [userId]: (b.scores?.[userId] ?? 0) + delta },
                history: [
                  ...(b.history ?? []),
                  { id: crypto.randomUUID(), event: 'score_updated', userId, payload: { delta }, createdAt: new Date().toISOString() },
                ],
                updatedAt: new Date().toISOString(),
              }
            : b
        ),
      };
    }

    case 'ADD_QUESTION_TO_BATTLE': {
      const { battleId, question } = action.payload;
      return {
        ...state,
        battles: state.battles.map((b) =>
          b.id === battleId ? { ...b, questions: [...b.questions, question], updatedAt: new Date().toISOString() } : b
        ),
      };
    }

    case 'ADD_ANSWER_TO_QUESTION': {
      const { battleId, questionId, answer } = action.payload;
      return {
        ...state,
        battles: state.battles.map((b) =>
          b.id === battleId
            ? {
                ...b,
                questions: b.questions.map((q) =>
                  q.id === questionId ? { ...q, answers: [...q.answers, answer], updatedAt: new Date().toISOString() } : q
                ),
                updatedAt: new Date().toISOString(),
              }
            : b
        ),
      };
    }

    case 'MARK_QUESTION_SOLVED': {
      const { battleId, questionId, solvedBy } = action.payload;
      const battle = state.battles.find((b) => b.id === battleId);
      const question = battle?.questions.find((q) => q.id === questionId);

      if (!question || question.status === 'solved') return state;

      const userId = solvedBy;
      const currentXP = state.xpData[userId] || initializeXPData(userId);
      const updatedXP = addXPAndUpdateLevel(currentXP, question.xpReward, 1.0);
      // update battles: mark question solved, increment solver score, and record history
      const updatedBattles = state.battles.map((b) => {
        if (b.id !== battleId) return b;
        const nextScores = { ...(b.scores ?? {}) };
        nextScores[userId] = (nextScores[userId] ?? 0) + question.xpReward;
        const nextHistory = [
          ...(b.history ?? []),
          { id: crypto.randomUUID(), event: 'question_solved', userId, payload: { questionId, xp: question.xpReward }, createdAt: new Date().toISOString() },
        ];

        return {
          ...b,
          scores: nextScores,
          history: nextHistory,
          questions: b.questions.map((q) =>
            q.id === questionId
              ? ({ ...(q as BattleQuestion), status: 'solved' as const, solvedBy, solvedAt: new Date().toISOString() } as BattleQuestion)
              : q
          ),
          updatedAt: new Date().toISOString(),
        };
      });

      return {
        ...state,
        battles: updatedBattles,
        xpData: {
          ...state.xpData,
          [userId]: updatedXP,
        },
      };
    }

    case 'COMPLETE_BATTLE': {
      const { battleId, winnerId } = action.payload;
      const battle = state.battles.find((b) => b.id === battleId);
      const xpStake = battle?.xpStake ?? 0;

      const currentXP = state.xpData[winnerId] || initializeXPData(winnerId);
      const updatedXP = addXPAndUpdateLevel(currentXP, xpStake, 1.0);

      return {
        ...state,
        battles: state.battles.map((b) =>
          b.id === battleId
            ? {
                ...b,
                status: 'completed',
                winnerId,
                history: [
                  ...(b.history ?? []),
                  { id: crypto.randomUUID(), event: 'battle_completed', userId: winnerId, payload: { xpStake }, createdAt: new Date().toISOString() },
                ],
                updatedAt: new Date().toISOString(),
              }
            : b
        ),
        xpData: {
          ...state.xpData,
          [winnerId]: updatedXP,
        },
      };
    }

    case 'ADD_REVIEW': {
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    }

    case 'UPDATE_STREAK': {
      return {
        ...state,
        streakData: {
          ...state.streakData,
          [action.payload.userId]: action.payload.streakData,
        },
      };
    }

    case 'UPDATE_XP': {
      return {
        ...state,
        xpData: {
          ...state.xpData,
          [action.payload.userId]: action.payload.xpData,
        },
      };
    }

    default:
      return state;
  }
};

// Create context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState, initAppState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveData(STORAGE_KEYS.APP_STATE, state);
  }, [state]);

  // Ensure there is always a valid current user
  useEffect(() => {
    if (state.users.length === 0) {
      const defaultUser = {
        id: crypto.randomUUID(),
        name: 'Embedded Operator',
        specialization: 'embedded' as const,
        createdAt: new Date().toISOString(),
      };

      dispatch({ type: 'ADD_USER', payload: defaultUser });
      dispatch({ type: 'SET_CURRENT_USER', payload: defaultUser.id });
      return;
    }

    if (!state.currentUserId || !state.users.some((u) => u.id === state.currentUserId)) {
      dispatch({ type: 'SET_CURRENT_USER', payload: state.users[0].id });
    }
  }, [state.currentUserId, state.users.length]);

  const contextValue: AppContextType = {
    state,
    currentUser: state.users.find((u) => u.id === state.currentUserId) ?? null,
    addUser: (user: User) => dispatch({ type: 'ADD_USER', payload: user }),
    removeUser: (userId: string) => dispatch({ type: 'REMOVE_USER', payload: { userId } }),
    updateUserPreferences: (userId: string, preferences: UserPreferences) =>
      dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: { userId, preferences } }),
    setCurrentUser: (userId: string) => dispatch({ type: 'SET_CURRENT_USER', payload: userId }),
    addTask: (task: Task) => dispatch({ type: 'ADD_TASK', payload: task }),
    completeTask: (taskId: string) => dispatch({ type: 'COMPLETE_TASK', payload: { taskId } }),
    addBattle: (battle: Battle) => dispatch({ type: 'ADD_BATTLE', payload: battle }),
    addQuestionToBattle: (battleId: string, question: BattleQuestion) =>
      dispatch({ type: 'ADD_QUESTION_TO_BATTLE', payload: { battleId, question } }),
    addAnswerToQuestion: (battleId: string, questionId: string, answer: BattleAnswer) =>
      dispatch({ type: 'ADD_ANSWER_TO_QUESTION', payload: { battleId, questionId, answer } }),
    markQuestionSolved: (battleId: string, questionId: string, solvedBy: string) =>
      dispatch({ type: 'MARK_QUESTION_SOLVED', payload: { battleId, questionId, solvedBy } }),
    completeBattle: (battleId: string, winnerId: string) =>
      dispatch({ type: 'COMPLETE_BATTLE', payload: { battleId, winnerId } }),
    addReview: (review: Review) => dispatch({ type: 'ADD_REVIEW', payload: review }),
    addParticipantToBattle: (battleId: string, userId: string) =>
      dispatch({ type: 'ADD_PARTICIPANT_TO_BATTLE', payload: { battleId, userId } }),
    recordBattleEvent: (battleId: string, event: string, userId?: string, payload?: any) =>
      dispatch({ type: 'RECORD_BATTLE_EVENT', payload: { battleId, event, userId, payload } }),
    updateBattleScore: (battleId: string, userId: string, delta: number) =>
      dispatch({ type: 'UPDATE_BATTLE_SCORE', payload: { battleId, userId, delta } }),
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
