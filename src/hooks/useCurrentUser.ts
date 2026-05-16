import { useMemo } from 'react';
import { useApp } from './useApp';

export const useCurrentUser = () => {
  const { state, currentUser } = useApp();

  const resolved = useMemo(() => {
    if (currentUser) return currentUser;
    if (state.currentUserId) return state.users.find((u) => u.id === state.currentUserId) ?? null;
    return null;
  }, [state.users, state.currentUserId, currentUser]);

  return {
    currentUser: resolved,
    isGuest: resolved === null,
  } as const;
};

export default useCurrentUser;
