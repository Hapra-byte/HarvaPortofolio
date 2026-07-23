import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { Button } from "@/src/components/ui/Button";
import { useLanguage } from "@/src/context/LanguageContext";

export function Hero() {
  const { language } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
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
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6366F1]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center flex flex-col items-center z-10 relative"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-5 py-2 rounded-full text-[10px] font-bold tracking-widest text-[#8B5CF6] uppercase border border-slate-700/50 bg-transparent">
            {profile.profession}
          </span>
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#F8FAFC] mb-8 leading-[0.9] uppercase">
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
            className="italic font-serif font-light text-slate-400 lowercase block text-7xl md:text-[110px] lg:text-[140px] relative z-10"
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
        
        <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
          {language === 'en' ? `Hi, I'm ${profile.name}. ` : `Hai, saya ${profile.name}. `}
          {profile[language].description}
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex gap-4">
          <a href="#portfolio" className="px-8 py-4 bg-[#6366F1] text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg shadow-indigo-500/20 hover:bg-[#5254D8] transition-colors">
            {language === 'en' ? 'View Portfolio' : 'Lihat Portfolio'}
          </a>
          <a href="#contact" className="px-8 py-4 border border-slate-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-slate-800 text-[#F8FAFC] transition-colors">
            {language === 'en' ? 'Contact Me' : 'Hubungi Saya'}
          </a>
        </motion.div>
      </motion.div>

      {/* Efek gradasi dari background Hero (#0f1423) melebur ke background section berikutnya (#6366F1) */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#0f1423]/80 to-[#6366F1] pointer-events-none z-20" />
    </section>
  );
}
