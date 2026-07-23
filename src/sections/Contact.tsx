import React, { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/src/data/profile";
import { Button } from "@/src/components/ui/Button";
import { Send, MapPin, Phone, Mail, AlertCircle } from "lucide-react";
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

export function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <div className="space-y-8">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-[#6366F1] group-hover:border-[#6366F1] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email</h4>
                  <span className="text-sm font-medium group-hover:text-[#6366F1] transition-colors">
                    {profile.email}
                  </span>
                </div>
              </a>
              <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-[#6366F1] group-hover:border-[#6366F1] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">WhatsApp</h4>
                  <span className="text-sm font-medium group-hover:text-[#6366F1] transition-colors">
                    {profile.phone}
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-[#6366F1] group-hover:border-[#6366F1] transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    {language === 'en' ? 'Location' : 'Lokasi'}
                  </h4>
                  <p className="text-sm font-medium">
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
                  placeholder={language === 'en' ? 'John Doe' : 'Budi Santoso'}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
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
                  placeholder={language === 'en' ? 'john@example.com' : 'budi@contoh.com'} 
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
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
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>
              
              <button 
                type="submit" 
                aria-label={language === 'en' ? 'Send Message' : 'Kirim Pesan'}
                disabled={isSubmitted || isSubmitting}
                className="w-full py-4 bg-[#6366F1] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-[#5254D8] transition-colors disabled:opacity-50"
              >
                <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} aria-hidden="true" /> 
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
