import { motion } from "motion/react";
import { experiences } from "@/src/data/experience";
import { useLanguage } from "@/src/context/LanguageContext";

export function Experience() {
  const { language } = useLanguage();

  return (
    <section id="experience" className="py-24 px-6 border-t border-slate-800">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            {language === 'en' ? 'Experience' : 'Pengalaman'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase">
            {language === 'en' ? 'Journey' : 'Perjalanan'}
          </h2>
        </motion.div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 flex flex-col space-y-8">
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
    </section>
  );
}
