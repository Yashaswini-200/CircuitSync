/**
 * Left sidebar navigation
 */

import { NavLink } from 'react-router-dom';
import { NAVIGATION } from '../constants/navigation';

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform bg-gradient-to-b from-black to-gray-950 border-r border-cyan-500/20 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-center border-b border-cyan-500/20 px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              ⚡
            </div>
            <div>
              <div className="text-sm font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
                CIRCUIT
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500">SYNC</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                  isActive
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-neon-cyan'
                    : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-cyan-500/20 p-4 space-y-2">
          <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors">
            📚 Help Center
          </button>
          <NavLink
            to="/profile"
            className="w-full block rounded-2xl px-4 py-3 text-left text-sm text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
            onClick={onClose}
          >
            👤 Profile
          </NavLink>
        </div>
      </aside>
    </>
  );
};
