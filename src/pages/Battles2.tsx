import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import BattleLayout from '../components/Battle/BattleLayout';
import QuestionCard from '../components/Battle/QuestionCard';
import Leaderboard from '../components/Battle/Leaderboard';
import TopPodium from '../components/Battle/TopPodium';

const sampleAnswers = [
  { id: 'a', text: 'Pull-up resistor' },
  { id: 'b', text: 'Push-down resistor' },
  { id: 'c', text: 'Series resistor' },
  { id: 'd', text: 'Parallel resistor' },
];

const Battles2 = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-2xl font-semibold text-white mb-6">Battles — Day 2 Preview</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BattleLayout>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuestionCard
                  question="Which resistor configuration increases total resistance?"
                  difficulty="medium"
                  category="Electronics"
                  timer={25}
                  answers={sampleAnswers}
                  onSelect={(id) => setSelected(id)}
                  selectedId={selected}
                  correctId={null}
                />

                <div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-400">XP Reward</div>
                    <div className="text-3xl font-bold text-cyan-300">+120 XP</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400">Streak Bonus</div>
                    <div className="text-xl font-semibold text-green-300">+15%</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400">Progress</div>
                    <div className="w-full h-3 bg-white/6 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-gray-400">Timer</div>
                    <div className="text-2xl font-mono text-orange-300 mt-1">00:25</div>
                  </div>
                </div>
              </div>
            </BattleLayout>
          </div>

          <div className="space-y-4">
            <div>
              <TopPodium top={[{ name: 'Aditya', xp: 2450 }, { name: 'Priya', xp: 2100 }, { name: 'Nova', xp: 1950 }]} />
            </div>
            <Leaderboard entries={[{ name: 'Aditya', xp: 2450, rank: 1 }, { name: 'Priya', xp: 2100, rank: 2 }, { name: 'Nova', xp: 1950, rank: 3 }]} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Battles2;
