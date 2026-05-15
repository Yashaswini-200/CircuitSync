import type { Task } from '../types/index';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
}

const categoryStyles: Record<string, string> = {
  revision: 'bg-slate-700 text-cyan-300',
  coding: 'bg-slate-700 text-green-300',
  interview: 'bg-slate-700 text-purple-300',
  'question-practice': 'bg-slate-700 text-orange-300',
  project: 'bg-slate-700 text-blue-300',
  review: 'bg-slate-700 text-teal-300',
};

export const TaskList = ({ tasks, onToggleComplete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/25 p-6 text-sm text-gray-400">
        No active tasks yet. Add a milestone to start earning XP and maintain your streak.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/40 p-5 transition-all duration-200 hover:border-cyan-500/40 hover:bg-white/5 ${
            task.completed ? 'opacity-80' : ''
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  {task.category.replace(/-/g, ' ')}
                </span>
                <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${categoryStyles[task.category]}`}>
                  {task.effort}
                </span>
              </div>
              <h4 className="mt-2 text-lg font-semibold text-white">{task.title}</h4>
              <p className="mt-1 text-sm text-gray-400">{task.description}</p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <div className="text-sm text-gray-400">{task.xpReward} XP</div>
              <button
                type="button"
                onClick={() => onToggleComplete(task.id)}
                className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  task.completed
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400'
                    : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200 hover:border-cyan-400'
                }`}
              >
                {task.completed ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
