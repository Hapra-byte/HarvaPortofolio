import { motion } from "motion/react";

interface PortfolioHeaderProps {
  language: "en" | "id";
}

export function PortfolioHeader({ language }: PortfolioHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 text-center"
    >
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
        Portfolio
      </div>
      <h2 className="...">
  {language === "en" ? "All My Works" : "Semua Karya Saya"}
</h2>
    
      <p className="text-slate-400 max-w-2xl mx-auto text-sm mb-8 transition-colors hover:text-slate-300 duration-300">
        {language === "en"
          ? "A collection of selected works including 3D Animation, Graphic Design, Photography, and Personal Video Projects."
          : "Kumpulan karya pilihan mencakup Animasi 3D, Desain Grafis, Fotografi, serta Proyek Video Personal."}
      </p>
    </motion.div>
  );
}
