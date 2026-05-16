import React from 'react';
import { Card } from '../Card';
import TaskCard from './TaskCard';

type DayData = {
  dateStr: string;
  tasks: Array<{ id:string; title:string; completed:boolean; category?:string; priority?:'low'|'medium'|'high'; time?:string }>;
  xp: number;
  studyHours: number;
  battles: number;
  score: number;
  notes?: string;
};

export const DayPanel: React.FC<{ data?: DayData; dateStr: string }> = ({ data, dateStr }) => {
  if (!data) {
    return (
      <Card title={dateStr} accent="cyan">
        <div className="text-sm text-gray-400">No activity for this day.</div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card title={`${dateStr} — Summary`} accent="cyan">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-gray-200">
          <div>
            <div className="text-xs text-gray-400">XP Earned</div>
            <div className="text-lg font-semibold text-cyan-300">+{data.xp}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Study Hours</div>
            <div className="text-lg font-semibold text-white">{data.studyHours}h</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Battles</div>
            <div className="text-lg font-semibold text-green-300">{data.battles}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Productivity</div>
            <div className="text-lg font-semibold text-purple-300">{data.score}%</div>
          </div>
        </div>
      </Card>

      <Card title="Tasks" accent="green">
        <div className="space-y-3">
          {data.tasks.length === 0 ? (
            <div className="text-sm text-gray-400">No tasks completed on this date.</div>
          ) : (
            data.tasks.map((t) => <TaskCard key={t.id} task={t} />)
          )}
        </div>
      </Card>

      <Card title="Notes" accent="purple">
        <div className="text-sm text-gray-200">{data.notes || 'No notes for this day.'}</div>
      </Card>
    </div>
  );
};

export default DayPanel;
