import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  
  const links = [
    { key: "About", id: "Tentang", en: "About" },
    { key: "Skills", id: "Keahlian", en: "Skills" },
    { key: "Portfolio", id: "Portofolio", en: "Portfolio" },
    { key: "Experience", id: "Pengalaman", en: "Experience" },
    { key: "Contact", id: "Kontak", en: "Contact" }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-end md:justify-center items-center px-6 md:px-12 py-4 md:py-8 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md"
    >
      <nav className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
        {links.map((link) => (
          <a key={link.key} href={`#${link.key.toLowerCase()}`} className="hover:text-white transition-colors">
            {language === 'en' ? link.en : link.id}
          </a>
        ))}
      </nav>

      {/* Mobile Toggle & Theme */}
      <div className="md:hidden flex items-center gap-4">
        <button 
          onClick={toggleLanguage} 
          className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-[10px] uppercase font-bold text-slate-300"
        >
          {language === "en" ? "EN" : "ID"}
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Right Side Options */}
      <div className="hidden md:flex absolute right-6 md:right-12 items-center gap-4">
        <button 
          onClick={toggleLanguage}
          className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-[10px] uppercase font-bold text-slate-300 hidden sm:flex hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {language === "en" ? "EN" : "ID"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0F172A] border-b border-slate-800 flex flex-col p-6 gap-6 md:hidden shadow-xl"
          >
            {links.map((link) => (
              <a 
                key={link.key} 
                href={`#${link.key.toLowerCase()}`} 
                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {language === 'en' ? link.en : link.id}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
