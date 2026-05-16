/**
 * Streaks page - Consistency and no-zero-day tracking
 */

import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';
import { useStreak, useTasks } from '../hooks';
import { getTodayDateString } from '../utils/streak';

const Streaks = () => {
  const { streak, isAtRisk, bonusMultiplier } = useStreak();
  const { completedTasks } = useTasks();

  const today = getTodayDateString();
  const completedToday = completedTasks.filter((t) => t.completedAt?.split('T')[0] === today).length;

  const streakHealthColor = isAtRisk ? 'orange' : streak.currentStreak > 7 ? 'green' : 'cyan';

  return (
    <MainLayout>
      <PageShell title="Streaks" description="Keep your consistency alive" accent="orange">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* Main Streak Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card
                icon="🔥"
                title="Current Streak"
                value={streak.currentStreak}
                unit="days"
                accent="orange"
              />
              <Card
                icon="🏔️"
                title="Longest Streak"
                value={streak.longestStreak}
                unit="days"
                accent="green"
              />
              <Card
                icon="📅"
                title="Total Active Days"
                value={streak.totalDaysActive}
                unit="days"
                accent="purple"
              />
            </div>

            {/* Streak Health & Status */}
            <Card icon="💚" title="Streak Health" subtitle="Daily commitment status" accent={streakHealthColor as any}>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-400">Progress Today</span>
                    <span className="font-semibold text-cyan-300">{completedToday} task{completedToday !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-3 w-full rounded-full border border-orange-500/20 bg-black/50 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all"
                      style={{ width: `${Math.min(100, completedToday * 50)}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
                  <p className="text-sm text-orange-200">
                    {isAtRisk
                      ? '⚠️ Complete at least one task before midnight to keep your streak alive!'
                      : '✅ Your streak is safe. Keep building momentum!'}
                  </p>
                </div>

                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Activity</span>
                    <span className="font-semibold text-gray-300">
                      {streak.lastActivityDate || 'Never'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">XP Multiplier</span>
                    <span className="font-semibold text-green-300">{bonusMultiplier.toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Streak Breakdown */}
            <Card
              icon="📊"
              title="Streak Breakdown"
              subtitle="Daily consistency analysis"
              accent="cyan"
            >
              <div className="mt-4 space-y-3">
                <div>
                  <p className="mb-3 text-xs text-gray-400">MILESTONE ACHIEVEMENTS</p>
                  <div className="space-y-2">
                    {[
                      { days: 3, emoji: '🌱', label: 'Sprout', unlock: streak.longestStreak >= 3 },
                      { days: 7, emoji: '🌿', label: 'Growth', unlock: streak.longestStreak >= 7 },
                      { days: 14, emoji: '🌳', label: 'Flourish', unlock: streak.longestStreak >= 14 },
                      { days: 30, emoji: '🏔️', label: 'Peak', unlock: streak.longestStreak >= 30 },
                    ].map((m) => (
                      <div key={m.days} className="flex items-center gap-3">
                        <span className={m.unlock ? 'text-2xl' : 'text-xl opacity-30'}>{m.emoji}</span>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${m.unlock ? 'text-gray-300' : 'text-gray-600'}`}>
                            {m.label}
                          </p>
                          <p className={`text-xs ${m.unlock ? 'text-gray-500' : 'text-gray-700'}`}>
                            {m.days} day streak
                          </p>
                        </div>
                        {m.unlock && <span className="text-lg">✅</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* How Streaks Work */}
            <Card
              icon="ℹ️"
              title="How Streaks Work"
              subtitle="The engineering consistency system"
              accent="purple"
            >
              <div className="mt-4 space-y-3 text-sm text-gray-300">
                <p>
                  <strong>🎯 Daily Requirement:</strong> Complete at least one task per day to maintain your streak.
                </p>
                <p>
                  <strong>⏰ Reset Window:</strong> You have until midnight UTC to complete a task.
                </p>
                <p>
                  <strong>📈 Bonus Multiplier:</strong> Your streak multiplies XP rewards, up to 1.5x at 30 days.
                </p>
                <p>
                  <strong>🔄 Multiple Tasks:</strong> Completing multiple tasks in one day doesn't break your streak logic.
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card
              icon="🎖️"
              title="Streak Milestones"
              subtitle="Goals & rewards"
              accent="green"
            >
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex gap-2">
                  <span className="font-semibold text-green-300">7 days</span>
                  <span className="text-gray-400">+25 XP bonus</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-green-300">14 days</span>
                  <span className="text-gray-400">+50 XP bonus</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-green-300">30 days</span>
                  <span className="text-gray-400">Level up!</span>
                </div>
              </div>
            </Card>

            <Card
              icon="⚡"
              title="Quick Actions"
              subtitle="Get back on track"
              accent="cyan"
            >
              <div className="mt-3 space-y-2">
                <p className="text-xs text-gray-400">
                  Go to <strong>Tasks</strong> page to complete a task and maintain your streak.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </PageShell>
    </MainLayout>
  );
};

export default Streaks;
