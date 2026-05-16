import type { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export const SectionWrapper = ({ children, className = '' }: SectionWrapperProps) => {
  return <section className={`space-y-4 ${className}`}>{children}</section>;
};

export default SectionWrapper;
