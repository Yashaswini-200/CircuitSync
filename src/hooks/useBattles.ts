import { useMemo } from 'react';
import { useApp } from './useApp';

export const useBattles = () => {
  const { state } = useApp();
  const currentUserId = state.currentUserId;

  const battles = useMemo(() => state.battles, [state.battles]);

  const activeBattles = useMemo(() => battles.filter((b) => b.status === 'open' || b.status === 'active'), [battles]);

  const completedBattles = useMemo(() => battles.filter((b) => b.status === 'completed'), [battles]);

  const myBattles = useMemo(() => battles.filter((b) => b.participants.includes(currentUserId || '')), [battles, currentUserId]);

  const totalQuestionsAsked = useMemo(
    () => myBattles.reduce((sum, b) => sum + (b.questions?.filter((q) => q.userId === currentUserId).length || 0), 0),
    [myBattles, currentUserId]
  );

  const totalQuestionsSolved = useMemo(
    () => myBattles.reduce((sum, b) => sum + (b.questions?.filter((q) => q.solvedBy === currentUserId).length || 0), 0),
    [myBattles, currentUserId]
  );

  const totalAnswersGiven = useMemo(
    () => myBattles.reduce((sum, b) => sum + (b.questions?.reduce((qSum, q) => qSum + (q.answers?.filter((a) => a.userId === currentUserId).length || 0), 0) || 0), 0),
    [myBattles, currentUserId]
  );

  const leaderboard = useMemo(() => {
    const scores: Record<string, number> = {};
    battles.forEach((b) => {
      if (b.scores) {
        Object.entries(b.scores).forEach(([uid, s]) => {
          scores[uid] = (scores[uid] ?? 0) + (s ?? 0);
        });
      }
    });

    const entries = Object.entries(scores).map(([userId, score]) => ({ userId, score }));
    entries.sort((a, b) => b.score - a.score);
    return entries;
  }, [battles]);

  return {
    battles,
    activeBattles,
    completedBattles,
    myBattles,
    totalQuestionsAsked,
    totalQuestionsSolved,
    totalAnswersGiven,
    leaderboard,
  };
};
