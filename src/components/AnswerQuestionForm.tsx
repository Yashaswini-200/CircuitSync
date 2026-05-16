import { useState, type FormEvent } from 'react';

interface AnswerQuestionFormProps {
  onSubmit: (answer: string) => void;
  isLoading?: boolean;
}

export const AnswerQuestionForm = ({ onSubmit, isLoading }: AnswerQuestionFormProps) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!answer.trim()) return;
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-white/10 bg-black/30 p-4">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Share your answer..."
        rows={3}
        className="w-full rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500/60"
      />

      <button
        type="submit"
        disabled={isLoading || !answer.trim()}
        className="w-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 disabled:opacity-50"
      >
        {isLoading ? 'Posting...' : 'Answer Question'}
      </button>
    </form>
  );
};
