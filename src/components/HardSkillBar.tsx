import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface HardSkillBarProps {
  name: string;
  progress: number;
  index: number;
}

const ANIMATION_STAGGER = 0.05;
const ANIMATION_DURATION = 1.2;
const PROGRESS_DELAY_OFFSET = 0.3;

export function HardSkillBar({ name, progress, index }: HardSkillBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * ANIMATION_STAGGER }}
      className="group/skill"
    >
      <div className="flex justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover/skill:text-slate-100 transition-colors">
          {name}
        </span>
        <span
          className="text-[#6366F1] text-xs font-mono group-hover/skill:text-indigo-400 transition-colors"
          aria-label={`${clampedProgress} percent`}
        >
          {clampedProgress}%
        </span>
      </div>
      <div
        className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50"
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A78BFA] rounded-full shadow-lg shadow-indigo-500/50"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${clampedProgress}%` } : { width: 0 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: PROGRESS_DELAY_OFFSET + index * ANIMATION_STAGGER,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}
