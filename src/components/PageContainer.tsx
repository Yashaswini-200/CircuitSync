import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">{children}</div>
  );
};

export default PageContainer;
