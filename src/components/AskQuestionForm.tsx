import { useState, type FormEvent } from 'react';
import type { BattleTopic } from '../types/index';

interface AskQuestionFormProps {
  onSubmit: (question: string, description: string, topic: BattleTopic, xpReward: number) => void;
  isLoading?: boolean;
  initialTopic?: BattleTopic;
}

const BATTLE_TOPICS: { label: string; value: BattleTopic }[] = [
  { label: 'Embedded Fundamentals', value: 'embedded-fundamentals' },
  { label: 'VLSI Basics', value: 'vlsi-basics' },
  { label: 'Digital Logic', value: 'digital-logic' },
  { label: 'Interview Prep', value: 'interview-prep' },
  { label: 'Debugging', value: 'debugging' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Problem Solving', value: 'problem-solving' },
];

export const AskQuestionForm = ({ onSubmit, isLoading, initialTopic }: AskQuestionFormProps) => {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState<BattleTopic>(initialTopic ?? 'embedded-fundamentals');
  const [xpReward, setXpReward] = useState(50);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) return;
    onSubmit(question, description, topic, xpReward);
    setQuestion('');
    setDescription('');
    setXpReward(50);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
      <h3 className="font-semibold text-white">Ask a Question</h3>

      <div>
        <label className="block text-sm text-gray-300">Question*</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., How do I handle edge cases in interrupt handlers?"
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-4 py-2 text-sm text-white outline-none transition focus:border-cyan-500/60"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300">Details (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add context or specifics..."
          rows={3}
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-4 py-2 text-sm text-white outline-none transition focus:border-cyan-500/60"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-gray-300">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value as BattleTopic)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-4 py-2 text-sm text-white outline-none focus:border-cyan-500/60"
          >
            {BATTLE_TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300">XP Reward</label>
          <input
            type="number"
            value={xpReward}
            onChange={(e) => setXpReward(Number(e.target.value))}
            min={10}
            max={500}
            step={10}
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-4 py-2 text-sm text-white outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {isLoading ? 'Posting...' : 'Post Question'}
      </button>
    </form>
  );
};
