import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, X, Play, Camera, Maximize2, Trash2 } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { useProjects, ProjectItem } from "@/src/context/ProjectsContext";

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

export function Portfolio() {
  const { language } = useLanguage();
  const { projects, removePhotoFromProject, clearProjectPhotos } = useProjects();

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Keep selectedProject state updated if projects state changes
  const activeProject = selectedProject
    ? projects.find(p => p.id === selectedProject.id) || selectedProject
    : null;

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
    <section id="portfolio" className="relative py-24 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-900 via-black to-slate-900 overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Portfolio</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 uppercase bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Selected Works' : 'Karya Pilihan'}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm mb-8 transition-colors hover:text-slate-300 duration-300">
            {language === 'en' 
              ? 'A collection of selected works including 3D Animation, Graphic Design, Photography, and Personal Video Projects.' 
              : 'Kumpulan karya pilihan mencakup Animasi 3D, Desain Grafis, Fotografi, serta Proyek Video Personal.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div 
                className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col group overflow-hidden h-full cursor-pointer hover:border-indigo-500/50 transition-colors relative"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{project.category}</span>
                    {project.gallery && project.gallery.length > 0 && (
                      <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold rounded-full">
                        📷 {project.gallery.length}
                      </span>
                    )}
                  </div>
                  <div className="text-[#6366F1] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    {project.videos ? <Play className="w-4 h-4 fill-current" /> : project.gallery ? <Camera className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                </div>

                <div className="flex-grow bg-slate-800 rounded-lg overflow-hidden relative aspect-video mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title[language] || project.title.id}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-indigo-500/80 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                      {project.videos ? (
                        <Play className="w-5 h-5 text-white fill-current translate-x-[1px]" />
                      ) : project.gallery ? (
                        <Camera className="w-5 h-5 text-white" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-grow transform transition-all duration-500 group-hover:scale-[1.02] origin-left">
                  <h3 className="font-bold text-xl uppercase tracking-tight mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {project.title[language] || project.title.id}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    {project.description[language] || project.description.id}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-4 border-t border-slate-800/50">
                    <div className="flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-800 border border-slate-700 text-[10px] rounded uppercase text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="p-6 sm:p-10">
                  <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{activeProject.category}</div>
                      <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">{activeProject.title[language] || activeProject.title.id}</h3>
                      <p className="text-slate-400 text-sm max-w-2xl">{activeProject.description[language] || activeProject.description.id}</p>
                    </div>
                  </div>
                  
                  {activeProject.videos && activeProject.videos.length > 0 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeProject.videos.map((video, idx) => (
                          <div key={idx} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-[9/16] relative flex flex-col items-center justify-center group shadow-lg">
                            <video 
                              controls 
                              autoPlay
                              muted
                              playsInline
                              loop
                              preload="auto"
                              className="w-full h-full object-cover rounded-xl"
                            >
                              <source src={video} type="video/mp4" />
                              <source src={video.toLowerCase()} type="video/mp4" />
                              Browser Anda tidak mendukung pemutaran video.
                            </video>
                          </div>
                        ))}
                      </div>

                      {/* Show gallery if photos were also added */}
                      {activeProject.gallery && activeProject.gallery.length > 0 && (
                        <div className="pt-6 border-t border-slate-800">
                          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                            {language === 'en' ? 'Photos in this section' : 'Foto di bagian ini'} ({activeProject.gallery.length})
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {activeProject.gallery.map((imgUrl, idx) => (
                              <div key={idx} className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-square">
                                <img src={imgUrl} alt={`Photo ${idx+1}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : activeProject.gallery && activeProject.gallery.length > 0 ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            {language === 'en' ? 'Photo Gallery' : 'Galeri Foto'} ({activeProject.gallery.length})
                          </span>
                        </div>
                        <span className="text-xs text-indigo-400 font-medium hidden sm:inline">
                          {language === 'en' ? 'Click photo to view' : 'Klik foto untuk memperbesar'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {activeProject.gallery.map((imgUrl, idx) => (
                          <div 
                            key={idx} 
                            className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-square hover:border-indigo-500/60 transition-all duration-300"
                          >
                            <img 
                              src={imgUrl} 
                              alt={`${activeProject.title[language] || activeProject.title.id} ${idx + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                              onClick={() => setActiveLightboxImage(imgUrl)}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveLightboxImage(imgUrl);
                                }}
                                className="p-2.5 bg-indigo-600 rounded-full text-white shadow-lg pointer-events-auto hover:bg-indigo-500 transition-colors"
                                title={language === 'en' ? 'Zoom photo' : 'Perbesar foto'}
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center bg-slate-950/60 rounded-xl border border-slate-800 p-8 text-center min-h-[300px]">
                      <img 
                        src={activeProject.image} 
                        alt={activeProject.title[language] || activeProject.title.id} 
                        className="max-h-64 w-auto object-contain rounded-lg mb-6 border border-slate-800 shadow-md opacity-80"
                      />
                      <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        {language === 'en' ? 'No Photos in This Section Yet' : 'Belum Ada Foto di Bagian Ini'}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox Modal for enlarged image view */}
        <AnimatePresence>
          {activeLightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              onClick={() => setActiveLightboxImage(null)}
            >
              <button 
                onClick={() => setActiveLightboxImage(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-slate-800/90 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors z-10 shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl max-h-[90vh] flex items-center justify-center p-2"
              >
                <img 
                  src={activeLightboxImage} 
                  alt="Enlarged view" 
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-slate-800"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
