import { motion } from "motion/react";
import { experiences } from "@/src/data/experience";
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

export function Experience() {
  const { language } = useLanguage();

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
        right: "5%",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
    {
      className:
        "w-96 h-96 bg-yellow-400/15 opacity-20 blur-3xl animate-floatSlow",
      style: {
        top: "30%",
        left: "-10rem",
        clipPath:
          "polygon(50% 0%, 90% 30%, 80% 80%, 30% 90%, 0% 50%, 20% 20%)",
        animationDelay: `${rand(0, 4)}s`,
      },
    },
  ];

  return (
    <section id="experience" className="relative py-24 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-900 via-black to-slate-900 overflow-hidden">
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

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            {language === 'en' ? 'Experience' : 'Pengalaman'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Journey' : 'Perjalanan'}
          </h2>
        </motion.div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 flex flex-col space-y-8 hover:border-indigo-500/50 transition-colors duration-300 group">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-start gap-4 md:gap-8 border-b border-slate-800 pb-8 last:border-0 last:pb-0"
            >
              <div className="text-[#6366F1] font-mono text-xs pt-1 md:w-32 shrink-0">
                {typeof exp.period === 'string' ? exp.period : exp.period[language]}
              </div>
              <div>
                <div className="text-lg font-bold uppercase tracking-tight">
                  {typeof exp.role === 'string' ? exp.role : exp.role[language]}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">
                  {typeof exp.company === 'string' ? exp.company : exp.company[language]}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                  {exp.description[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
