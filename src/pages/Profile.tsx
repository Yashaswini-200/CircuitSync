import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';

const Profile = () => {
  return (
    <MainLayout>
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Profile" accent="purple">
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">A</div>
                <div>
                  <div className="text-sm text-gray-300">Aditya Embedded</div>
                  <div className="text-2xl text-white font-semibold mt-1">Level 4 • Register Warrior</div>
                  <div className="text-sm text-gray-400 mt-2">Specialization: Digital Design</div>
                </div>
              </div>
            </Card>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card title="XP Overview" accent="cyan">
                <div className="mt-2 text-xl text-white">3,450 XP</div>
              </Card>
              <Card title="Current Streak" accent="green">
                <div className="mt-2 text-xl text-white">7 days</div>
              </Card>
              <Card title="Rank" accent="orange">
                <div className="mt-2 text-xl text-white">Top 5%</div>
              </Card>
            </div>
          </div>

          <div>
            <Card title="Achievements" accent="cyan">
              <div className="text-sm text-gray-300">Achievements</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {new Array(6).fill(0).map((_, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg flex items-center justify-center text-xs text-gray-200">{i < 3 ? 'Unlocked' : 'Locked'}</div>
                ))}
              </div>
            </Card>

            <div className="mt-4">
              <Card title="Recent Activity" accent="purple">
                <div className="mt-3 space-y-2 text-sm text-gray-200">
                  <div>Won Battle vs Nova • +120 XP</div>
                  <div>Completed Verilog practice • +45 XP</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
