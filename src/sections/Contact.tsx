import React, { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { Button } from "@/src/components/ui/Button";
import { Send, MapPin, Phone, Mail, AlertCircle } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

/* ---------- Helper ---------- */
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


export function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ----- Organic shapes ----- */
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { name: "", email: "", message: "" };
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? "Name is required" : "Nama wajib diisi";
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? "Email is required" : "Email wajib diisi";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? "Please enter a valid email address" : "Harap masukkan alamat email yang valid";
      hasError = true;
    }
    if (!formData.message.trim()) {
      newErrors.message = language === 'en' ? "Message is required" : "Pesan wajib diisi";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setIsSubmitting(true);
      try {
        await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `Pesan baru dari ${formData.name} melalui Website Portfolio`
          })
        });

        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear error as user types
    if (errors[e.target.id as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.id]: "" });
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-900 via-black to-slate-900 overflow-hidden">
      {/* ----- Orbs (CSS‑animated) ----- */}

      {/* ----- Central warm glow ----- */}

      {/* ----- Organic background shapes ----- */}
      

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:text-center"
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            {language === 'en' ? 'Contact' : 'Kontak'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Get in Touch' : 'Hubungi Saya'}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm transition-colors hover:text-slate-300 duration-300">
            {language === 'en' 
              ? 'Interested in collaborating? Let\'s discuss your ideas and projects.' 
              : 'Tertarik untuk berkolaborasi? Mari diskusikan ide dan proyek Anda.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-8 flex flex-col justify-center hover:border-indigo-500/50 transition-colors duration-300 group"
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8 group-hover:text-indigo-400 transition-colors duration-300">
              {language === 'en' ? 'Information' : 'Informasi'}
            </div>
            <div className="space-y-6">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-6 group/item cursor-pointer p-4 rounded-2xl bg-slate-800/20 hover:bg-slate-800/60 border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-full border border-slate-700/50 bg-slate-900 flex items-center justify-center text-slate-400 group-hover/item:text-white group-hover/item:bg-[#6366F1] group-hover/item:border-[#6366F1] transition-all duration-300 shadow-lg group-hover/item:shadow-indigo-500/20 group-hover/item:scale-110">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover/item:text-indigo-400 transition-colors duration-300">Email</h4>
                  <span className="text-sm font-medium text-slate-300 group-hover/item:text-white transition-colors duration-300">
                    {profile.email}
                  </span>
                </div>
              </a>
              <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group/item cursor-pointer p-4 rounded-2xl bg-slate-800/20 hover:bg-slate-800/60 border border-slate-700/30 hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-full border border-slate-700/50 bg-slate-900 flex items-center justify-center text-slate-400 group-hover/item:text-white group-hover/item:bg-[#25D366] group-hover/item:border-[#25D366] transition-all duration-300 shadow-lg group-hover/item:shadow-emerald-500/20 group-hover/item:scale-110">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover/item:text-emerald-400 transition-colors duration-300">WhatsApp</h4>
                  <span className="text-sm font-medium text-slate-300 group-hover/item:text-white transition-colors duration-300">
                    {profile.phone}
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-6 group/item p-4 rounded-2xl bg-slate-800/20 hover:bg-slate-800/60 border border-slate-700/30 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-full border border-slate-700/50 bg-slate-900 flex items-center justify-center text-slate-400 group-hover/item:text-white group-hover/item:bg-purple-500 group-hover/item:border-purple-500 transition-all duration-300 shadow-lg group-hover/item:shadow-purple-500/20 group-hover/item:scale-110">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover/item:text-purple-400 transition-colors duration-300">
                    {language === 'en' ? 'Location' : 'Lokasi'}
                  </h4>
                  <p className="text-sm font-medium text-slate-300 group-hover/item:text-white transition-colors duration-300">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-8 hover:border-indigo-500/50 transition-colors duration-300 group"
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 group-hover:text-indigo-400 transition-colors duration-300">
              {language === 'en' ? 'Send Message' : 'Kirim Pesan'}
            </div>
            
            {isSubmitted && (
              <div role="status" className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg flex items-center gap-2">
                {language === 'en' ? 'Message sent successfully! We will get back to you soon.' : 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.'}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {language === 'en' ? 'Name' : 'Nama'}
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-required="true"
                  className={`w-full bg-slate-900/50 border-b px-0 py-3 text-sm focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
                  }`}
                  placeholder={language === 'en' ? 'John Doe' : 'Budi Santoso'} />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs flex items-center gap-1 mt-1" role="alert">
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-required="true"
                  className={`w-full bg-slate-900/50 border-b px-0 py-3 text-sm focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
                  }`}
                  placeholder={language === 'en' ? 'john@example.com' : 'budi@contoh.com'} /> 
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs flex items-center gap-1 mt-1" role="alert">
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {language === 'en' ? 'Message' : 'Pesan'}
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-required="true"
                  className={`w-full bg-slate-900/50 border-b px-0 py-3 text-sm focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
                  }`}
                  placeholder={language === 'en' ? 'How can I help you?' : 'Ada yang bisa saya bantu?'}
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-xs flex items-center gap-1 mt-1" role="alert">
                  </p>
                )}
              </div>
              
              <button 
                type="submit" 
                aria-label={language === 'en' ? 'Send Message' : 'Kirim Pesan'}
                disabled={isSubmitted || isSubmitting}
                className="w-full py-4 bg-[#6366F1] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-[#5254D8] transition-colors disabled:opacity-50"
              >
                {isSubmitting 
                  ? (language === 'en' ? 'Sending...' : 'Mengirim...')
                  : isSubmitted 
                    ? (language === 'en' ? 'Sent' : 'Terkirim') 
                    : (language === 'en' ? 'Send Message' : 'Kirim Pesan')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ----- CSS keyframes (orbs & float) ----- */}
      
    </section>
  );
}
