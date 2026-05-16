import React from 'react';
import { Card } from '../Card';

export const ProductivityStats: React.FC<{ totalTasks:number; weeklyConsistency:number; monthlyStreak:number }> = ({ totalTasks, weeklyConsistency, monthlyStreak }) => {
  return (
    <Card title="Productivity Insights" accent="purple">
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Weekly Consistency</div>
          <div className="text-sm text-white">{weeklyConsistency}%</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Monthly Streak</div>
          <div className="text-sm text-white">{monthlyStreak} days</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Total Completed</div>
          <div className="text-sm text-white">{totalTasks}</div>
        </div>
      </div>
    </Card>
  );
};

export default ProductivityStats;
