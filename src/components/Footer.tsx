import { profile } from "@/src/data/profile";
import { socialLinks } from "@/src/data/social";
import { useLanguage } from "@/src/context/LanguageContext";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="px-6 md:px-12 py-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-[#0F172A]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-center md:text-left">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span>{language === 'en' ? 'Ready for new challenges' : 'Siap untuk tantangan baru'}</span>
        </div>
        <span className="hidden md:inline">{language === 'en' ? 'Loc' : 'Lok'}: {profile.location}</span>
      </div>
      <div className="flex gap-4 md:gap-8 items-center">
        <div className="flex gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title={social.name}>
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
        <span>&copy; {new Date().getFullYear()} {profile.name} &mdash; {language === 'en' ? 'All Rights Reserved' : 'Hak Cipta Dilindungi'}</span>
      </div>
    </footer>
  );
}
