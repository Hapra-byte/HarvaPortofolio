import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { useLanguage } from "@/src/context/LanguageContext";

export function About() {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <img 
              src="/profile_portrait.png" 
              alt="Profile portrait" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              {language === 'en' ? 'About Me' : 'Tentang Saya'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 uppercase">
              {language === 'en' ? 'The Creator' : 'Sang Kreator'}
            </h2>
            <div className="space-y-6 text-slate-400 text-sm leading-relaxed max-w-lg font-medium">
              <p>
                {profile[language].about}
              </p>
              <p>
                {language === 'en' 
                  ? "As an English Literature student, I combine language comprehension and storytelling skills with technical expertise in the visual world, creating meaningful and aesthetic works." 
                  : "Sebagai mahasiswa Sastra Inggris, saya menggabungkan kemampuan pemahaman bahasa dan penceritaan dengan keterampilan teknis di dunia visual, menciptakan karya yang bermakna dan estetis."}
              </p>
            </div>
            <div className="mt-12 flex gap-12">
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-[#F8FAFC] tracking-tighter mb-2">3+</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  {language === 'en' ? 'Years Exp' : 'Tahun Pengalaman'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
