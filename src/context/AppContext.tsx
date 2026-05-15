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
  Task,
  StreakData,
  XPData,
  Battle,
  Review,
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
  battles: [],
  reviews: [],
  currentUserId: null,
};

// Action types
type AppAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'SET_CURRENT_USER'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'COMPLETE_TASK'; payload: { taskId: string } }
  | { type: 'ADD_BATTLE'; payload: Battle }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'UPDATE_STREAK'; payload: { userId: string; streakData: StreakData } }
  | { type: 'UPDATE_XP'; payload: { userId: string; xpData: XPData } }
  | { type: 'LOAD_STATE'; payload: AppState };

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
        streakData: {
          ...state.streakData,
          [newUser.id]: initializeStreak(newUser.id),
        },
        xpData: {
          ...state.xpData,
          [newUser.id]: initializeXPData(newUser.id),
        },
      };
    }

    case 'SET_CURRENT_USER': {
      return {
        ...state,
        currentUserId: action.payload,
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
      return {
        ...state,
        battles: [...state.battles, action.payload],
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

    case 'LOAD_STATE': {
      return action.payload;
    }

    default:
      return state;
  }
};

// Create context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = loadData<AppState>(STORAGE_KEYS.APP_STATE, initialAppState);
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveData(STORAGE_KEYS.APP_STATE, state);
  }, [state]);

  // Ensure there is always at least one current user for task tracking
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

    if (!state.currentUserId && state.users.length > 0) {
      dispatch({ type: 'SET_CURRENT_USER', payload: state.users[0].id });
    }
  }, [state.currentUserId, state.users.length]);

  const contextValue: AppContextType = {
    state,
    addUser: (user: User) => dispatch({ type: 'ADD_USER', payload: user }),
    setCurrentUser: (userId: string) => dispatch({ type: 'SET_CURRENT_USER', payload: userId }),
    addTask: (task: Task) => dispatch({ type: 'ADD_TASK', payload: task }),
    completeTask: (taskId: string) => dispatch({ type: 'COMPLETE_TASK', payload: { taskId } }),
    addBattle: (battle: Battle) => dispatch({ type: 'ADD_BATTLE', payload: battle }),
    addReview: (review: Review) => dispatch({ type: 'ADD_REVIEW', payload: review }),
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
