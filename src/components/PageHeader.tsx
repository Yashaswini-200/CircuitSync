import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  accent?: 'cyan' | 'green' | 'purple' | 'orange';
  children?: ReactNode;
}

export const PageHeader = ({ title, description, accent = 'cyan', children }: PageHeaderProps) => {
  const accentGradient = {
    cyan: 'from-cyan-400 to-blue-500',
    green: 'from-emerald-400 to-green-500',
    purple: 'from-purple-400 to-pink-500',
    orange: 'from-orange-400 to-amber-500',
  } as const;

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
          <h1 className={`text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${accentGradient[accent]}`}>
            {description}
          </h1>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;
