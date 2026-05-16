/**
 * Interactive pixel avatar world scene
 */

import { motion } from 'framer-motion';

type WorldAvatar = {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  accent: 'cyan' | 'purple' | 'green' | 'orange';
  bubble: string;
  action: 'idle' | 'wave' | 'dance' | 'sit';
  colorClass: string;
};

interface AvatarWorldProps {
  userX: number;
  userY: number;
  userAction: 'idle' | 'wave' | 'dance' | 'sit';
  userBubble: string;
  nearbyPlayers: WorldAvatar[];
}

const pixelPattern = [
  ['e', 'h', 'h', 'h', 'e'],
  ['h', 's', 'p', 's', 'h'],
  ['h', 'c', 'p', 'c', 'h'],
  ['e', 'c', 'c', 'c', 'e'],
  ['e', 'l', 'l', 'l', 'e'],
];

const AvatarSprite = ({ action, accent }: { action: string; accent: string }) => {
  const accentClass = accent === 'cyan' ? 'pixel-shirt' : accent === 'purple' ? 'pixel-shirt-alt' : accent === 'green' ? 'pixel-shirt' : 'pixel-shirt';

  const pixelClass = (type: string) => {
    switch (type) {
      case 'h':
        return 'pixel-hair';
      case 'p':
        return 'pixel-skin';
      case 's':
        return accentClass;
      case 'l':
        return 'pixel-legs';
      default:
        return 'pixel-empty';
    }
  };

  return (
    <div className={`pixel-avatar ${action !== 'idle' ? `avatar-${action}` : ''}`}>
      {pixelPattern.flatMap((row, rowIndex) =>
        row.map((type, cellIndex) => (
          <div key={`${rowIndex}-${cellIndex}`} className={`pixel-block ${pixelClass(type)}`} />
        ))
      )}
    </div>
  );
};


const SpeechBubble = ({ text }: { text: string }) => (
  <div className="speech-bubble absolute -top-12 left-1/2 w-40 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/85 px-3 py-2 text-xs text-gray-200 shadow-lg shadow-cyan-500/20">
    {text}
    <div className="absolute left-1/2 top-full -translate-x-1/2 h-3 w-3 rotate-45 bg-black/85 border border-white/10" />
  </div>
);

export const AvatarWorld = ({ userX, userY, userAction, userBubble, nearbyPlayers }: AvatarWorldProps) => {
  const userAvatar = {
    id: 'you',
    name: 'You',
    role: 'Circuit Sync Member',
    x: userX,
    y: userY,
    accent: 'cyan' as const,
    bubble: userBubble,
    action: userAction,
    colorClass: 'from-cyan-400 to-blue-500',
  };

  const avatars = [...nearbyPlayers, userAvatar];

  return (
    <div className="world-scene relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07101d] p-4 shadow-neon-cyan/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_26%),radial-gradient(circle_at_80%_20%,_rgba(56,189,248,0.08),_transparent_20%)]" />
      <div className="grid h-full grid-cols-5 gap-3 rounded-[2rem] border border-white/5 p-3">
        {Array.from({ length: 25 }).map((_, index) => (
          <div key={index} className="scene-tile rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm" />
        ))}
      </div>

      {avatars.map((avatar) => (
        <motion.div
          key={avatar.id}
          initial={false}
          animate={{
            x: avatar.x * 20,
            y: avatar.y * 20,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="absolute top-0 left-0 z-10 w-24 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex flex-col items-center gap-2">
            <AvatarSprite action={avatar.action} accent={avatar.accent} />
            <div className="w-28 text-center text-[11px] uppercase tracking-[0.28em] text-gray-400">
              {avatar.name}
            </div>
            <div className="text-[10px] text-gray-500">{avatar.role}</div>
            {avatar.bubble ? <SpeechBubble text={avatar.bubble} /> : null}
          </div>
        </motion.div>
      ))}

      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-3xl bg-black/70 px-4 py-3 text-xs text-gray-300 shadow-neon-cyan/10">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
        Live lounge mode
      </div>
    </div>
  );
};
