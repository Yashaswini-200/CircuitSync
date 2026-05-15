import { useMemo } from 'react';
import { useApp } from './useApp';

export const useTasks = () => {
  const { state, addTask, completeTask } = useApp();
  const currentUserId = state.currentUserId;

  const tasks = useMemo(() => {
    if (!currentUserId) return [];
    return state.tasks.filter((task) => task.userId === currentUserId);
  }, [state.tasks, currentUserId]);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );

  const pendingByCategory = useMemo(
    () =>
      pendingTasks.reduce<Record<string, number>>((acc, task) => {
        acc[task.category] = (acc[task.category] ?? 0) + 1;
        return acc;
      }, {}),
    [pendingTasks]
  );

  return {
    tasks,
    completedTasks,
    pendingTasks,
    pendingByCategory,
    addTask,
    completeTask,
  };
};
