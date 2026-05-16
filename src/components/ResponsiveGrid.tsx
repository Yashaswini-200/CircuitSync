import type { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: string; // tailwind grid template columns classes
  gap?: string;
}

export const ResponsiveGrid = ({ children, cols = 'lg:grid-cols-[1fr_360px]', gap = 'gap-6' }: ResponsiveGridProps) => {
  return <div className={`grid ${gap} ${cols}`}>{children}</div>;
};

export default ResponsiveGrid;
