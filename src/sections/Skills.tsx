import { motion } from "motion/react";
import { skills } from "@/src/data/skills";
import { Badge } from "@/src/components/ui/Badge";
import { useLanguage } from "@/src/context/LanguageContext";

export function Skills() {
  const { language } = useLanguage();

  return (
    <section id="skills" className="py-24 px-6 border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:text-center"
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            {language === 'en' ? 'Technical Mastery' : 'Penguasaan Teknis'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase">
            {language === 'en' ? 'Core Skills' : 'Keahlian Inti'}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            {language === 'en' 
              ? 'A combination of professional editing software and deep understanding of visual design.' 
              : 'Kombinasi antara perangkat lunak pengeditan profesional dan pemahaman desain visual yang mendalam.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Hard Skills</div>
            <div className="space-y-6">
              {skills.hardSkills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">{skill.name}</span>
                    <span className="text-[#6366F1] text-xs font-mono">{skill.progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Soft Skills</div>
              <div className="flex flex-wrap gap-2">
                {skills.softSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] rounded uppercase font-bold tracking-wider text-slate-300 inline-block">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4">
              <div className="p-4 bg-slate-800 rounded-xl text-center border border-slate-700/50">
                <div className="text-3xl font-bold text-[#F8FAFC]">3+</div>
                <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Years Exp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
