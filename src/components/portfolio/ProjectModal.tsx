import { motion } from "motion/react";
import { X } from "lucide-react";
import { ProjectItem } from "@/src/context/ProjectsContext";
import { getLocalizedText } from "@/src/utils/i18n";
import { VideoGallery } from "./VideoGallery";
import { PhotoGallery } from "./PhotoGallery";
import { EmptyGallery } from "./EmptyGallery";

interface ProjectModalProps {
  project: ProjectItem;
  language: "en" | "id";
  onLightboxSelect: (imageUrl: string) => void;
  onClose: () => void;
}

export function ProjectModal({
  project,
  language,
  onLightboxSelect,
  onClose,
}: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/90 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-label={`${getLocalizedText(project.title)} details`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-20"
          aria-label="Close modal"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10">
          <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                {project.category}
              </div>
              <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">
                {getLocalizedText(project.title)}
              </h3>
              <p className="text-slate-400 text-sm max-w-2xl">
                {getLocalizedText(project.description)}
              </p>
            </div>
          </div>

          {project.videos && project.videos.length > 0 ? (
            <>
              <VideoGallery videos={project.videos} />
              {project.gallery && project.gallery.length > 0 && (
                <PhotoGallery
                  photos={project.gallery}
                  language={language}
                  onPhotoSelect={onLightboxSelect}
                  isCompact
                />
              )}
            </>
          ) : project.gallery && project.gallery.length > 0 ? (
            <PhotoGallery
              photos={project.gallery}
              language={language}
              onPhotoSelect={onLightboxSelect}
            />
          ) : (
            <EmptyGallery
              image={project.image}
              title={getLocalizedText(project.title)}
              language={language}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}