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
          className="text-[#6366F1] text-xs font-mono
