import { motion } from "motion/react";

interface FilterTabsProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  language: "en" | "id";
}

export function FilterTabs({
  categories,
  activeFilter,
  onFilterChange,
  language,
}: FilterTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap gap-2 justify-center mb-12 pb-6 border-b border-slate-800/50"
    >
      <button
        onClick={() => onFilterChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
          activeFilter === "all"
            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/50"
            : "bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
        }`}
      >
        {language === "en" ? "All Works" : "Semua Karya"}
      </button>

      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
            activeFilter === category
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/50"
              : "bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
