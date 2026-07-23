import { motion } from "motion/react";
import { ArrowUpRight, Play, Camera } from "lucide-react";
import { ProjectItem } from "@/src/context/ProjectsContext";
import { getLocalizedText } from "@/src/utils/i18n";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  language: "en" | "id";
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({
  project,
  index,
  language,
  onSelect,
}: ProjectCardProps) {
  const getIcon = () => {
    if (project.videos) return <Play className="w-4 h-4 fill-current" />;
    if (project.gallery) return <Camera className="w-4 h-4" />;
    return <ArrowUpRight className="w-4 h-4" />;
  };

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col group overflow-hidden h-full cursor-pointer hover:border-indigo-500/50 transition-colors relative"
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
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {project.category}
            </span>
            {project.gallery && project.gallery.length > 0 && (
              <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold rounded-full">
                📷 {project.gallery.length}
              </span>
            )}
          </div>
          <div className="text-[#6366F1] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            {getIcon()}
          </div>
        </div>

        <div className="flex-grow bg-slate-800 rounded-lg overflow-hidden relative aspect-video mb-4">
          <img
            src={project.image}
            alt={getLocalizedText(project.title)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-indigo-500/80 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
              {getIcon()}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow transform transition-all duration-500 group-hover:scale-[1.02] origin-left">
          <h3 className="font-bold text-xl uppercase tracking-tight mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            {getLocalizedText(project.title)}
          </h3>
          <p className="text-xs text-slate-400 mb-4 line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
            {getLocalizedText(project.description)}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-4 border-t border-slate-800/50">
            <div className="flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-800 border border-slate-700 text-[10px] rounded uppercase text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}