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
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden bg-[#0f111a] border-b border-[#2d2449]">
      {/* Background menjadi sangat gelap (cyberpunk base) */}
      
      {/* Floating Orbs - Warna Ungu/Fuchsia/Magenta Neon */}
      <FloatingOrb delay={0} size={600} x="10%" y="20%" color="radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" />
      <FloatingOrb delay={2} size={500} x="60%" y="10%" color="radial-gradient(circle, rgba(192,38,211,0.12) 0%, transparent 70%)" />
      <FloatingOrb delay={4} size={400} x="75%" y="60%" color="radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" />
      <FloatingOrb delay={1} size={350} x="20%" y="70%" color="radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 70%)" />

      {/* Central Glow - Deep Purple */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#9333ea]/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center flex flex-col items-center z-10 relative"
      >
        <motion.div variants={itemVariants} className="mb-10">
          {/* Badge dengan outline cyan menyala */}
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-widest text-[#22d3ee] uppercase border border-[#22d3ee] shadow-[0_0_12px_rgba(34,211,238,0.3)] bg-[#0f111a]/50 backdrop-blur-sm">
            {profile.profession}
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-[#f8fafc] mb-8 leading-[0.85] uppercase">
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
          
          {/* Teks "visual" diperbesar, ungu neon, dan margin negatif untuk overlap */}
          <motion.span
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="italic font-serif font-bold text-[#d946ef] lowercase block text-7xl md:text-[110px] lg:text-[140px] -mt-6 -mb-6 md:-mt-12 md:-mb-12 relative z-10 [text-shadow:_0_4px_24px_rgba(217,70,239,0.5)]"
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

        <motion.p variants={itemVariants} className="text-sm md:text-base text-gray-300 mb-10 max-w-lg leading-relaxed font-medium mt-4">
          {language === 'en' ? `Hi, I'm ${profile.name}. ` : `Hai, saya ${profile.name}. `}
          {profile[language].description}
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex gap-5">
          {/* Tombol Gradient Fuchsia ke Cyan */}
          <motion.a
            href="#portfolio"
            className="px-8 py-4 bg-gradient-to-r from-[#c026d3] to-[#06b6d4] text-white text-xs font-bold uppercase tracking-widest rounded-[4px] shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {language === 'en' ? 'View Portfolio' : 'Lihat Portfolio'}
          </motion.a>
          
          {/* Tombol Outline Putih */}
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-white text-xs font-bold uppercase tracking-widest rounded-[4px] hover:bg-white/10 text-white transition-all duration-300"
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
