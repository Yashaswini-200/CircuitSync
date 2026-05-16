/**
 * Reusable Button component with multiple variants
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses = {
  primary:
    'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-neon-cyan hover:shadow-lg',
  secondary:
    'bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20 hover:border-white/40',
  outline:
    'border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500',
  danger: 'bg-red-600/80 text-white hover:bg-red-600 hover:shadow-lg',
  success: 'bg-green-600/80 text-white hover:bg-green-600 hover:shadow-lg',
  ghost: 'text-gray-300 hover:text-cyan-300 hover:bg-white/5',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="flex items-center justify-center">{icon}</span>
      ) : null}

      <span>{children}</span>

      {iconRight && !loading && (
        <span className="flex items-center justify-center">{iconRight}</span>
      )}
    </motion.button>
  );
};
