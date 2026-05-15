/**
 * Reusable page shell for route-level pages
 */

import type { ReactNode } from 'react';

interface PageShellProps {
  title: string;
  description: string;
  accent?: 'cyan' | 'green' | 'purple' | 'orange';
  children: ReactNode;
}

export const PageShell = ({
  title,
  description,
  accent = 'cyan',
  children,
}: PageShellProps) => {
  const accentGradient = {
    cyan: 'from-cyan-400 to-blue-500',
    green: 'from-emerald-400 to-green-500',
    purple: 'from-purple-400 to-pink-500',
    orange: 'from-orange-400 to-amber-500',
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">{title}</p>
          <h1 className={`text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${accentGradient[accent]}`}>
            {description}
          </h1>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-300 shadow-neon-blue/10">
          <span className="font-medium text-gray-100">Status</span>
          <p className="text-xs text-gray-400">Live route rendering</p>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        {children}
      </div>
    </section>
  );
};
