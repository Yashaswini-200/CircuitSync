export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  description: string;
  accent: 'cyan' | 'green' | 'purple' | 'orange';
}

export const NAVIGATION: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/',
    description: 'Mission control for the engineering grind',
    accent: 'cyan',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: '✅',
    path: '/tasks',
    description: 'Plan and complete high-value engineering tasks',
    accent: 'green',
  },
  {
    id: 'streaks',
    label: 'Streaks',
    icon: '🔥',
    path: '/streaks',
    description: 'Maintain focus with daily streak tracking',
    accent: 'orange',
  },
  {
    id: 'battles',
    label: 'Battles',
    icon: '⚔️',
    path: '/battles',
    description: 'Engage in challenge duels and compare progress',
    accent: 'purple',
  },
  {
    id: 'revision-lab',
    label: 'Revision Lab',
    icon: '🔬',
    path: '/revision-lab',
    description: 'Practice engineering concepts with focused question sessions',
    accent: 'cyan',
  },
  {
    id: 'focus-session',
    label: 'Focus Session',
    icon: '🧠',
    path: '/focus-session',
    description: 'Launch premium deep work sessions with a floating timer',
    accent: 'cyan',
  },
  {
    id: 'teams',
    label: 'Teams',
    icon: '👥',
    path: '/teams',
    description: 'Coordinate with your accountability squad',
    accent: 'cyan',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: '👤',
    path: '/profile',
    description: 'Review your progress and settings',
    accent: 'green',
  },
];
