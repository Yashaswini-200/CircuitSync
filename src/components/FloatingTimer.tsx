import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useFocusTimer } from '../context/FocusTimerContext';
import { Button } from './Button';

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

export const FloatingTimer = () => {
  const {
    isActive,
    isBreak,
    isPaused,
    remainingSeconds,
    breakSeconds,
    minimized,
    position,
    start,
    pause,
    reset,
    stop,
    toggleMinimize,
    setPosition,
  } = useFocusTimer();

  useEffect(() => {
    // ensure widget stays in bounds on resize
    const handle = () => {
      setPosition({
        x: Math.max(12, Math.min(window.innerWidth - 280, position.x)),
        y: Math.max(96, Math.min(window.innerHeight - 140, position.y)),
      });
    };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [position.x, position.y, setPosition]);

  const statusText = isBreak ? 'Break' : isActive ? 'Focus' : 'Idle';

  return (
    <AnimatePresence>
      {(isActive || isBreak) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            drag
            dragMomentum={false}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              setPosition({ x: Math.max(12, Math.min(window.innerWidth - 280, info.point.x)), y: Math.max(96, Math.min(window.innerHeight - 140, info.point.y)) });
            }}
            style={{ left: position.x, top: position.y }}
            className={`fixed z-50 w-[320px] rounded-[1.5rem] border border-cyan-500/30 bg-black/80 p-4 shadow-neon-cyan backdrop-blur-2xl transition-all duration-300 ${
              minimized ? 'h-16 overflow-hidden' : 'h-auto'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">{statusText}</p>
                <p className="text-lg font-semibold text-white">{isBreak ? formatTime(breakSeconds) : formatTime(remainingSeconds)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => (isPaused ? start() : pause())}
                  className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-gray-300 hover:bg-white/10"
                >
                  {isPaused ? 'Play' : 'Pause'}
                </button>
                <button onClick={() => stop()} className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-gray-300 hover:bg-white/10">
                  Stop
                </button>
                <button onClick={() => toggleMinimize()} className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-gray-300 hover:bg-white/10">
                  {minimized ? 'Expand' : 'Min'}
                </button>
              </div>
            </div>

            {!minimized && (
              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-2 rounded-full ${isBreak ? 'bg-green-400' : 'bg-cyan-400'}`}
                    style={{ width: `${((isBreak ? breakSeconds : remainingSeconds) / (isBreak ? Math.max(1, breakSeconds) : Math.max(1, remainingSeconds))) * 100}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button onClick={() => (isPaused ? start() : pause())} variant="secondary">
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                  <Button variant="outline" onClick={() => reset()}>
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingTimer;
