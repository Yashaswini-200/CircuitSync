/**
 * Reusable ProgressBar component
 */

import { motion } from 'framer-motion';

type AccentColor = 'cyan' | 'green' | 'purple' | 'orange';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  accent?: AccentColor;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const accentClasses = {
  cyan: 'from-cyan-500 to-blue-500',
  green: 'from-emerald-500 to-green-500',
  purple: 'from-purple-500 to-pink-500',
  orange: 'from-orange-500 to-red-500',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export const ProgressBar = ({
  value,
  max = 100,
  label,
  showValue = false,
  accent = 'cyan',
  animated = true,
  size = 'md',
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-xs font-medium text-gray-400">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-cyan-300">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full ${sizeClasses[size]} bg-black/50 rounded-full overflow-hidden border border-white/10`}
      >
        <motion.div
          initial={animated ? { width: '0%' } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 1, ease: [0.25, 0.1, 0.25, 1] } : { duration: 0 }}
          className={`h-full bg-gradient-to-r ${accentClasses[accent]} rounded-full shadow-lg`}
        />
      </div>
    </div>
  );
};
