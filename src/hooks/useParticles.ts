import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface ParticleEmitterProps {
  x: number;
  y: number;
  count?: number;
  color?: string;
}

export function useParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);

  const emitParticles = (props: ParticleEmitterProps) => {
    const { x, y, count = 8, color = "rgba(99, 102, 241, 0.8)" } = props;

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = 2 + Math.random() * 3;

      return {
        id: particleId + i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
      };
    });

    setParticleId((prev) => prev + count);
    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // gravity
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [particles]);

  return { particles, emitParticles };
}
