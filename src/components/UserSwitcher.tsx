import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../hooks';

export const UserSwitcher: React.FC = () => {
  const { state, currentUser, addUser, setCurrentUser } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserSpecialization, setNewUserSpecialization] = useState<'embedded' | 'vlsi'>('embedded');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeUser = currentUser ?? state.users.find((user) => user.id === state.currentUserId) ?? null;
  const dropdownLabel = activeUser ? `${activeUser.name} • ${activeUser.specialization}` : 'Select account';

  const userList = useMemo(() => state.users, [state.users]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleToggleMenu = () => setMenuOpen((value) => !value);

  const handleSwitch = (userId: string) => {
    setCurrentUser(userId);
    setMenuOpen(false);
  };

  const handleCreateAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = newUserName.trim();
    if (!trimmedName) return;

    const newUser = {
      id: crypto.randomUUID(),
      name: trimmedName,
      specialization: newUserSpecialization,
      createdAt: new Date().toISOString(),
    };

    addUser(newUser);
    setCurrentUser(newUser.id);
    setNewUserName('');
    setMenuOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={handleToggleMenu}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white shadow-sm transition hover:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-semibold text-cyan-200">
          {activeUser ? activeUser.name.charAt(0).toUpperCase() : 'A'}
        </span>
        <span className="flex flex-col items-start text-left leading-none">
          <span className="text-sm font-medium text-white">{activeUser ? activeUser.name : 'Account switcher'}</span>
          <span className="text-xs text-gray-400">{dropdownLabel}</span>
        </span>
        <span className="ml-2 text-gray-400">▾</span>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-3 w-80 min-w-[20rem] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Account</p>
                  <p className="mt-2 text-sm font-semibold text-white">Switch profiles instantly</p>
                </div>
                {activeUser && (
                  <span className="rounded-full bg-green-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                    Active
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {userList.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-gray-400">
                    No accounts yet. Create one to start tracking tasks and progress.
                  </div>
                ) : (
                  userList.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleSwitch(user.id)}
                      className={`flex w-full items-center justify-between gap-4 rounded-3xl border px-4 py-3 text-left transition ${
                        user.id === activeUser?.id
                          ? 'border-cyan-400/30 bg-cyan-500/10 text-white shadow-sm'
                          : 'border-white/10 bg-white/5 text-gray-200 hover:border-cyan-400/20 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.specialization}</div>
                      </div>
                      {user.id === activeUser?.id ? (
                        <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-[11px] uppercase tracking-[0.15em] text-cyan-200">Current</span>
                      ) : (
                        <span className="text-xs text-cyan-300">Switch</span>
                      )}
                    </button>
                  ))
                )}
              </div>

              <form onSubmit={handleCreateAccount} className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="space-y-2">
                  <label htmlFor="new-user-name" className="text-xs uppercase tracking-[0.24em] text-gray-500">
                    Add new account
                  </label>
                  <input
                    id="new-user-name"
                    value={newUserName}
                    onChange={(event) => setNewUserName(event.target.value)}
                    placeholder="Name"
                    className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    value={newUserSpecialization}
                    onChange={(event) => setNewUserSpecialization(event.target.value as 'embedded' | 'vlsi')}
                    className="rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60"
                  >
                    <option value="embedded">Embedded</option>
                    <option value="vlsi">VLSI</option>
                  </select>
                  <button
                    type="submit"
                    className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
                  >
                    Create account
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserSwitcher;
