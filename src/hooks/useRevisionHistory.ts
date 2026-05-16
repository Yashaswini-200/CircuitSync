import { useMemo } from 'react';
import { useApp } from './useApp';

export const useRevisionHistory = () => {
  const { state } = useApp();
  const currentUserId = state.currentUserId;

  const revisionSessions = useMemo(() => {
    if (!currentUserId) return [];
    return state.revisionHistory.filter((session) => session.userId === currentUserId);
  }, [state.revisionHistory, currentUserId]);

  const totalSessions = revisionSessions.length;

  const totalQuestions = useMemo(
    () => revisionSessions.reduce((sum, session) => sum + session.questionCount, 0),
    [revisionSessions],
  );

  const averageAccuracy = useMemo(() => {
    if (revisionSessions.length === 0) return 0;
    const totalAccuracy = revisionSessions.reduce((sum, session) => sum + session.accuracy, 0);
    return Math.round(totalAccuracy / revisionSessions.length);
  }, [revisionSessions]);

  const totalXP = useMemo(
    () => revisionSessions.reduce((sum, session) => sum + session.xpEarned, 0),
    [revisionSessions],
  );

  const weakTopics = useMemo(() => {
    const topics: string[] = [];
    revisionSessions.forEach((session) => {
      session.weakTopics.forEach((topic) => {
        if (!topics.includes(topic)) topics.push(topic);
      });
    });
    return topics;
  }, [revisionSessions]);

  const recentWeakTopics = useMemo(() => weakTopics.slice(0, 3), [weakTopics]);

  const subjectBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    revisionSessions.forEach((session) => {
      map[session.subject] = (map[session.subject] ?? 0) + 1;
    });
    return map;
  }, [revisionSessions]);

  return {
    revisionSessions,
    totalSessions,
    totalQuestions,
    averageAccuracy,
    totalXP,
    weakTopics,
    recentWeakTopics,
    subjectBreakdown,
  } as const;
};
