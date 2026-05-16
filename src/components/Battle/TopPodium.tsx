import React from 'react';

export const TopPodium: React.FC<{ top: { name: string; xp: number }[] }> = ({ top }) => {
  return (
    <div className="flex items-end justify-center gap-3">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-yellow-600/20 rounded-lg flex items-center justify-center text-white font-bold">{top[1]?.name?.charAt(0) || '2'}</div>
        <div className="mt-2 text-xs text-gray-300">2</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 bg-amber-400/30 rounded-lg flex items-center justify-center text-white font-bold text-lg">{top[0]?.name?.charAt(0) || '1'}</div>
        <div className="mt-2 text-xs text-gray-300">1</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-500/20 rounded-lg flex items-center justify-center text-white font-bold">{top[2]?.name?.charAt(0) || '3'}</div>
        <div className="mt-2 text-xs text-gray-300">3</div>
      </div>
    </div>
  );
};

export default TopPodium;
