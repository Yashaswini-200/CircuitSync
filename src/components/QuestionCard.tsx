import type { BattleQuestion } from '../types/index';

interface QuestionCardProps {
  question: BattleQuestion;
  authorName?: string;
  onMarkSolved?: () => void;
  onShowAnswers?: () => void;
  isCurrentUserAsker?: boolean;
}

export const QuestionCard = ({
  question,
  authorName,
  onMarkSolved,
  onShowAnswers,
  isCurrentUserAsker,
}: QuestionCardProps) => {
  const statusEmoji = {
    unanswered: '❓',
    answered: '💬',
    solved: '✅',
    disputed: '⚠️',
  } as const;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 transition-all hover:border-cyan-500/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg">{statusEmoji[question.status]}</span>
            <span className="inline-block rounded-full bg-slate-700 px-2 py-1 text-xs font-semibold text-cyan-300">
              {question.topic.replace(/-/g, ' ')}
            </span>
            <span className="text-xs text-gray-500">
              by {authorName || 'Unknown'} • {question.xpReward} XP
            </span>
          </div>

          <h4 className="mb-2 text-lg font-semibold text-white">{question.question}</h4>
          {question.description && <p className="mb-3 text-sm text-gray-400">{question.description}</p>}

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onShowAnswers}
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:border-cyan-400"
            >
              {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
            </button>

            {isCurrentUserAsker && question.status !== 'solved' && (
              <button
                type="button"
                onClick={onMarkSolved}
                className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300 transition hover:border-green-400"
              >
                Mark Solved
              </button>
            )}

            {question.status === 'solved' && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                Solved by {question.solvedBy?.slice(0, 8)}...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
