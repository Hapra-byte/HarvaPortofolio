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

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden border-b border-slate-800">
      
      {/* Floating Orb */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-400 via-pink-500 to-yellow-400 rounded-full opacity-70 animate-float z-0" />

      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6366F1]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-slate-800/50 rounded-full text-[10px] font-bold tracking-widest text-[#8B5CF6] uppercase border border-slate-700/50">
            {profile.profession}
          </span>
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#F8FAFC] mb-8 leading-[0.9] uppercase">
          CRAFTING <br/>
          <span className="italic font-serif font-light text-slate-400 lowercase">visual</span> <br/>
          STORIES
        </motion.h1>
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

      {/* Add keyframes for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
