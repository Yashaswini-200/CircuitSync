import { useMemo, useState } from 'react';
import CalendarMonth from './CalendarMonth';
import DayPanel from './DayPanel';
import Heatmap from './Heatmap';
import ProductivityStats from './ProductivityStats';
import LoadingSkeleton from './LoadingSkeleton';

const generateMock = (year: number, month: number) => {
  const map: Record<string, any> = {};
  for (let d = 1; d <= 28; d++) {
    const date = new Date(year, month, d).toISOString().split('T')[0];
    const tasksCount = Math.floor(Math.random() * 4);
    map[date] = {
      tasks: new Array(tasksCount).fill(0).map((_, i) => ({
        id: `${d}-${i}`,
        title: `Task ${i + 1}`,
        completed: Math.random() > 0.3,
        category: ['Study', 'Battle', 'Practice'][Math.floor(Math.random() * 3)],
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        time: `${9 + i}:0${Math.floor(Math.random() * 5)}AM`,
      })),
      xp: Math.floor(Math.random() * 200),
      studyHours: +(Math.random() * 3).toFixed(1),
      battles: Math.floor(Math.random() * 2),
      score: Math.floor(Math.random() * 100),
      notes: Math.random() > 0.6 ? 'Good focus today.' : '',
    };
  }
  return map;
};

export const CalendarDashboard = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(today.toISOString().split('T')[0]);
  const [loading] = useState(false);

  const mock = useMemo(() => generateMock(year, month), [year, month]);

  const activityMap = useMemo(() => {
    const out: Record<string, number> = {};
    Object.keys(mock).forEach((k) => {
      out[k] = mock[k].tasks.length * 25 + mock[k].xp / 4;
    });
    return out;
  }, [mock]);

  const dayData = mock[selected];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-lg shadow-cyan-500/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Productivity Calendar</p>
            <h2 className="text-xl font-semibold text-white">Track your daily wins</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
            <button
              type="button"
              className="rounded-2xl border border-white/10 px-3 py-2 transition hover:border-cyan-400"
              onClick={() => {
                setMonth((m) => (m + 11) % 12);
                if (month === 0) setYear((y) => y - 1);
              }}
            >
              ◀
            </button>
            <div className="min-w-[140px] text-center">{new Date(year, month).toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
            <button
              type="button"
              className="rounded-2xl border border-white/10 px-3 py-2 transition hover:border-cyan-400"
              onClick={() => {
                setMonth((m) => (m + 1) % 12);
                if (month === 11) setYear((y) => y + 1);
              }}
            >
              ▶
            </button>
          </div>
        </div>

        <CalendarMonth
          year={year}
          month={month}
          selected={selected}
          activityMap={Object.fromEntries(Object.entries(activityMap).map(([k, v]) => [k, Math.round(v)]))}
          onSelect={(d) => setSelected(d)}
        />

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-gray-400">Streak</div>
            <div className="mt-2 text-2xl font-semibold text-green-300">{Math.floor(Math.random() * 10)} days</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-gray-400">Completed This Month</div>
            <div className="mt-2 text-2xl font-semibold text-cyan-300">{Object.values(mock).reduce((s:any, v:any) => s + v.tasks.length, 0)}</div>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6">
          <DayPanel data={dayData} dateStr={selected} />
          <div className="space-y-4">
            <Heatmap activityMap={Object.fromEntries(Object.entries(activityMap).map(([k, v]) => [k, Math.round(v)]))} />
            <ProductivityStats
              totalTasks={Object.values(mock).reduce((s:any, v:any) => s + v.tasks.length, 0)}
              weeklyConsistency={Math.floor(Math.random() * 100)}
              monthlyStreak={Math.floor(Math.random() * 14)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDashboard;
