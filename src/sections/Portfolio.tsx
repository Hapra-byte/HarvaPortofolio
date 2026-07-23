import { AnimatePresence } from "motion/react";
import { useState, useCallback } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import { useProjects, ProjectItem } from "@/src/context/ProjectsContext";
import { FloatingOrb } from "@/src/components/portfolio/FloatingOrb";
import { BackgroundShapes } from "@/src/components/portfolio/BackgroundShapes";
import { PortfolioHeader } from "@/src/components/portfolio/PortfolioHeader";
import { ProjectCard } from "@/src/components/portfolio/ProjectCard";
import { ProjectModal } from "@/src/components/portfolio/ProjectModal";
import { LightboxModal } from "@/src/components/portfolio/LightboxModal";
import "@/src/components/portfolio/portfolio-animations.css";

export function Portfolio() {
  const { language } = useLanguage();
  const { projects } = useProjects();

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Keep selectedProject state updated if projects state changes
  const activeProject = selectedProject
    ? projects.find((p) => p.id === selectedProject.id) || selectedProject
    : null;

  const handleProjectSelect = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
  }, []);

  const handleProjectClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleLightboxSelect = useCallback((imageUrl: string) => {
    setActiveLightboxImage(imageUrl);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setActiveLightboxImage(null);
  }, []);

  return (
    <section
      id="portfolio"
      className="relative py-24 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-900 via-black to-slate-900 overflow-hidden"
    >
      {/* Floating Orbs */}
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

      {/* Central warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ea580c]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Background shapes */}
      <BackgroundShapes />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <PortfolioHeader language={language as "en" | "id"} />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              language={language as "en" | "id"}
              onSelect={handleProjectSelect}
            />
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {activeProject && (
            <ProjectModal
              project={activeProject}
              language={language as "en" | "id"}
              onLightboxSelect={handleLightboxSelect}
              onClose={handleProjectClose}
            />
          )}
        </AnimatePresence>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxImage && (
            <LightboxModal
              imageUrl={activeLightboxImage}
              onClose={handleLightboxClose}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}