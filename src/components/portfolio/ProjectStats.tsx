import { motion } from "motion/react";

interface ProjectStatsProps {
  count: number;
  label: string;
}

export function ProjectStats({ count, label }: ProjectStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
      >
        {count}
      </motion.div>
      <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">
        {label}
      </div>
    </motion.div>
  );
}
