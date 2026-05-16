import React from 'react';
import { useApp } from '../hooks';

export const UserSwitcher: React.FC = () => {
  const { state, setCurrentUser } = useApp();
  const users = state.users || [];
  const current = state.currentUserId;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser(e.target.value);
  };

  return (
    <div className="flex items-center gap-3">
      <select
        value={current ?? ''}
        onChange={handleChange}
        className="bg-black/30 border border-white/10 text-sm text-white p-2 rounded-lg"
        aria-label="Switch active user"
      >
        <option value="" disabled>
          Select user
        </option>
        {users.map((u) => (
          <option key={u.id} value={u.id} className="text-black">
            {u.name} — {u.specialization}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSwitcher;
