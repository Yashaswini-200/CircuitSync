/**
 * Main layout wrapper with sidebar and navbar
 */

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Navbar onToggleSidebar={() => setMobileOpen((prev) => !prev)} />

      <main className="min-h-screen bg-black/90 backdrop-blur-sm pt-20 px-4 pb-8 transition-all duration-300 md:ml-72 md:px-8 lg:px-10">
        {children}
      </main>
    </div>
  );
};
