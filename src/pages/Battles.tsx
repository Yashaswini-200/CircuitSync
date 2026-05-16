/**
 * Battles page - Question-based competitive engineering challenges
 */

import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Card } from '../components/Card';
import { BattleCard } from '../components/BattleCard';
import { QuestionCard } from '../components/QuestionCard';
import { AskQuestionForm } from '../components/AskQuestionForm';
import { AnswerQuestionForm } from '../components/AnswerQuestionForm';
import { useApp, useBattles, useXP, useCurrentUser } from '../hooks';
import type { Battle, BattleQuestion, BattleAnswer, BattleTopic } from '../types/index';

const Battles = () => {
  const { state, addBattle, addQuestionToBattle, addAnswerToQuestion, markQuestionSolved, addParticipantToBattle } = useApp();
  const { activeBattles, myBattles, totalQuestionsAsked, totalQuestionsSolved, leaderboard } = useBattles();
  const { xpData } = useXP();
  const currentUserId = state.currentUserId || '';
  const { currentUser } = useCurrentUser();

  const [selectedBattle, setSelectedBattle] = useState<string | null>(null);
  const [viewingAnswers, setViewingAnswers] = useState<string | null>(null);

  const currentBattle = selectedBattle ? state.battles.find((b) => b.id === selectedBattle) : null;

  const handleCreateBattle = () => {
    if (!currentUserId) return;

    const defaultTopic: BattleTopic = currentUser?.specialization === 'vlsi' ? 'vlsi-basics' : 'embedded-fundamentals';

    const newBattle: Battle = {
      id: crypto.randomUUID(),
      title: `Battle #${Math.floor(Math.random() * 1000)}`,
      type: 'question-battle',
      topic: defaultTopic,
      status: 'open',
      participants: [currentUserId],
      questions: [],
      xpStake: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addBattle(newBattle);
    setSelectedBattle(newBattle.id);
  };

  const handleAskQuestion = (question: string, description: string, topic: BattleTopic, xpReward: number) => {
    if (!currentBattle || !currentUserId) return;

    const newQuestion: BattleQuestion = {
      id: crypto.randomUUID(),
      userId: currentUserId,
      question,
      description,
      topic,
      status: 'unanswered',
      xpReward,
      answers: [],
      createdAt: new Date().toISOString(),
    };

    addQuestionToBattle(currentBattle.id, newQuestion);
  };

  const handleAnswerQuestion = (questionId: string, answer: string) => {
    if (!currentBattle || !currentUserId) return;

    const newAnswer: BattleAnswer = {
      id: crypto.randomUUID(),
      userId: currentUserId,
      answer,
      isCorrect: false,
      votes: 0,
      createdAt: new Date().toISOString(),
    };

    addAnswerToQuestion(currentBattle.id, questionId, newAnswer);
  };

  const handleMarkSolved = (questionId: string) => {
    if (!currentBattle) return;
    markQuestionSolved(currentBattle.id, questionId, currentUserId);
  };

  const getUserName = (userId: string) => {
    return state.users.find((u) => u.id === userId)?.name || 'Unknown';
  };

  return (
    <MainLayout>
      <PageShell title="Battles" description="Challenge your engineering peers with real questions" accent="purple">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {!selectedBattle ? (
              <div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card
                    icon="⚔️"
                    title="Active Battles"
                    value={activeBattles.length}
                    subtitle="Open for participation"
                    accent="purple"
                  />
                  <Card
                    icon="🎯"
                    title="Your Battles"
                    value={myBattles.length}
                    subtitle="Battles you're in"
                    accent="cyan"
                  />
                </div>

                <Card
                  icon="🆕"
                  title="Start a New Battle"
                  subtitle="Create a question arena"
                  accent="green"
                  interactive
                  onClick={handleCreateBattle}
                >
                  <p className="mt-3 text-sm text-gray-400">
                    Create a new battle arena where you and other engineers can ask and answer challenging questions.
                  </p>
                </Card>

                <div className="space-y-3">
                  <h3 className="font-semibold text-white">Active Battles</h3>
                  {activeBattles.length > 0 ? (
                    activeBattles.map((battle) => (
                      <div key={battle.id} onClick={() => setSelectedBattle(battle.id)}>
                        <BattleCard battle={battle} />
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-6 text-sm text-gray-400">
                      No active battles yet. Start one to get the competition going!
                    </div>
                  )}
                </div>
              </div>

            ) : currentBattle ? (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{currentBattle.title}</h3>
                    <p className="text-sm text-gray-400">
                      {currentBattle.topic.replace(/-/g, ' ')} • {currentBattle.status}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBattle(null)}
                    className="rounded-lg border border-white/20 px-4 py-2 text-sm text-gray-300 hover:border-white/40"
                  >
                    Back
                  </button>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <label className="text-xs text-gray-400">Invite participant</label>
                    <select
                      onChange={(e) => addParticipantToBattle(currentBattle.id, e.target.value)}
                      defaultValue=""
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white"
                    >
                      <option value="" disabled>
                        Select a user to invite
                      </option>
                      {state.users
                        .filter((u) => !currentBattle.participants.includes(u.id))
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} — {u.specialization}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-56">
                    <div className="text-xs text-gray-400">Participants</div>
                    <div className="mt-2 space-y-2">
                      {currentBattle.participants.map((pid) => (
                        <div key={pid} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2 text-sm">
                          <span>{state.users.find((u) => u.id === pid)?.name || 'Unknown'}</span>
                          <span className="text-cyan-300">{currentBattle.scores?.[pid] ?? 0} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {currentBattle.history && currentBattle.history.length > 0 && (
                  <Card icon="🕘" title="Battle History" subtitle="Recent events" accent="cyan">
                    <div className="space-y-2 text-sm text-gray-300">
                      {currentBattle.history.slice().reverse().map((h) => (
                        <div key={h.id} className="rounded-lg border border-white/10 bg-black/30 p-2">
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <div>{new Date(h.createdAt).toLocaleString()}</div>
                            <div>{h.userId ? state.users.find((u) => u.id === h.userId)?.name : ''}</div>
                          </div>
                          <div className="pt-1 text-sm">{h.event} {h.payload?.questionId ? `• Q:${h.payload.questionId}` : ''}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                <AskQuestionForm onSubmit={handleAskQuestion} initialTopic={currentBattle.topic} />

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">
                    Questions ({currentBattle.questions.length})
                  </h4>
                  {currentBattle.questions.length > 0 ? (
                    currentBattle.questions.map((q) => (
                      <div key={q.id} className="space-y-2">
                        <QuestionCard
                          question={q}
                          authorName={getUserName(q.userId)}
                          isCurrentUserAsker={q.userId === currentUserId}
                          onMarkSolved={() => handleMarkSolved(q.id)}
                          onShowAnswers={() => setViewingAnswers(viewingAnswers === q.id ? null : q.id)}
                        />

                        {viewingAnswers === q.id && (
                          <div className="ml-2 space-y-3 rounded-lg border-l-2 border-cyan-500/30 bg-black/20 pl-4 py-3">
                            {q.answers.length > 0 ? (
                              q.answers.map((answer) => (
                                <div key={answer.id} className="rounded-lg border border-white/10 bg-black/40 p-3">
                                  <div className="mb-2 flex items-center justify-between text-xs">
                                    <span className="font-semibold text-cyan-300">
                                      {getUserName(answer.userId)}
                                    </span>
                                    <span className="text-gray-500">👍 {answer.votes}</span>
                                  </div>
                                  <p className="text-sm text-gray-300">{answer.answer}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-400">No answers yet. Be the first!</p>
                            )}

                            {q.status !== 'solved' && (
                              <AnswerQuestionForm
                                onSubmit={(answer) => handleAnswerQuestion(q.id, answer)}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-white/10 bg-black/25 p-4 text-sm text-gray-400">
                      No questions yet. Ask the first one!
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <Card
              icon="📊"
              title="Your Battle Stats"
              subtitle="Engineering combat record"
              accent="cyan"
            >
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Questions Asked</span>
                  <span className="font-semibold text-cyan-300">{totalQuestionsAsked}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Solved</span>
                  <span className="font-semibold text-green-300">{totalQuestionsSolved}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current XP</span>
                  <span className="font-semibold text-orange-300">{xpData.totalXP}</span>
                </div>
              </div>
            </Card>

            <Card icon="⚙️" title="Battle Topics" subtitle="Engineering disciplines" accent="purple">
              <div className="mt-3 space-y-2 text-xs text-gray-400">
                <div>🔧 Embedded Systems</div>
                <div>🔌 VLSI Design</div>
                <div>🔀 Digital Logic</div>
                <div>💼 Interview Prep</div>
                <div>🐛 Debugging</div>
                <div>📐 Architecture</div>
              </div>
            </Card>

            <Card icon="🏆" title="Leaderboard" subtitle="Top battle masters" accent="green">
              <div className="mt-3 space-y-2">
                {leaderboard.slice(0, 5).map((entry, idx) => {
                  const user = state.users.find((u) => u.id === entry.userId);
                  return (
                    <div key={entry.userId} className="flex items-center justify-between text-sm py-1">
                      <span className="text-gray-400">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : ''} {user?.name || entry.userId}</span>
                      <span className="font-semibold text-cyan-300">{entry.score} pts</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </PageShell>
    </MainLayout>
  );
};

export default Battles;
