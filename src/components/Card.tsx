/**
 * Reusable dashboard card with glassmorphism
 */

interface CardProps {
  title: string;
  subtitle?: string;
  value?: string | number;
  unit?: string;
  icon?: string;
  children?: React.ReactNode;
  accent?: 'cyan' | 'green' | 'purple' | 'orange';
  interactive?: boolean;
  onClick?: () => void;
}

export const Card = ({
  title,
  subtitle,
  value,
  unit,
  icon,
  children,
  accent = 'cyan',
  interactive = false,
  onClick,
}: CardProps) => {
  const accentClasses = {
    cyan: 'border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-cyan-500/10',
    green: 'border-green-500/30 hover:border-green-500/60 hover:shadow-green-500/10',
    purple: 'border-purple-500/30 hover:border-purple-500/60 hover:shadow-purple-500/10',
    orange: 'border-orange-500/30 hover:border-orange-500/60 hover:shadow-orange-500/10',
  };

  const accentGradient = {
    cyan: 'from-cyan-500 to-blue-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-black/30 backdrop-blur-xl border rounded-xl p-6
        transition-all duration-300 overflow-hidden
        ${accentClasses[accent]}
        ${interactive ? 'cursor-pointer hover:shadow-lg hover:shadow-current' : ''}
      `}
    >
      {/* Background gradient accent */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity
          bg-gradient-to-br ${accentGradient[accent]} pointer-events-none
        `}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {icon && <span className="text-2xl">{icon}</span>}
        </div>

        {/* Value */}
        {value !== undefined && (
          <div className="mb-4">
            <div className={`text-3xl font-bold bg-gradient-to-r ${accentGradient[accent]} bg-clip-text text-transparent`}>
              {value}
            </div>
            {unit && <p className="text-xs text-gray-500 mt-1">{unit}</p>}
          </div>
        )}

        {/* Children content */}
        {children}
      </div>
    </div>
  );
};
