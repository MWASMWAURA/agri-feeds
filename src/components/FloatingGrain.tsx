import { useState } from 'react';

const grainEmojis = ['🌾', '🌽', '🌻', '🥕', '🐓', '🐄', '🐷', '🌱'];

interface FloatingGrainProps {
  count?: number;
}

export const FloatingGrain = ({ count = 12 }: FloatingGrainProps) => {
  const [grains] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: grainEmojis[Math.floor(Math.random() * grainEmojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 30,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {grains.map((grain) => (
        <span
          key={grain.id}
          className="absolute float opacity-30"
          style={{
            left: `${grain.left}%`,
            top: `${10 + Math.random() * 80}%`,
            fontSize: `${grain.size}px`,
            animationDelay: `${grain.delay}s`,
            animationDuration: `${grain.duration}s`,
          }}
        >
          {grain.emoji}
        </span>
      ))}
    </div>
  );
};
