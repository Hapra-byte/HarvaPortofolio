import { motion } from "motion/react";

interface PortfolioStatsProps {
  language: "en" | "id";
  projectCount: number;
  categoryCount: number;
}

export function PortfolioStats({
  language,
  projectCount,
  categoryCount,
}: PortfolioStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-20"
    >
      {[
        {
          value: projectCount,
          label: language === "en" ? "Projects" : "Proyek",
        },
        {
          value: categoryCount,
          label: language === "en" ? "Categories" : "Kategori",
        },
        {
          value: language === "en" ? "5+" : "5+",
          label: language === "en" ? "Years" : "Tahun",
        },
        {
          value: language === "en" ? "100%" : "100%",
          label: language === "en" ? "Quality" : "Kualitas",
        },
      ].map((stat, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -4 }}
          className="glass glass-hover rounded-lg p-4 text-center border border-slate-700/50 shadow-glow"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1"
          >
            {stat.value}
          </motion.div>
          <div className="text-xs text-slate-400 uppercase tracking-widest">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
