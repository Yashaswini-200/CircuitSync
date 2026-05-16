/**
 * Reusable page shell for route-level pages
 */

import type { ReactNode } from 'react';
import { PageContainer } from './PageContainer';
import { PageHeader } from './PageHeader';
import { ResponsiveGrid } from './ResponsiveGrid';

interface PageShellProps {
  title: string;
  description: string;
  accent?: 'cyan' | 'green' | 'purple' | 'orange';
  children: ReactNode;
}

export const PageShell = ({ title, description, accent = 'cyan', children }: PageShellProps) => {
  return (
    <PageContainer>
      <PageHeader title={title} description={description} accent={accent}>
        <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300">
          <span className="font-medium text-gray-100">Status</span>
          <p className="text-xs text-gray-400">Live route rendering</p>
        </div>
      </PageHeader>

      <ResponsiveGrid>{children}</ResponsiveGrid>
    </PageContainer>
  );
};
