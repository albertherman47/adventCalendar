import React, { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

interface SnowEffectProps {
  enabled?: boolean;
}

export const SnowEffect: React.FC<SnowEffectProps> = ({ enabled = true }) => {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    if (!enabled) {
      setFlakes([]);
      return;
    }

    // Generate 32 delicate, small snowflakes for subtle holiday atmosphere
    const initialFlakes: Snowflake[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 2, // 2px to 5px
      speed: Math.random() * 8 + 10, // 10s to 18s fall
      opacity: Math.random() * 0.4 + 0.15, // soft opacity
      delay: Math.random() * 8,
    }));

    setFlakes(initialFlakes);
  }, [enabled]);

  if (!enabled || flakes.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden no-print"
    >
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white shadow-xs"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.speed}s linear infinite`,
            animationDelay: `-${flake.delay}s`,
            top: '-10px',
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0px);
          }
          50% {
            transform: translateY(50vh) translateX(12px);
          }
          100% {
            transform: translateY(105vh) translateX(-8px);
          }
        }
      `}</style>
    </div>
  );
};
