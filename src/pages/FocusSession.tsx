import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '../layouts/MainLayout';
import { PageShell } from '../components/PageShell';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useFocusTimer } from '../context/FocusTimerContext';

const SESSION_PRESETS = {
  pomodoro: { label: 'Pomodoro', minutes: 25, breakMinutes: 5 },
  deep: { label: 'Deep Work', minutes: 50, breakMinutes: 10 },
  custom: { label: 'Custom', minutes: 35, breakMinutes: 7 },
} as const;

const quotes = [
  'Focus is the new superpower.',
  'Deep work builds a better future in silence.',
  'Every session is a compound interest deposit on your skill.',
  'Small wins stack into monumental progress.',
];

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

const FocusSession = () => {
  const {
    isActive,
    isBreak,
    isPaused,
    remainingSeconds,
    breakSeconds,
    start,
    pause,
    reset,
    mode,
    setMode,
  } = useFocusTimer();

  const [completedSessions] = useState(0);
  const [dailyFocusMinutes] = useState(0);
  const [streakDays] = useState(7);
  const [ambientOn, setAmbientOn] = useState(false);

  const currentPreset = SESSION_PRESETS[mode];

  const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  const handleStart = () => start();
  const handlePause = () => pause();
  const handleReset = () => reset();

  const statusText = isBreak ? 'On Break' : isActive ? 'In Focus' : 'Ready';
  const statusAccent = isBreak ? 'bg-green-500/20 text-green-300' : isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 text-gray-300';

  return (
    <MainLayout>
      <PageShell title="Focus Session" description="Premium deep work cockpit" accent="cyan">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass border-cyan-500/20 shadow-neon-cyan/10 p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Session status</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Deep work mission</h2>
                </div>
                <span className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ${statusAccent}`}>
                  {statusText}
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {Object.entries(SESSION_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMode(key as 'pomodoro' | 'deep' | 'custom')}
                    className={`rounded-3xl border px-4 py-3 text-left transition-all duration-200 ${
                      mode === key
                        ? 'border-cyan-400/80 bg-cyan-500/10 shadow-neon-cyan'
                        : 'border-white/10 bg-white/5 hover:border-cyan-500/30 hover:bg-white/10'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-400">{preset.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{preset.minutes} min</p>
                    <p className="text-xs text-gray-500">Break {preset.breakMinutes} min</p>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/50 p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Focus timer</p>
                    <h3 className="mt-2 text-5xl font-semibold text-white tracking-tight">{formatTime(isBreak ? breakSeconds : remainingSeconds)}</h3>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-xs uppercase tracking-[0.35em] text-gray-500">Mode</span>
                    <span className="mt-2 rounded-full bg-white/5 px-3 py-1 text-sm text-cyan-300">{SESSION_PRESETS[mode].label}</span>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="glass p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Completed</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{completedSessions}</p>
                  </div>
                  <div className="glass p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Focus hours today</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{Math.floor(dailyFocusMinutes / 60)}h {dailyFocusMinutes % 60}m</p>
                  </div>
                  <div className="glass p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Streak</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{streakDays} days</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button onClick={handleStart} className="min-w-[140px]" icon={isActive && !isPaused ? '▶️' : '▶️'}>
                    {isActive && !isPaused ? 'Resume' : 'Start Session'}
                  </Button>
                  <Button variant="secondary" onClick={handlePause} className="min-w-[140px]" disabled={!isActive || isPaused}>
                    Pause
                  </Button>
                  <Button variant="outline" onClick={handleReset} className="min-w-[140px]">
                    Reset
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass border-purple-500/10 p-6 shadow-neon-purple/10"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Motivation</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Productivity pulse</h3>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-gray-400">Ambient</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-gray-300">{quote}</p>
              <div className="mt-6 flex items-center justify-between gap-3 rounded-3xl bg-white/5 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Ambient sound</p>
                  <p className="mt-2 text-sm text-gray-300">{ambientOn ? 'Enabled' : 'Disabled'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAmbientOn((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${ambientOn ? 'bg-cyan-500 text-black' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}
                >
                  {ambientOn ? 'Turn off' : 'Turn on'}
                </button>
              </div>
            </motion.div>
          </section>

          <aside className="space-y-6">
            <Card title="Break system" subtitle="Automatic recovery" accent="green">
              <div className="space-y-3 text-sm text-gray-300">
                <p>After each session, the system shifts into a calming break phase.</p>
                <p className="rounded-3xl bg-white/5 p-4">Short break — {currentPreset.breakMinutes} minutes</p>
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Status</p>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm text-cyan-300">
                  {isBreak ? 'Resting' : 'Ready for focus'}
                </div>
              </div>
            </Card>

            <Card title="Session stats" subtitle="Focus intelligence" accent="purple">
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center justify-between gap-3 rounded-3xl bg-white/5 px-4 py-3">
                  <span>Focus blocks</span>
                  <span>{completedSessions}</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-3xl bg-white/5 px-4 py-3">
                  <span>Deep hours</span>
                  <span>{Math.floor(dailyFocusMinutes / 60)}h</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-3xl bg-white/5 px-4 py-3">
                  <span>Flow streak</span>
                  <span>{streakDays} days</span>
                </div>
              </div>
            </Card>

            <Card title="Focus whisper" subtitle="Quick tips" accent="orange">
              <ul className="space-y-3 text-sm text-gray-300">
                <li>Keep your screen dim and notifications muted.</li>
                <li>Use the floating widget when switching tasks.</li>
                <li>Reset the timer between sessions for fresh momentum.</li>
              </ul>
            </Card>
          </aside>
        </div>

        {/* Floating timer is global and rendered at app root via `FloatingTimer` */}
      </PageShell>
    </MainLayout>
  );
};

export default FocusSession;