# CircuitSync Architecture Documentation

## Overview
A collaborative engineering accountability dashboard built with React + Vite + Tailwind CSS.

## Project Structure

```
src/
├── components/      # Reusable UI components (future)
├── pages/          # Page-level components
│   └── Dashboard.tsx      # Main dashboard
├── hooks/          # Custom React hooks
│   ├── useApp.ts         # Safe context access
│   ├── useLocalStorage.ts # localStorage integration
│   └── index.ts          # Barrel export
├── utils/          # Pure utility functions
│   ├── storage.ts        # Safe localStorage operations
│   ├── streak.ts         # Streak calculation logic
│   ├── xp.ts             # XP progression system
│   └── index.ts          # Barrel export
├── context/        # Global state
│   └── AppContext.tsx    # App state + reducer
├── constants/      # Configuration constants
│   └── index.ts          # XP levels, task templates
├── types/          # TypeScript interfaces
│   └── index.ts          # All type definitions
├── data/           # Data utilities
│   └── demo.ts           # Demo/seed data
├── layouts/        # Layout components (future)
├── styles/         # Global Tailwind styles (future)
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Tailwind directives
```

## State Management

### AppContext Structure
```typescript
AppState {
  users: User[]              // All users
  tasks: Task[]              // All tasks
  streakData: { [userId]: StreakData }  // Streak tracking
  xpData: { [userId]: XPData }          // XP/Level info
  currentUserId: string | null
}
```

### Reducer Pattern
- Uses React's useReducer for predictable state updates
- Actions: ADD_USER, SET_CURRENT_USER, ADD_TASK, COMPLETE_TASK, UPDATE_STREAK, UPDATE_XP, LOAD_STATE
- Automatically persists to localStorage after each update

## Data Models

### User
```typescript
{
  id: string
  name: string
  specialization: 'embedded' | 'vlsi'
  createdAt: ISO string
}
```

### Task
```typescript
{
  id: string
  title: string
  description: string
  completed: boolean
  xpReward: number
  createdAt: ISO string
  completedAt?: ISO string
  userId: string
}
```

### StreakData
```typescript
{
  userId: string
  currentStreak: number        // Days in current streak
  longestStreak: number        // All-time longest
  lastActivityDate: ISO date   // YYYY-MM-DD format
  totalDaysActive: number      // Cumulative days active
}
```

### XPData
```typescript
{
  userId: string
  totalXP: number              // Cumulative XP
  level: number                // Current level (1-5)
  levelProgress: number        // % to next level (0-100)
}
```

## Key Systems

### 1. Streak System (`utils/streak.ts`)
**Purpose:** Track user consistency and engagement

**Key Features:**
- Timezone-aware date comparisons (UTC)
- Prevents accidental resets from multiple same-day submissions
- Detects gaps > 1 day and resets streak
- Provides streak multiplier for XP calculations (1.0x to 1.5x)
- Risk detection for notifications

**Critical Logic:**
- Uses ISO date strings (YYYY-MM-DD) for date storage
- `updateStreakAfterActivity()` handles all three cases:
  1. Same-day submission (no change)
  2. Yesterday → today (streak extends)
  3. Gap > 1 day (streak resets)

### 2. XP System (`utils/xp.ts`)
**Purpose:** Gamified progression and level tracking

**Levels:**
1. Beginner Debugger (0-100 XP)
2. Register Rookie (100-300 XP)
3. Interrupt Survivor (300-600 XP)
4. Firmware Warrior (600-1200 XP)
5. Embedded Beast (1200+ XP)

**Features:**
- Level calculated from total XP
- Progress to next level (0-100%)
- Streak-based XP multiplier
- Extensible configuration

### 3. LocalStorage Persistence (`utils/storage.ts`)
**Purpose:** Safe, corruption-resistant data persistence

**Features:**
- Safe JSON serialization with error handling
- Fallback values for corrupted data
- Storage quota exceeded detection
- Automatic cleanup of corrupted entries
- Availability checking

**Error Handling:**
- SyntaxError: Tries to remove corrupted data
- DOMException: Alerts quota exceeded
- Falls back to provided default values

### 4. Global State Context (`context/AppContext.tsx`)
**Purpose:** Single source of truth for app state

**Features:**
- Reducer pattern for predictable updates
- Automatic localStorage sync on every state change
- Initializes from localStorage on app load
- Type-safe through TypeScript interfaces

**Reducer Actions:**
1. ADD_USER - Creates new user with initialized streak/XP
2. SET_CURRENT_USER - Sets active user
3. ADD_TASK - Creates new task
4. COMPLETE_TASK - Marks task done, updates streak + XP
5. UPDATE_STREAK - Direct streak update
6. UPDATE_XP - Direct XP update
7. LOAD_STATE - Hydrates from localStorage

## Custom Hooks

### useApp()
**Purpose:** Safe context consumption with error handling

```typescript
const { state, addUser, completeTask, ... } = useApp()
// Throws error if used outside AppProvider
```

### useLocalStorage()
**Purpose:** React state synced with localStorage

```typescript
const [value, setValue] = useLocalStorage('key', defaultValue)
// Updates both state and localStorage
```

## Constants & Configuration

### XP Configuration
```typescript
LEVELS: Defines all 5 levels with min/max XP
STREAK_CONFIG: Streak rules and bonuses
TASK_TEMPLATES: Pre-defined task examples
STORAGE_KEYS: All localStorage keys
```

## Demo Data (`data/demo.ts`)
- Pre-populated with 2 test users (Aditya, Priya)
- Sample tasks and streak/XP data
- Auto-loads in development mode
- Seeding is idempotent (won't overwrite existing data)

## Scalability Considerations

✅ **Extensible:**
- New levels can be added to LEVELS constant
- New action types can be added to reducer
- New utility functions can be added without affecting existing code

✅ **Maintainable:**
- Clear separation of concerns
- Single responsibility per file/function
- Type safety throughout
- Barrel exports for clean imports

✅ **Performant:**
- Minimal re-renders (useCallback in custom hooks)
- Efficient state updates (reducer pattern)
- Lazy localStorage writes (on-demand)

⚠️ **Future Considerations:**
1. Consider Zustand/Redux for complex state (if app grows)
2. Add error boundary component for robustness
3. Implement API sync (currently localStorage only)
4. Add data validation/migration for localStorage updates

## Development Workflow

1. **Start dev server:** `npm run dev` (http://localhost:5174)
2. **Build for production:** `npm run build`
3. **Demo data:** Auto-seeds on dev mode, cleared when state exists

## Testing Strategy

- Types provide compile-time safety
- Demo data allows UI testing without manual setup
- Storage utilities have fallback handling
- Streak logic tested with edge cases (gaps, resets, multipliers)

## Next Steps (Day 2+)

1. Create reusable UI components (Card, Button, Badge)
2. Build task management UI
3. Implement user switching/management
4. Add animations with Framer Motion
5. Create streak/XP progress visualizations
6. Add notifications and warnings
7. Implement collaborative features
