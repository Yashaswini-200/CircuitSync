import { useMemo, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';
import { useApp, useCurrentUser, useRevisionHistory, useStreak, useXP } from '../hooks';
import { REVISION_SUBJECTS, REVISION_DIFFICULTIES, REVISION_TOPICS_BY_SUBJECT, REVISION_QUESTION_BANK } from '../data/revisionBank';
import type { RevisionDifficulty, RevisionQuestion, RevisionQuestionType, RevisionSubject } from '../types/index';

const normalizeAnswer = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');

const evaluateAnswer = (
  question: RevisionQuestion,
  response: string,
  selectedChoice?: string,
) => {
  const normalizedResponse = normalizeAnswer(selectedChoice ?? response);
  const normalizedAnswer = normalizeAnswer(question.answer);

  const correct =
    question.type === 'mcq'
      ? normalizedResponse === normalizeAnswer(question.answer)
      : normalizedResponse.includes(normalizedAnswer) || normalizedAnswer.includes(normalizedResponse);

  const xpEarned = correct ? question.xpReward : Math.max(5, Math.round(question.xpReward * 0.35));

  return {
    correct,
    xpEarned,
    feedback: correct
      ? 'Great answer. Keep reinforcing the concept.'
      : `Review the full explanation below and return stronger next round.`,
  };
};

const getQuestionTypeLabel = (type: RevisionQuestionType) => {
  switch (type) {
    case 'viva':
      return 'Viva-style';
    case 'debugging':
      return 'Debugging';
    case 'rapid-fire':
      return 'Rapid-fire';
    case 'mcq':
      return 'MCQ';
    default:
      return 'Concept';
  }
};

export const RevisionLab = () => {
  const { addRevisionSession } = useApp();
  const { currentUser } = useCurrentUser();
  const { totalSessions, averageAccuracy, recentWeakTopics, subjectBreakdown } = useRevisionHistory();
  const { streak, bonusMultiplier } = useStreak();
  const { xpData } = useXP();

  const [subject, setSubject] = useState<RevisionSubject>('Embedded Systems');
  const topicOptions = REVISION_TOPICS_BY_SUBJECT[subject];
  const [topic, setTopic] = useState<string>(topicOptions[0]);
  const [difficulty, setDifficulty] = useState<RevisionDifficulty>('Medium');
  const [sessionQuestions, setSessionQuestions] = useState<RevisionQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [response, setResponse] = useState('');
  const [answers, setAnswers] = useState<{
    question: RevisionQuestion;
    response: string;
    selectedChoice?: string;
    correct: boolean;
    xpEarned: number;
  }[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState('');

  const availableQuestions = useMemo(() => {
    const filtered = REVISION_QUESTION_BANK.filter((item) => {
      if (item.subject !== subject) return false;
      if (topic !== 'All Topics' && item.topic !== topic) return false;
      if (item.difficulty !== difficulty) return false;
      return true;
    });
    return filtered.length ? filtered : REVISION_QUESTION_BANK.filter((item) => item.subject === subject && item.difficulty === difficulty);
  }, [subject, topic, difficulty]);

  const currentQuestion = sessionQuestions[currentIndex];
  const totalCount = sessionQuestions.length;
  const sessionAccuracy = totalCount > 0 ? Math.round((answers.filter((item) => item.correct).length / totalCount) * 100) : 0;
  const sessionXP = answers.reduce((sum, item) => sum + item.xpEarned, 0);
  const expectedBonusXP = Math.round(sessionXP * bonusMultiplier);

  const startSession = () => {
    const questions = [...availableQuestions].sort(() => Math.random() - 0.5).slice(0, 6);
    setSessionQuestions(questions);
    setCurrentIndex(0);
    setSelectedChoice('');
    setResponse('');
    setAnswers([]);
    setFinished(false);
    setFeedback('');
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const result = evaluateAnswer(currentQuestion, response, selectedChoice);
    const nextAnswers = [
      ...answers,
      {
        question: currentQuestion,
        response: response.trim() || selectedChoice,
        selectedChoice: currentQuestion.type === 'mcq' ? selectedChoice : undefined,
        correct: result.correct,
        xpEarned: result.xpEarned,
      },
    ];

    setAnswers(nextAnswers);
    setFeedback(result.feedback);

    if (currentIndex + 1 >= sessionQuestions.length) {
      setFinished(true);
      if (currentUser) {
        const sessionId = crypto.randomUUID();
        const weakAreas = Array.from(
          new Set(
            nextAnswers
              .filter((item) => !item.correct)
              .map((item) => item.question.topic),
          ),
        );
        const strongAreas = Array.from(
          new Set(
            nextAnswers
              .filter((item) => item.correct)
              .map((item) => item.question.topic),
          ),
        );
        addRevisionSession({
          id: sessionId,
          userId: currentUser.id,
          subject,
          topic,
          difficulty,
          questionCount: nextAnswers.length,
          correctCount: nextAnswers.filter((item) => item.correct).length,
          accuracy: Math.round((nextAnswers.filter((item) => item.correct).length / nextAnswers.length) * 100),
          xpEarned: nextAnswers.reduce((sum, item) => sum + item.xpEarned, 0),
          weakTopics: weakAreas,
          strongTopics: strongAreas,
          questionTypes: Array.from(new Set(nextAnswers.map((item) => item.question.type))),
          startedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        });
      }
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setSelectedChoice('');
    setResponse('');
  };

  const currentSummary = useMemo(() => {
    if (!finished) return null;
    const weakAreas = Array.from(new Set(answers.filter((item) => !item.correct).map((item) => item.question.topic)));
    const strongAreas = Array.from(new Set(answers.filter((item) => item.correct).map((item) => item.question.topic)));
    return {
      correctCount: answers.filter((item) => item.correct).length,
      weakAreas,
      strongAreas,
      questionTypes: Array.from(new Set(answers.map((item) => item.question.type))),
    };
  }, [answers, finished]);

  const topicSelect = topicOptions.includes(topic) ? topic : topicOptions[0];

  return (
    <MainLayout>
      <PageShell
        title="Revision Lab"
        description="Launch focused engineering review sessions to build recall and interview readiness"
        accent="cyan"
      >
        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-6">
            <Card icon="🔬" title="Revision Lab" accent="cyan">
              <div className="space-y-4 text-sm text-gray-300">
                <p>
                  Select a subject, pick a topic, choose difficulty, and start a revision session built for engineering recall.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="block text-gray-300 text-xs uppercase tracking-[0.24em]">Subject</label>
                  <label className="block text-gray-300 text-xs uppercase tracking-[0.24em]">Topic</label>
                  <label className="block text-gray-300 text-xs uppercase tracking-[0.24em]">Difficulty</label>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <select
                    value={subject}
                    onChange={(event) => {
                      const nextSubject = event.target.value as RevisionSubject;
                      setSubject(nextSubject);
                      setTopic(REVISION_TOPICS_BY_SUBJECT[nextSubject][0]);
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/60"
                  >
                    {REVISION_SUBJECTS.map((subjectOption) => (
                      <option key={subjectOption} value={subjectOption}>
                        {subjectOption}
                      </option>
                    ))}
                  </select>
                  <select
                    value={topicSelect}
                    onChange={(event) => setTopic(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/60"
                  >
                    {topicOptions.map((topicOption) => (
                      <option key={topicOption} value={topicOption}>
                        {topicOption}
                      </option>
                    ))}
                  </select>
                  <select
                    value={difficulty}
                    onChange={(event) => setDifficulty(event.target.value as RevisionDifficulty)}
                    className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/60"
                  >
                    {REVISION_DIFFICULTIES.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-gray-400">
                    {availableQuestions.length} engineering questions ready for this setup.
                  </div>
                  <button
                    type="button"
                    onClick={startSession}
                    className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
                  >
                    Start session
                  </button>
                </div>
              </div>
            </Card>

            {sessionQuestions.length > 0 && !finished && currentQuestion ? (
              <Card icon="🧠" title={`Question ${currentIndex + 1} / ${totalCount}`} accent="green">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-gray-400 mb-4">
                  <span>{subject}</span>
                  <span>{topicSelect}</span>
                  <span>{difficulty}</span>
                  <span>{getQuestionTypeLabel(currentQuestion.type)}</span>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-200">{currentQuestion.prompt}</p>
                  {currentQuestion.type === 'mcq' ? (
                    <div className="grid gap-3">
                      {currentQuestion.choices?.map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => setSelectedChoice(choice)}
                          className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                            selectedChoice === choice
                              ? 'border-cyan-400 bg-cyan-500/10 text-white'
                              : 'border-white/10 bg-black/60 text-gray-300 hover:border-cyan-500/20'
                          }`}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      rows={4}
                      value={response}
                      onChange={(event) => setResponse(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/60"
                      placeholder="Type your answer here and submit to check your recall"
                    />
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-gray-400">Current streak bonus: {bonusMultiplier.toFixed(2)}x XP</span>
                  <button
                    type="button"
                    disabled={currentQuestion.type === 'mcq' ? !selectedChoice : !response.trim()}
                    onClick={handleSubmit}
                    className="rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-green-400"
                  >
                    Submit answer
                  </button>
                </div>
                {feedback && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-gray-200">
                    <div className={`font-semibold ${finished ? 'text-emerald-300' : 'text-cyan-300'}`}>{feedback}</div>
                    {!finished && (
                      <p className="mt-2 text-gray-400">Answer explanation: {currentQuestion.explanation}</p>
                    )}
                  </div>
                )}
              </Card>
            ) : null}

            {finished && currentSummary ? (
              <Card icon="📈" title="Session Summary" accent="purple">
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Accuracy</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{sessionAccuracy}%</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Correct answers</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{currentSummary.correctCount}/{totalCount}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-gray-500">XP earned</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{sessionXP}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                      <div className="text-xs uppercase tracking-[0.24em] text-gray-500">Strong areas</div>
                      <div className="mt-3 text-sm text-gray-200">
                        {currentSummary.strongAreas.length > 0 ? currentSummary.strongAreas.join(', ') : 'Keep practicing to identify strengths.'}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                      <div className="text-xs uppercase tracking-[0.24em] text-gray-500">Weak topics</div>
                      <div className="mt-3 text-sm text-gray-200">
                        {currentSummary.weakAreas.length > 0 ? currentSummary.weakAreas.join(', ') : 'No weak topics detected — great focus.'}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-gray-300">
                    <p className="text-sm font-semibold text-white">What next?</p>
                    <p className="mt-2 text-gray-400">
                      Keep building your recall by repeating this subject or switching to a topic where you saw weaker performance.
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.24em] text-gray-500">
                      Expected streak-adjusted XP: {expectedBonusXP}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={startSession}
                    className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
                  >
                    Launch another revision session
                  </button>
                </div>
              </Card>
            ) : null}
          </div>

          <div className="space-y-6">
            <Card icon="⚡" title="Lab Metrics" accent="orange">
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex justify-between"><span>Total sessions</span><span>{totalSessions}</span></div>
                <div className="flex justify-between"><span>Session accuracy</span><span>{averageAccuracy}%</span></div>
                <div className="flex justify-between"><span>Recent weak topics</span><span>{recentWeakTopics.length ? recentWeakTopics.join(', ') : 'None yet'}</span></div>
                <div className="flex justify-between"><span>Current XP</span><span>{xpData.totalXP}</span></div>
                <div className="flex justify-between"><span>Current streak</span><span>{streak.currentStreak} days</span></div>
              </div>
            </Card>

            <Card icon="🧭" title="Study focus" accent="purple">
              <div className="space-y-3 text-sm text-gray-300">
                {Object.entries(subjectBreakdown).length === 0 ? (
                  <p>No sessions yet. Start a revision lab to build topic momentum.</p>
                ) : (
                  Object.entries(subjectBreakdown).map(([subjectName, count]) => (
                    <div key={subjectName} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                      <span>{subjectName}</span>
                      <span className="font-semibold text-cyan-300">{count}</span>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card icon="📌" title="Review rhythm" accent="green">
              <div className="space-y-3 text-sm text-gray-300">
                <p>Reward XP and keep streaks moving by making revision sessions a daily habit.</p>
                <p>Streak bonus multiplier: {bonusMultiplier.toFixed(2)}x</p>
                <p>Recommended next session: {topicSelect} in {subject}</p>
              </div>
            </Card>
          </div>
        </div>
      </PageShell>
    </MainLayout>
  );
};

export default RevisionLab;
