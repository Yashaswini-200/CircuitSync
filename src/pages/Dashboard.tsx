/**
 * Main Dashboard page - Stats overview and quick actions
 */

import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { PageShell } from '../components/PageShell';
import { useTasks, useStreak, useXP } from '../hooks';
import { daysBetween, getTodayDateString } from '../utils/streak';

const Dashboard = () => {
  const { tasks, completedTasks, pendingTasks } = useTasks();
  const { streak, isAtRisk } = useStreak();
  const { xpData, levelTitle, nextLevelXP } = useXP();

  const today = getTodayDateString();
  const completedThisWeek = completedTasks.filter((task) => {
    return task.completedAt ? daysBetween(task.completedAt.split('T')[0], today) <= 7 : false;
  }).length;

  const recentTasks = tasks.slice(0, 3);
  const streakStatus = isAtRisk ? 'Keep the streak alive by finishing a task today' : 'Streak is on track';

  return (
    <MainLayout>
      <PageShell title="Dashboard" description="Mission control for the engineering grind" accent="cyan">
        <Card icon="🔥" title="Current Streak" value={streak.currentStreak} unit="days" accent="orange" />
        <Card icon="⭐" title="XP Earned" value={xpData.totalXP} unit="total XP" accent="cyan" />
        <Card icon="🏆" title="Current Level" value={levelTitle} subtitle={`Level ${xpData.level}`} accent="purple" />
        <Card icon="💪" title="Longest Streak" value={streak.longestStreak} unit="days" accent="green" />
      </PageShell>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card
          icon="📈"
          title="Level Progress"
          subtitle={`Level ${xpData.level} → ${Math.min(xpData.level + 1, 5)}`}
          accent="cyan"
        >
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{xpData.totalXP} XP</span>
              <span>{nextLevelXP > 0 ? `${xpData.totalXP + nextLevelXP} XP` : 'MAX'}</span>
            </div>
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/20">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: `${xpData.levelProgress}%` }}
              />
            </div>
          </div>
        </Card>

        <Card
          icon="✅"
          title="Today's Tasks"
          subtitle={`${completedTasks.length} completed, ${pendingTasks.length} remaining`}
          accent="green"
        >
          <div className="mt-4 space-y-2">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="text-sm text-gray-400">
                  {task.completed ? '✓' : '◯'} {task.title}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">Create tasks in the Tasks page to start building momentum.</div>
            )}
          </div>
        </Card>

        <Card
          icon="⏱️"
          title="Streak Status"
          subtitle={streakStatus}
          accent="orange"
        >
          <div className="mt-4">
            <div className="text-2xl font-bold text-orange-400">{streak.currentStreak} days</div>
            <p className="text-xs text-gray-500 mt-2">
              {isAtRisk ? 'Finish one more task before midnight to avoid reset.' : 'Your streak is stable for now.'}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card
          icon="📊"
          title="This Week"
          subtitle="Your performance overview"
          accent="cyan"
        >
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Tasks Completed</span>
              <span className="text-cyan-400 font-semibold">{completedThisWeek}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Streak Days</span>
              <span className="text-green-400 font-semibold">{streak.currentStreak} days</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">XP Gained</span>
              <span className="text-purple-400 font-semibold">{xpData.totalXP} XP</span>
            </div>
          </div>
        </Card>

        <Card
          icon="⚔️"
          title="Competitive Battles"
          subtitle="Battle status"
          accent="purple"
        >
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300 font-medium">Battle system is ready for your next challenge.</p>
              <p className="text-xs text-gray-500 mt-1">Track wins and XP when head-to-head mode is live.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leaderboard Preview */}
      <Card
        icon="👥"
        title="Leaderboard Top 5"
        subtitle="This week"
        accent="green"
      >
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-sm py-2 border-b border-green-500/20">
            <span className="text-gray-300">🥇 Aditya Embedded</span>
            <span className="text-green-400 font-semibold">2,450 XP</span>
          </div>
          <div className="flex justify-between items-center text-sm py-2 border-b border-green-500/20">
            <span className="text-gray-300">🥈 Priya VLSI Master</span>
            <span className="text-green-400 font-semibold">2,100 XP</span>
          </div>
          <div className="flex justify-between items-center text-sm py-2 border-b border-green-500/20">
            <span className="text-gray-300">🥉 Code Warrior</span>
            <span className="text-green-400 font-semibold">1,950 XP</span>
          </div>
          <div className="flex justify-between items-center text-sm py-2 border-b border-green-500/20">
            <span className="text-gray-300">4. Debug Master</span>
            <span className="text-green-400 font-semibold">1,750 XP</span>
          </div>
          <div className="flex justify-between items-center text-sm py-2">
            <span className="text-gray-300">5. Logic Designer</span>
            <span className="text-green-400 font-semibold">1,650 XP</span>
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default Dashboard;
