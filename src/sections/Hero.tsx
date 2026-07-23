import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { useLanguage } from "@/src/context/LanguageContext";

export function Hero() {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
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
      transition: { duration: 0.6, delay: 0.2 + i * 0.04, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const word1 = "CRAFTING";
  const word3 = "STORIES";

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden bg-[#0f1423]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center flex flex-col items-center z-10 relative"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <span className="inline-block px-5 py-2 rounded-[20px] text-[10px] font-semibold tracking-widest text-[#8b5cf6] uppercase border border-[#8b5cf6]/30 bg-transparent">
            {profile.profession}
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-8 leading-[0.85] uppercase">
          <span className="block overflow-hidden relative z-0">
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
            className="italic font-serif font-bold text-slate-400 lowercase block text-7xl md:text-[110px] lg:text-[140px] -mt-6 -mb-6 md:-mt-12 md:-mb-12 relative z-10"
          >
            visual
          </motion.span>

          <span className="block overflow-hidden relative z-0">
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

        <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-400 mb-10 max-w-2xl leading-relaxed font-medium mt-4">
          {language === 'en' ? `Hi, I'm ${profile.name}. ` : `Hai, saya ${profile.name}. `}
          {profile[language].description}
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex gap-5">
          <motion.a
            href="#portfolio"
            className="px-8 py-4 bg-[#6366f1] text-white text-xs font-bold uppercase tracking-widest rounded shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:bg-[#4f46e5] transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {language === 'en' ? 'View Portfolio' : 'Lihat Portfolio'}
          </motion.a>
          
          <motion.a
            href="#contact"
            className="px-8 py-4 border border-slate-700 text-xs font-bold uppercase tracking-widest rounded hover:bg-slate-800/50 text-white transition-all duration-300"
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
