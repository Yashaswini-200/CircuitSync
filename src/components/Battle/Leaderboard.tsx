import React from 'react';
import { Card } from '../Card';

type Entry = { name: string; xp: number; rank: number; winRate?: string };

export const Leaderboard: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <Card title="Leaderboard" accent="green">
      <div className="space-y-2">
        {entries.map((e) => (
          <div key={e.rank} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/6 flex items-center justify-center text-sm font-bold">{e.rank}</div>
              <div className="text-gray-200">{e.name}</div>
            </div>
            <div className="text-green-300 font-semibold">{e.xp} XP</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Leaderboard;
