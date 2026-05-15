import { useMemo } from 'react';
import { useApp } from './useApp';
import { initializeXPData, getLevelTitle, getRemainingXPToNextLevel } from '../utils/xp';

export const useXP = () => {
  const { state } = useApp();
  const currentUserId = state.currentUserId;

  const xpData = useMemo(() => {
    if (!currentUserId) return initializeXPData('guest');
    return state.xpData[currentUserId] ?? initializeXPData(currentUserId);
  }, [state.xpData, currentUserId]);

  const nextLevelXP = useMemo(
    () => getRemainingXPToNextLevel(xpData.totalXP),
    [xpData.totalXP]
  );

  const levelTitle = useMemo(() => getLevelTitle(xpData.totalXP), [xpData.totalXP]);

  return {
    xpData,
    levelTitle,
    nextLevelXP,
  };
};
