import { motion } from "motion/react";
import { skills } from "@/src/data/skills";
import { useLanguage } from "@/src/context/LanguageContext";
import { HardSkillBar } from "@/src/components/HardSkillBar";
import { skillsLocale } from "@/src/data/skillsLocale";

const ANIMATION_STAGGER = 0.04;
const COLORS = {
  accent: '#6366F1',
  secondary: '#8B5CF6',
  light: '#F8FAFC',
};

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

export function Skills() {
  const { language } = useLanguage();
  const locale = skillsLocale[language as keyof typeof skillsLocale];

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
    <section id="skills" className="relative py-24 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-900 via-black to-slate-900 overflow-hidden">
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

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:text-center"
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            {locale.technicalMastery}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            {locale.coreSkills}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed transition-colors hover:text-slate-300 duration-300">
            {locale.description}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Hard Skills */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-8 hover:border-indigo-500/50 transition-colors duration-300 group"
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 group-hover:text-indigo-400 transition-colors duration-300">
              {locale.hardSkills}
            </div>
            <div className="space-y-6">
              {skills.hardSkills.map((skill, index) => (
                <HardSkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  progress={skill.progress} 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-colors duration-300 group"
          >
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 group-hover:text-indigo-400 transition-colors duration-300">
                {locale.softSkills}
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.softSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 + (index * ANIMATION_STAGGER) }}
                    className="group/badge"
                  >
                    <span className="px-4 py-2 bg-slate-800 border border-slate-700 text-[10px] rounded-full uppercase font-bold tracking-wider text-slate-300 inline-block hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300">
                      {skill}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-8 grid grid-cols-1 gap-4"
            >
              <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl text-center border border-slate-700/50 hover:border-indigo-500/30 transition-colors duration-300 group/stat">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent group-hover/stat:from-indigo-400 group-hover/stat:to-purple-400 transition-all duration-300">
                  3+
                </div>
                <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-1 group-hover/stat:text-slate-300 transition-colors duration-300">
                  {locale.yearsExp}
                </div>
              </div>
            </motion.div>
          </motion.div>
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
