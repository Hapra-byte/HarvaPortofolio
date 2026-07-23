import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { useLanguage } from "@/src/context/LanguageContext";

export function Hero() {
  const { language } = useLanguage();

  const headingText = "CRAFTING visual STORIES";

  // Split heading into words
  const words = headingText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, transform: "translateY(30px)", filter: "blur(4px)" },
    show: {
      opacity: 1,
      transform: "translateY(0)",
      filter: "blur(0)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden border-b border-slate-800">
      
      {/* Floating orbs omitted for brevity, assume same as previous code */}

      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#6366F1]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Content container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        {/* Profession badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-slate-800/50 rounded-full text-[10px] font-bold tracking-widest text-[#8B5CF6] uppercase border border-slate-700/50">
            {profile.profession}
          </span>
        </motion.div>

        {/* Animated heading: split into words */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] uppercase mb-8 relative z-10">
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              style={{
                display: "inline-block",
                marginRight: "8px",
                animationDelay: `${index * 0.3}s`
              }}
            >
              {word}
            </motion.span>
          ))}
          {/* Optional: add a blinking cursor or underline for extra style */}
        </h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
          {language === 'en' ? `Hi, I'm ${profile.name}. ` : `Hai, saya ${profile.name}. `}
          {profile[language].description}
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex gap-4">
          <a href="#portfolio" className="px-8 py-4 bg-[#6366F1] text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg shadow-indigo-500/20 hover:bg-[#5254D8] transition-colors">
            {language === 'en' ? 'View Portfolio' : 'Lihat Portfolio'}
          </a>
          <a href="#contact" className="px-8 py-4 border border-slate-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-slate-800 text-[#F8FAFC] transition-colors">
            {language === 'en' ? 'Contact Me' : 'Hubungi Saya'}
          </a>
        </motion.div>
      </motion.div>

      {/* Floating orbs omitted for brevity */}

      {/* Custom CSS for the cool slide-up effect with a more stylish look */}
      <style jsx>{`
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* Optional: style for each word span for extra effects */
        h1 span {
          display: inline-block;
          animation: slideUpFade 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
