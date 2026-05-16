import React from 'react';

export const Heatmap: React.FC<{ activityMap: Record<string, number> }> = ({ activityMap }) => {
  // Render a simple 7x5 heatmap placeholder for recent days
  const days = Object.keys(activityMap).slice(-35);

  return (
    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
      <div className="text-sm text-gray-300 font-semibold mb-2">Activity Heatmap</div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const v = activityMap[d] || 0;
          const intensity = v > 75 ? 'bg-cyan-400' : v > 40 ? 'bg-cyan-300' : v > 10 ? 'bg-cyan-200' : 'bg-white/6';
          return <div key={d} className={`${intensity} w-full h-4 rounded-sm`} title={`${d}: ${v}`} />;
        })}
      </div>
    </div>
  );
};

export default Heatmap;
