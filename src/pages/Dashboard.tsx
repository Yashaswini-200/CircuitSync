/**
 * Main Dashboard page - Stats overview and quick actions
 */

import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { PageShell } from '../components/PageShell';
import { useTasks, useStreak, useXP, useRevisionHistory } from '../hooks';
import { daysBetween, getTodayDateString } from '../utils/streak';

const Dashboard = () => {
  const { tasks, completedTasks, pendingTasks } = useTasks();
  const { streak, isAtRisk } = useStreak();
  const { xpData, levelTitle, nextLevelXP } = useXP();
  const { totalSessions, averageAccuracy, recentWeakTopics } = useRevisionHistory();

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
          icon="⚡"
          title="Revision Readiness"
          subtitle="Lab progress"
          accent="purple"
        >
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <p>
              {totalSessions > 0
                ? `You have completed ${totalSessions} revision session${totalSessions === 1 ? '' : 's'}.`
                : 'Launch your first revision session in the Lab to build momentum.'}
            </p>
            <p>
              Average recall accuracy: <span className="font-semibold text-white">{averageAccuracy}%</span>
            </p>
            <p>
              Top weak topics: {recentWeakTopics.length > 0 ? recentWeakTopics.join(', ') : 'None yet — start practicing to find your gaps.'}
            </p>
          </div>
        </Card>
      </div>

      <Card
        icon="🧭"
        title="Revision Focus"
        subtitle="What matters most"
        accent="green"
      >
        <div className="mt-4 space-y-3 text-sm text-gray-300">
          <p>Use the Lab to turn your streaks and XP into real engineering recall.</p>
          <p>Focus on subjects that reinforce weak topics and interview confidence.</p>
          <p>
            {recentWeakTopics.length > 0
              ? `Start with: ${recentWeakTopics.join(' • ')}`
              : 'No weak topics identified yet — start a session to build the first signal.'}
          </p>
        </div>
      </Card>
    </MainLayout>
  );
};

export default Dashboard;
