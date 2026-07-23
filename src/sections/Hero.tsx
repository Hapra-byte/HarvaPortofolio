/*  Hero.tsx  ---------------------------------------------------------- */
import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { useLanguage } from "@/src/context/LanguageContext";

/* -------------------------------------------------------------
   Helper: generate a random number in a range – useful for
   giving each floating shape a unique animation‑delay.
------------------------------------------------------------- */
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* -------------------------------------------------------------
   The Hero component
------------------------------------------------------------- */
export function Hero() {
  const { language } = useLanguage();

  /* -----------------------------------------------------------------
     Text that we want to animate word‑by‑word.
     You can change this string any time – the split logic will
     keep everything working.
  ----------------------------------------------------------------- */
  const headingText = "CRAFTING visual STORIES";

  const words = headingText.split(" ");

  /* -----------------------------------------------------------------
     Container animation – fades everything in, then lets child
     elements (badge, heading, paragraph, buttons) animate in sequence.
  ----------------------------------------------------------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // Stagger the **direct** children (badge → heading → p → buttons)
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  /* -----------------------------------------------------------------
     Word‑by‑word animation.
     • Starts blurred, shifted down & slightly rotated.
     • Slides up, de‑blurs, rotates back.
     • At the end a short “glow‑pulse” runs (0.2 s) to give a
       cyber‑organic vibe.
  ----------------------------------------------------------------- */
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotate: -5,
      filter: "blur(6px)",
    },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        // Each word gets its own delay based on its index
        delay: i * 0.12,
      },
    }),
    // The “flash” that runs after the word is in place
    pulse: {
      textShadow: [
        "0 0 0 rgba(255,255,255,0)",
        "0 0 8px rgba(255,255,255,0.7)",
        "0 0 0 rgba(255,255,255,0)",
      ],
      transition: { repeat: 0, duration: 0.2, ease: "easeInOut" },
    },
  };

  /* -----------------------------------------------------------------
     Shape data – each entry creates a <div> that becomes one of the
     floating organic shapes.
  ----------------------------------------------------------------- */
  const shapes = [
    {
      // Large pastel circle
      className:
        "w-72 h-72 bg-pink-400/20 rounded-full blur-xl opacity-50 animate-float",
      style: {
        top: "-12rem",
        left: "-8rem",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      // Small square that rotates
      className:
        "w-28 h-28 bg-indigo-400/20 rounded-md blur-xl opacity-40 animate-rotate",
      style: {
        top: "20%",
        right: "-3rem",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      // Diamond (rotated square) that pulsates
      className:
        "w-40 h-40 bg-emerald-400/20 rounded-md blur-xl opacity-30 animate-pulseScale rotate-45",
      style: {
        bottom: "-6rem",
        left: "10%",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      // Soft “blob” – uses clip‑path to look organic
      className:
        "w-96 h-96 bg-yellow-400/15 opacity-20 blur-3xl animate-floatSlow",
      style: {
        bottom: "-12rem",
        right: "-10rem",
        clipPath: "polygon(50% 0%, 90% 30%, 80% 80%, 30% 90%, 0% 50%, 20% 20%)",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-black to-slate-900 pt-20 px-6">
      {/* -----------------------------------------------------------------
          1️⃣  ORGANIC BACKGROUND SHAPES
      ----------------------------------------------------------------- */}
      {shapes.map((s, i) => (
        <div
          key={i}
          className={s.className + " absolute pointer-events-none"}
          style={s.style}
        />
      ))}

      {/* -----------------------------------------------------------------
          2️⃣  A faint central “blob” that adds depth
      ----------------------------------------------------------------- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[800px] h-[800px] bg-[#6366F1]/5 rounded-full blur-[140px]" />
      </div>

      {/* -----------------------------------------------------------------
          3️⃣  MAIN CONTENT (badge, heading, paragraph, buttons)
      ----------------------------------------------------------------- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10"
      >
        {/* ---- Badge ---------------------------------------------------- */}
        <motion.div variants={wordVariants} custom={0}>
          <span className="inline-block px-4 py-1.5 bg-slate-800/50 rounded-full text-[10px] font-bold tracking-widest text-[#8B5CF6] uppercase border border-slate-700/50">
            {profile.profession}
          </span>
        </motion.div>

        {/* ---- Heading – word‑by‑word animation ------------------------- */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] uppercase mb-4 relative">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate={["show", "pulse"]} // run pulse after show
              style={{
                display: "inline-block",
                marginRight: "0.5rem",
                // The blinking cursor under the last word
                ...(i === words.length - 1 && {
                  position: "relative",
                }),
              }}
            >
              {word}
              {/* Blinking cursor – only after the last word */}
              {i === words.length - 1 && (
                <motion.span
                  className="inline-block w-[2px] h-[0.9em] bg-white ml-1"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9,
                    ease: "easeInOut",
                    delay: (words.length - 1) * 0.12 + 0.7,
                  }}
                />
              )}
            </motion.span>
          ))}

          {/* Optional “glitch line” that slides under the heading */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: words.length * 0.12 + 0.5, duration: 0.8 }}
          />
        </h1>

        {/* ---- Paragraph ------------------------------------------------ */}
        <motion.p variants={wordVariants} custom={words.length + 1} className="text-sm md:text-base text-slate-400 max-w-lg leading-relaxed font-medium">
          {language === "en"
            ? `Hi, I'm ${profile.name}. `
            : `Hai, saya ${profile.name}. `}
          {profile[language].description}
        </motion.p>

        {/* ---- Buttons -------------------------------------------------- */}
        <motion.div variants={wordVariants} custom={words.length + 2} className="flex gap-4">
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

      {/* -----------------------------------------------------------------
          4️⃣  KEYFRAMES (Tailwind cannot express these yet)
      ----------------------------------------------------------------- */}
      <style jsx global>{`
        /* Float up‑and‑down, slow & subtle */
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

        /* Gentle rotation */
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Pulse‑scale for the diamond */
        @keyframes pulseScale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        /* Apply the animations */
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
