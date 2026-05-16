import React from 'react';
import { Card } from '../Card';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  time?: string;
};

export const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const priorityColor = task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500';

  return (
    <Card title={task.title} accent={task.completed ? 'green' : 'cyan'}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-gray-400">{task.category || 'General'}</div>
          <div className="text-sm text-gray-100 mt-1">{task.time || '—'}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${priorityColor} w-3 h-3 rounded-full`} />
          <div className={`text-sm ${task.completed ? 'text-green-300' : 'text-gray-300'}`}>{task.completed ? 'Done' : 'Pending'}</div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
