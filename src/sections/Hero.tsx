import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { useLanguage } from "@/src/context/LanguageContext";

/* ---------- Helper ---------- */
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* ---------- Optimized floating orb (pure CSS) ---------- */
function FloatingOrb({
  delay,
  size,
  x,
  y,
  color,
}: {
  delay: number;
  size: number;
  x: string;
  y: string;
  color: string;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none -z-10 animate-orb"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

/* ---------- Hero component ---------- */
export function Hero() {
  const { language } = useLanguage();

  /* ----- Text ----- */
  const word1 = "CRAFTING";
  const word3 = "STORIES";

  /* ----- Variants ----- */
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5 + i * 0.04,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  /* ----- Organic shapes ----- */
  const shapes = [
    {
      className:
        "w-72 h-72 bg-pink-400/20 rounded-full blur-xl opacity-50 animate-float",
      style: {
        top: "-12rem",
        left: "-8rem",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      className:
        "w-28 h-28 bg-indigo-400/20 rounded-md blur-xl opacity-40 animate-rotate",
      style: {
        top: "20%",
        right: "-3rem",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      className:
        "w-40 h-40 bg-emerald-400/20 rounded-md blur-xl opacity-30 animate-pulseScale rotate-45",
      style: {
        bottom: "-6rem",
        left: "10%",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      className:
        "w-96 h-96 bg-yellow-400/15 opacity-20 blur-3xl animate-floatSlow",
      style: {
        bottom: "-12rem",
        right: "-10rem",
        clipPath:
          "polygon(50% 0%, 90% 30%, 80% 80%, 30% 90%, 0% 50%, 20% 20%)",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-black to-slate-900 pt-20 px-6">
      {/* ----- Orbs (CSS‑animated) ----- */}
      <FloatingOrb
        delay={0}
        size={600}
        x="10%"
        y="20%"
        color="radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)"
      />
      <FloatingOrb
        delay={2}
        size={500}
        x="60%"
        y="10%"
        color="radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)"
      />
      <FloatingOrb
        delay={4}
        size={400}
        x="75%"
        y="60%"
        color="radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)"
      />
      <FloatingOrb
        delay={1}
        size={350}
        x="20%"
        y="70%"
        color="radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 70%)"
      />

      {/* ----- Central warm glow ----- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ea580c]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ----- Organic background shapes ----- */}
      {shapes.map((s, i) => (
        <div
          key={i}
          className={s.className + " absolute pointer-events-none"}
          style={s.style}
        />
      ))}

      {/* ----- Main content ----- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10"
      >
        {/* Profession badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-slate-800/50 rounded-full text-[10px] font-bold tracking-widest text-[#8B5CF6] uppercase border border-slate-700/50">
            {profile.profession}
          </span>
        </motion.div>

        {/* Heading – per‑letter animation for CRAFTING & STORIES */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] uppercase mb-4">
          {/* CRAFTING */}
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

          {/* visual */}
          <motion.span
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="italic font-serif font-light text-slate-500 lowercase block"
          >
            visual
          </motion.span>

          {/* STORIES */}
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

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-400 max-w-lg leading-relaxed font-medium">
          {language === "en"
            ? `Hi, I'm ${profile.name}. `
            : `Hai, saya ${profile.name}. `}
          {profile[language].description}
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex gap-4">
          <a
            href="#portfolio"
            className="px-8 py-4 bg-[#6366F1] text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg shadow-indigo-500/20 hover:bg-[#5254D8] transition-colors"
          >
            {language === "en" ? "View Portfolio" : "Lihat Portfolio"}
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-slate-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-slate-800 text-[#F8FAFC] transition-colors"
          >
            {language === "en" ? "Contact Me" : "Hubungi Saya"}
          </a>
        </motion.div>
      </motion.div>

      {/* ----- CSS keyframes (orbs & float) ----- */}
      <style jsx global>{`
        @keyframes orbMove {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(15px, -30px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-10px, 0) scale(0.95);
            opacity: 0.35;
          }
          75% {
            transform: translate(5px, 20px) scale(1.05);
            opacity: 0.45;
          }
        }
        .animate-orb {
          animation: orbMove 12s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes pulseScale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animate-rotate {
          animation: rotate 12s linear infinite;
        }
        .animate-pulseScale {
          animation: pulseScale 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
