import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { useLanguage } from "@/src/context/LanguageContext";

function FloatingOrb({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none -z-10"
      style={{ width: size, height: size, left: x, top: y, background: color }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.3, 0.5, 0.35, 0.45, 0.3],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function Hero() {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.5 + i * 0.04, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const word1 = "CRAFTING";
  const word3 = "STORIES";

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden border-b border-slate-800/80">
      {/* Floating Ocean Orbs */}
      <FloatingOrb delay={0} size={600} x="10%" y="20%" color="radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)" /> {/* Sky Blue */}
      <FloatingOrb delay={2} size={500} x="60%" y="10%" color="radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)" /> {/* Teal */}
      <FloatingOrb delay={4} size={400} x="75%" y="60%" color="radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)" /> {/* Blue */}
      <FloatingOrb delay={1} size={350} x="20%" y="70%" color="radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" /> {/* Cyan */}

      {/* Central Ocean Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0ea5e9]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-slate-800/50 rounded-full text-[10px] font-bold tracking-widest text-[#38bdf8] uppercase border border-slate-700/50">
            {profile.profession}
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#f1f5f9] mb-8 leading-[0.9] uppercase">
          <span className="block overflow-hidden">
            {word1.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="show"
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
          <motion.span
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="italic font-serif font-light text-slate-500 lowercase block"
          >
            visual
          </motion.span>
          <span className="block overflow-hidden">
            {word3.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i + word1.length + 2}
                variants={letterVariants}
                initial="hidden"
                animate="show"
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
          {language === 'en' ? `Hi, I'm ${profile.name}. ` : `Hai, saya ${profile.name}. `}
          {profile[language].description}
        </motion.p>
        <motion.div variants={itemVariants} className="flex gap-4">
          <motion.a
            href="#portfolio"
            className="px-8 py-4 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {language === 'en' ? 'View Portfolio' : 'Lihat Portfolio'}
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border border-slate-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-slate-800 text-[#f1f5f9] transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {language === 'en' ? 'Contact Me' : 'Hubungi Saya'}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
