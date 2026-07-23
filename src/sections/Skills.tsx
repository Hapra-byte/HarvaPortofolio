import { motion } from "motion/react";
import { skills } from "@/src/data/skills";
import { useLanguage } from "@/src/context/LanguageContext";

export function Skills() {
  const { language } = useLanguage();

  return (
    <section id="skills" className="py-24 px-6 border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:text-center"
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            {language === 'en' ? 'Technical Mastery' : 'Penguasaan Teknis'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Core Skills' : 'Keahlian Inti'}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed transition-colors hover:text-slate-300 duration-300">
            {language === 'en' 
              ? 'A combination of professional editing software and deep understanding of visual design.' 
              : 'Kombinasi antara perangkat lunak pengeditan profesional dan pemahaman desain visual yang mendalam.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hard Skills Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-8 hover:border-indigo-500/50 transition-colors duration-300 group"
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 group-hover:text-indigo-400 transition-colors duration-300">
              {language === 'en' ? 'Hard Skills' : 'Keterampilan Teknis'}
            </div>
            <div className="space-y-6">
              {skills.hardSkills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + (index * 0.05) }}
                  className="group/skill"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover/skill:text-slate-100 transition-colors">{skill.name}</span>
                    <span className="text-[#6366F1] text-xs font-mono group-hover/skill:text-indigo-400 transition-colors">{skill.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A78BFA] rounded-full shadow-lg shadow-indigo-500/50"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, delay: 0.3 + (index * 0.05), ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-colors duration-300 group"
          >
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 group-hover:text-indigo-400 transition-colors duration-300">
                {language === 'en' ? 'Soft Skills' : 'Keterampilan Lunak'}
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.softSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 + (index * 0.04) }}
                    className="group/badge"
                  >
                    <span className="px-4 py-2 bg-slate-800 border border-slate-700 text-[10px] rounded-full uppercase font-bold tracking-wider text-slate-300 inline-block hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-300 transition-all duration-300 cursor-default">
                      {skill}
                    </span>
                  </motion.div>
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
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent group-hover/stat:from-indigo-400 group-hover/stat:to-purple-400 transition-all duration-300">3+</div>
                <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-1 group-hover/stat:text-slate-300 transition-colors duration-300">
                  {language === 'en' ? 'Years of Experience' : 'Tahun Pengalaman'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
