import React from 'react';

const BattleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-[70vh] p-6 bg-gradient-to-b from-black/80 to-black/70 rounded-2xl shadow-lg border border-white/5">
      {children}
    </div>
  );
};

export default BattleLayout;
