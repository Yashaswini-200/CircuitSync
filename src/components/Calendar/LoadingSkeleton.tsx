import React from 'react';

export const LoadingSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-white/5 rounded animate-pulse" />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
