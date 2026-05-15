import { useMemo } from 'react';
import { useApp } from './useApp';
import { getStreakMultiplier, isStreakAtRisk } from '../utils/streak';
import { initializeStreak } from '../utils/streak';

export const useStreak = () => {
  const { state } = useApp();
  const currentUserId = state.currentUserId;

  const streak = useMemo(() => {
    if (!currentUserId) return initializeStreak('guest');
    return state.streakData[currentUserId] ?? initializeStreak(currentUserId);
  }, [state.streakData, currentUserId]);

  const isAtRisk = useMemo(
    () => streak.userId !== 'guest' && isStreakAtRisk(streak.lastActivityDate),
    [streak]
  );

  const bonusMultiplier = useMemo(
    () => getStreakMultiplier(streak.currentStreak),
    [streak.currentStreak]
  );

  return {
    streak,
    isAtRisk,
    bonusMultiplier,
  };
};
