import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';

const StatCard: React.FC<{ title: string; value: string; accent?: 'cyan' | 'green' | 'purple' | 'orange' }> = ({ title, value, accent = 'cyan' }) => (
  <Card title={title} accent={accent}>
    <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
  </Card>
);

const WeeklyReview = () => {
  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-2xl font-semibold text-white mb-6">Weekly Review</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total XP" value="4,320" accent="cyan" />
          <StatCard title="Battle Wins" value="18" accent="green" />
          <StatCard title="Study Hours" value="12.4h" accent="purple" />
          <StatCard title="Solved Questions" value="72" accent="orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Weekly XP" subtitle="XP over time" accent="purple">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-300">Weekly XP</div>
                  <div className="text-xl font-semibold text-white mt-2">XP over time (placeholder)</div>
                </div>
                <div className="text-sm text-gray-400">+12% vs last week</div>
              </div>

              <div className="mt-6 h-48 bg-white/5 rounded-lg flex items-center justify-center text-gray-400">Chart placeholder</div>
            </Card>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card title="Consistency" accent="orange">
                  <div className="mt-2 text-xl font-semibold text-white">5 days streak</div>
                </Card>
                <Card title="Study Hours" accent="green">
                  <div className="mt-2 text-xl font-semibold text-white">12.4h</div>
                </Card>
            </div>
          </div>

          <div>
            <Card title="Weak Topics" accent="orange">
              <div className="text-sm text-gray-300">Weak Topics</div>
              <div className="mt-3 space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <div>Analog Design</div>
                    <div>28%</div>
                  </div>
                  <div className="w-full h-2 bg-white/6 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-red-400" style={{ width: '28%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <div>Verilog</div>
                    <div>34%</div>
                  </div>
                  <div className="w-full h-2 bg-white/6 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-red-400" style={{ width: '34%' }} />
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-4">
              <Card title="Strong Areas" accent="cyan">
                <div className="mt-3 space-y-2">
                  <div className="p-3 bg-white/6 rounded-md">Digital Logic — 92% mastery</div>
                  <div className="p-3 bg-white/6 rounded-md">Microcontrollers — 88% mastery</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WeeklyReview;
