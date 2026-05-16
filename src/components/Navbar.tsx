/**
 * Top navigation bar with branding and quick actions
 */

import { UserSwitcher } from './UserSwitcher';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  return (
    <nav className="fixed top-0 right-0 left-0 h-16 bg-black/40 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between px-4 md:px-8 z-40">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-2xl bg-white/5 border border-white/10 text-cyan-300 hover:bg-cyan-500/10 transition"
        >
          ☰
        </button>
        <h2 className="text-lg font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
          CircuitSync
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:inline-flex text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
          🔔
        </button>
        <button className="hidden md:inline-flex text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
          ⚙️
        </button>
        <div className="hidden md:flex items-center">
          <UserSwitcher />
        </div>
      </div>
    </nav>
  );
};
