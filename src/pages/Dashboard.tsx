/**
 * Main Dashboard page - Stats overview and quick actions
 */

import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { PageShell } from '../components/PageShell';

const Dashboard = () => {
  return (
    <MainLayout>
      <PageShell title="Dashboard" description="Mission control for the engineering grind" accent="cyan">
        <Card
          icon="🔥"
          title="Current Streak"
          value="3"
          unit="days"
          accent="orange"
        />
        <Card
          icon="⭐"
          title="XP Earned"
          value="1,250"
          unit="total XP"
          accent="cyan"
        />
        <Card
          icon="🏆"
          title="Current Level"
          value="Register Rookie"
          subtitle="Level 2"
          accent="purple"
        />
        <Card
          icon="💪"
          title="Longest Streak"
          value="12"
          unit="days"
          accent="green"
        />
      </PageShell>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Level Progress */}
        <Card
          icon="📈"
          title="Level Progress"
          subtitle="Register Rookie → Interrupt Survivor"
          accent="cyan"
        >
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>1,250 XP</span>
              <span>3,000 XP</span>
            </div>
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/20">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: '42%' }}
              />
            </div>
          </div>
        </Card>

        {/* Active Tasks */}
        <Card
          icon="✅"
          title="Today's Tasks"
          subtitle="3 completed, 2 remaining"
          accent="green"
        >
          <div className="mt-4 space-y-2">
            <div className="text-sm text-gray-400">✓ ARM Assembly Review</div>
            <div className="text-sm text-gray-400">✓ GPIO Exercise</div>
            <div className="text-sm text-gray-500">◯ Interrupt Handler</div>
          </div>
        </Card>

        {/* Time Remaining */}
        <Card
          icon="⏱️"
          title="Streak at Risk"
          subtitle="Next action in"
          accent="orange"
        >
          <div className="mt-4">
            <div className="text-2xl font-bold text-orange-400">23h 45m</div>
            <p className="text-xs text-gray-500 mt-2">Complete a task to maintain streak</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
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
              <span className="text-cyan-400 font-semibold">15/20</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Streak Days</span>
              <span className="text-green-400 font-semibold">7 days</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">XP Gained</span>
              <span className="text-purple-400 font-semibold">450 XP</span>
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
              <p className="text-sm text-purple-300 font-medium">Battle #42: Embedded Systems</p>
              <p className="text-xs text-gray-500 mt-1">3rd place • 1250 XP</p>
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
