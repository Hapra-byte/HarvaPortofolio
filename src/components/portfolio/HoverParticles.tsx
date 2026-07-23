import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface ParticleProps {
  x: number;
  y: number;
  life: number;
}

export function HoverParticles({ x, y, life }: ParticleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: life,
        scale: 1,
        x: x - 24,
        y: y - 24,
      }}
      exit={{ opacity: 0, scale: 0 }}
      className="fixed pointer-events-none z-[100]"
    >
      <Sparkles
        size={24}
        className="text-indigo-400 drop-shadow-lg"
        style={{
          opacity: life,
          filter: `blur(${(1 - life) * 2}px)`,
        }}
      />
    </motion.div>
  );
}
