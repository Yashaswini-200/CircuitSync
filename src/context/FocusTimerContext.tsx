import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type Mode = 'pomodoro' | 'deep' | 'custom';

interface FocusTimerState {
  isActive: boolean;
  isBreak: boolean;
  isPaused: boolean;
  mode: Mode;
  remainingSeconds: number;
  breakSeconds: number;
  minimized: boolean;
  position: { x: number; y: number };
}

interface FocusTimerContextType extends FocusTimerState {
  start: () => void;
  pause: () => void;
  reset: () => void;
  stop: () => void;
  toggleMinimize: () => void;
  setMode: (m: Mode) => void;
  setPosition: (p: { x: number; y: number }) => void;
}

const KEY = 'circuitsync.focusTimer.v1';

const defaults = {
  isActive: false,
  isBreak: false,
  isPaused: false,
  mode: 'pomodoro' as Mode,
  remainingSeconds: 25 * 60,
  breakSeconds: 5 * 60,
  minimized: false,
  position: { x: 24, y: 120 },
};

const FocusTimerContext = createContext<FocusTimerContextType | undefined>(undefined);

const presets: Record<Mode, { minutes: number; breakMinutes: number }> = {
  pomodoro: { minutes: 25, breakMinutes: 5 },
  deep: { minutes: 50, breakMinutes: 10 },
  custom: { minutes: 35, breakMinutes: 7 },
};

export const FocusTimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(defaults.isActive);
  const [isBreak, setIsBreak] = useState<boolean>(defaults.isBreak);
  const [isPaused, setIsPaused] = useState<boolean>(defaults.isPaused);
  const [mode, setModeState] = useState<Mode>(defaults.mode);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(defaults.remainingSeconds);
  const [breakSeconds, setBreakSeconds] = useState<number>(defaults.breakSeconds);
  const [minimized, setMinimized] = useState<boolean>(defaults.minimized);
  const [position, setPositionState] = useState<{ x: number; y: number }>(defaults.position);

  const tickRef = useRef<number | null>(null);

  // Load saved
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<FocusTimerState>;
      if (parsed) {
        setIsActive(!!parsed.isActive);
        setIsBreak(!!parsed.isBreak);
        setIsPaused(!!parsed.isPaused);
        setModeState((parsed.mode as Mode) ?? defaults.mode);
        setRemainingSeconds(parsed.remainingSeconds ?? presets[defaults.mode].minutes * 60);
        setBreakSeconds(parsed.breakSeconds ?? presets[defaults.mode].breakMinutes * 60);
        setMinimized(!!parsed.minimized);
        setPositionState(parsed.position ?? defaults.position);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    const payload: FocusTimerState = {
      isActive,
      isBreak,
      isPaused,
      mode,
      remainingSeconds,
      breakSeconds,
      minimized,
      position,
    };
    localStorage.setItem(KEY, JSON.stringify(payload));
  }, [isActive, isBreak, isPaused, mode, remainingSeconds, breakSeconds, minimized, position]);

  useEffect(() => {
    // update durations when mode changes
    setRemainingSeconds(presets[mode].minutes * 60);
    setBreakSeconds(presets[mode].breakMinutes * 60);
  }, [mode]);

  useEffect(() => {
    if (!isActive || isPaused) return;
    tickRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(tickRef.current ?? undefined);
          setIsBreak(true);
          setIsActive(false);
          setBreakSeconds(presets[mode].breakMinutes * 60);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(tickRef.current ?? undefined);
  }, [isActive, isPaused, mode]);

  useEffect(() => {
    if (!isBreak || isPaused) return;
    tickRef.current = window.setInterval(() => {
      setBreakSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(tickRef.current ?? undefined);
          setIsBreak(false);
          setIsPaused(false);
          setIsActive(false);
          setRemainingSeconds(presets[mode].minutes * 60);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(tickRef.current ?? undefined);
  }, [isBreak, isPaused, mode]);

  const start = () => {
    setIsActive(true);
    setIsPaused(false);
    setMinimized(false);
  };

  const pause = () => {
    setIsPaused(true);
  };

  const reset = () => {
    setIsActive(false);
    setIsPaused(false);
    setIsBreak(false);
    setRemainingSeconds(presets[mode].minutes * 60);
    setBreakSeconds(presets[mode].breakMinutes * 60);
  };

  const stop = () => reset();

  const toggleMinimize = () => setMinimized((s) => !s);

  const setMode = (m: Mode) => setModeState(m);

  const setPosition = (p: { x: number; y: number }) => setPositionState(p);

  const value: FocusTimerContextType = {
    isActive,
    isBreak,
    isPaused,
    mode,
    remainingSeconds,
    breakSeconds,
    minimized,
    position,
    start,
    pause,
    reset,
    stop,
    toggleMinimize,
    setMode,
    setPosition,
  };

  return <FocusTimerContext.Provider value={value}>{children}</FocusTimerContext.Provider>;
};

export const useFocusTimer = (): FocusTimerContextType => {
  const ctx = useContext(FocusTimerContext);
  if (!ctx) throw new Error('useFocusTimer must be used within FocusTimerProvider');
  return ctx;
};

export default FocusTimerContext;
