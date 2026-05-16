import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { useCurrentUser, useTasks, useStreak, useXP } from '../hooks';

const Profile = () => {
  const { currentUser, isGuest } = useCurrentUser();
  const { tasks, completedTasks } = useTasks();
  const { streak, isAtRisk } = useStreak();
  const { xpData, levelTitle } = useXP();

  if (isGuest || !currentUser) {
    return (
      <MainLayout>
        <Card title="Profile" accent="purple">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center text-sm text-gray-300">
            No active account is selected.
            <div className="mt-3 text-gray-400">Open the account switcher and choose or create a profile to see your personalized stats.</div>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Profile" accent="purple">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-4xl font-bold text-white">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-sm text-gray-300">{currentUser.name}</div>
                    <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                      Active account
                    </span>
                  </div>
                  <div className="text-2xl text-white font-semibold">{levelTitle} • {xpData.totalXP} XP</div>
                  <div className="text-sm text-gray-400">Specialization: {currentUser.specialization}</div>
                </div>
              </div>
            </Card>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card title="XP" accent="cyan">
                <div className="mt-2 text-xl text-white">{xpData.totalXP}</div>
                <div className="text-sm text-gray-400">Level {xpData.level}</div>
              </Card>
              <Card title="Streak" accent="green">
                <div className="mt-2 text-xl text-white">{streak.currentStreak} days</div>
                <div className="text-sm text-gray-400">{isAtRisk ? 'At risk' : 'On track'}</div>
              </Card>
              <Card title="Tasks" accent="orange">
                <div className="mt-2 text-xl text-white">{tasks.length}</div>
                <div className="text-sm text-gray-400">{completedTasks.length} completed</div>
              </Card>
            </div>
          </div>

          <div>
            <Card title="Account details" accent="cyan">
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-gray-500">Name</div>
                  <div className="mt-2 text-white">{currentUser.name}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-gray-500">Specialization</div>
                  <div className="mt-2 text-white">{currentUser.specialization}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-gray-500">Joined</div>
                  <div className="mt-2 text-white">{new Date(currentUser.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </Card>

            <div className="mt-4">
              <Card title="Recent activity" accent="purple">
                <div className="space-y-3 text-sm text-gray-300">
                  <div>Continue your streak by completing another task today.</div>
                  <div>Battle activity and progress are tied to this active account.</div>
                  <div>Switch accounts to see isolated progress and performance.</div>
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
