import { motion } from "motion/react";
import { useState, useRef } from "react";
import { ArrowUpRight, Play, Camera } from "lucide-react";
import { ProjectItem } from "@/src/context/ProjectsContext";
import { getLocalizedText } from "@/src/utils/i18n";

interface EnhancedProjectCardProps {
  project: ProjectItem;
  index: number;
  language: "en" | "id";
  onSelect: (project: ProjectItem) => void;
}

export function EnhancedProjectCard({
  project,
  index,
  language,
  onSelect,
}: EnhancedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const getIcon = () => {
    if (project.videos) return <Play className="w-5 h-5 fill-current" />;
    if (project.gallery) return <Camera className="w-5 h-5" />;
    return <ArrowUpRight className="w-5 h-5" />;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const gradients = [
    "from-indigo-500/20 to-purple-500/20",
    "from-pink-500/20 to-red-500/20",
    "from-cyan-500/20 to-blue-500/20",
    "from-amber-500/20 to-orange-500/20",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
    >
      <div
        ref={cardRef}
        className="group relative h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelect(project);
          }
        }}
        aria-label={`View ${getLocalizedText(project.title)}`}
      >
        {/* Enhanced Glass Card */}
        <div className="glass glass-hover relative overflow-hidden rounded-2xl border border-slate-800 p-6 flex flex-col h-full shadow-glow transition-all duration-500">
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Animated Spotlight */}
          {isHovered && (
            <motion.div
              className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
              animate={{
                x: mousePosition.x - 192,
                y: mousePosition.y - 192,
              }}
              transition={{ type: "spring", damping: 30 }}
            />
          )}

          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {project.category}
                </span>
                {project.gallery && project.gallery.length > 0 && (
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-semibold rounded-full cursor-default"
                  >
                    📷 {project.gallery.length}
                  </motion.span>
                )}
              </div>
              <motion.div
                className="text-indigo-400 transition-all duration-300"
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 45 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {getIcon()}
              </motion.div>
            </div>

            {/* Image Container */}
            <div className="flex-grow bg-slate-800/50 rounded-lg overflow-hidden relative aspect-video mb-4 backdrop-blur-sm">
              <motion.img
                src={project.image}
                alt={getLocalizedText(project.title)}
                className="w-full h-full object-cover"
                loading="lazy"
                animate={{
                  scale: isHovered ? 1.08 : 1,
                }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none"></div>

              {/* Play Button Overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-14 h-14 bg-indigo-500/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg shadow-indigo-500/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {getIcon()}
                </motion.div>
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col flex-grow">
              <motion.h3
                className="font-bold text-lg uppercase tracking-tight mb-2 text-slate-100"
                animate={{
                  opacity: isHovered ? 1 : 0.8,
                }}
              >
                {getLocalizedText(project.title)}
              </motion.h3>
              <motion.p
                className="text-xs text-slate-400 mb-4 line-clamp-2"
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                }}
              >
                {getLocalizedText(project.description)}
              </motion.p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-700/50">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0.6,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.05,
                    }}
                    className="px-2 py-1 bg-slate-800/60 border border-slate-700 text-[10px] rounded uppercase text-slate-300 backdrop-blur-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
