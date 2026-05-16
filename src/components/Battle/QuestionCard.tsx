import React from 'react';
import { Card } from '../Card';

type Answer = {
  id: string;
  text: string;
};

type Props = {
  question: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  timer?: number;
  answers: Answer[];
  onSelect?: (id: string) => void;
  selectedId?: string | null;
  correctId?: string | null;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  difficulty = 'medium',
  category = 'General',
  timer = 30,
  answers,
  onSelect,
  selectedId,
  correctId,
}) => {
  return (
    <Card title="Question" accent="cyan">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs rounded-full bg-white/6 text-gray-200">{category}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-white/6 text-gray-200">{difficulty.toUpperCase()}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{question}</h3>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-400">Timer</div>
          <div className="mt-1 text-xl font-mono text-green-300">{timer}s</div>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {answers.map((a) => {
          const isSelected = selectedId === a.id;
          const isCorrect = correctId === a.id;
          const base = 'p-3 rounded-lg cursor-pointer transition-shadow';
          const stateClass = isCorrect
            ? 'bg-green-700/50 ring-2 ring-green-400'
            : isSelected
            ? 'bg-white/6 ring-2 ring-cyan-400'
            : 'bg-white/3 hover:scale-[1.01] hover:shadow-glow';

          return (
            <div
              key={a.id}
              className={`${base} ${stateClass}`}
              onClick={() => onSelect && onSelect(a.id)}
            >
              <div className="text-sm text-gray-100">{a.text}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default QuestionCard;
