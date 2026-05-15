/**
 * Tasks page for engineering work planning and completion
 */

import { useState, type FormEvent } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';
import { TaskList } from '../components/TaskList';
import { useApp, useTasks } from '../hooks';
import type { TaskCategory, TaskEffort } from '../types/index';

interface TaskFormState {
  title: string;
  description: string;
  category: TaskCategory;
  effort: TaskEffort;
  xpReward: number;
}

const defaultTaskForm: TaskFormState = {
  title: '',
  description: '',
  category: 'revision',
  effort: 'medium',
  xpReward: 25,
};

const Tasks = () => {
  const { state } = useApp();
  const { completedTasks, pendingTasks, addTask, completeTask } = useTasks();
  const [form, setForm] = useState(defaultTaskForm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!state.currentUserId || !form.title.trim() || !form.description.trim()) {
      return;
    }

    addTask({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      effort: form.effort,
      xpReward: Number(form.xpReward),
      completed: false,
      createdAt: new Date().toISOString(),
      userId: state.currentUserId,
    });

    setForm(defaultTaskForm);
  };

  return (
    <MainLayout>
      <PageShell title="Tasks" description="Plan your engineering mission" accent="green">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            <Card
              icon="🛠️"
              title="Active engineering tasks"
              subtitle={`You have ${pendingTasks.length} pending task${pendingTasks.length === 1 ? '' : 's'}`}
              accent="green"
            >
              <TaskList tasks={[...pendingTasks, ...completedTasks]} onToggleComplete={completeTask} />
            </Card>
          </div>

          <div className="space-y-6">
            <Card
              icon="⚡"
              title="Task builder"
              subtitle="Create mission milestones"
              accent="cyan"
            >
              {state.currentUserId ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300">Title</label>
                    <input
                      value={form.title}
                      onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/60"
                      placeholder="e.g. Review UART timing analysis"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/60"
                      rows={4}
                      placeholder="Describe the engineering milestone or review session"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-gray-300">
                      Category
                      <select
                        value={form.category}
                        onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value as any }))}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/60"
                      >
                        <option value="revision">Revision</option>
                        <option value="coding">Coding</option>
                        <option value="interview">Interview</option>
                        <option value="question-practice">Question Practice</option>
                        <option value="project">Project</option>
                        <option value="review">Review</option>
                      </select>
                    </label>
                    <label className="block text-sm text-gray-300">
                      Effort
                      <select
                        value={form.effort}
                        onChange={(event) => setForm((prev) => ({ ...prev, effort: event.target.value as any }))}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/60"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </label>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">XP Reward</label>
                    <input
                      type="number"
                      value={form.xpReward}
                      min={5}
                      onChange={(event) => setForm((prev) => ({ ...prev, xpReward: Number(event.target.value) }))}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/60"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
                  >
                    Add milestone
                  </button>
                </form>
              ) : (
                <p className="text-sm text-gray-400">Select or create a user to track tasks, XP, and streaks.</p>
              )}
            </Card>

            <Card icon="📌" title="Priorities" subtitle="Focus your sprint" accent="purple">
              <ul className="space-y-3 text-sm text-gray-400">
                <li>Complete one high-effort task before the end of the day.</li>
                <li>Keep streak alive by finishing at least one task daily.</li>
                <li>Choose review sessions that reinforce engineering fundamentals.</li>
              </ul>
            </Card>
          </div>
        </div>
      </PageShell>
    </MainLayout>
  );
};

export default Tasks;
