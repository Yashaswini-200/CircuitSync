import type { Battle } from '../types/index';
import { Card } from './Card';

interface BattleCardProps {
  battle: Battle;
  onClick?: () => void;
}

export const BattleCard = ({ battle, onClick }: BattleCardProps) => {
  const totalQuestions = battle.questions?.length || 0;
  const solvedQuestions = battle.questions?.filter((q) => q.status === 'solved').length || 0;
  const accentColor = battle.status === 'completed' ? 'green' : 'purple';

  return (
    <Card
      title={battle.title}
      subtitle={`${battle.topic.replace(/-/g, ' ')} • ${battle.status}`}
      accent={accentColor}
      interactive
      onClick={onClick}
    >
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Questions:</span>
          <span className="font-semibold text-cyan-300">
            {solvedQuestions}/{totalQuestions}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Participants:</span>
          <span className="font-semibold text-cyan-300">{battle.participants.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">XP Stake:</span>
          <span className="font-semibold text-orange-300">{battle.xpStake} XP</span>
        </div>
      </div>
    </Card>
  );
};
