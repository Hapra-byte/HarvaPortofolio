import { AnimatePresence } from "motion/react";
import { useState, useCallback, useMemo } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import { useProjects, ProjectItem } from "@/src/context/ProjectsContext";
import { FloatingOrb } from "@/src/components/portfolio/FloatingOrb";
import { BackgroundShapes } from "@/src/components/portfolio/BackgroundShapes";
import { PortfolioHeader } from "@/src/components/portfolio/PortfolioHeader";
import { EnhancedProjectCard } from "@/src/components/portfolio/EnhancedProjectCard";
import { ProjectModal } from "@/src/components/portfolio/ProjectModal";
import { LightboxModal } from "@/src/components/portfolio/LightboxModal";
import { FilterTabs } from "@/src/components/portfolio/FilterTabs";
import { useProjectFilter } from "@/src/hooks/useProjectFilter";
import "@/src/components/portfolio/portfolio-animations.css";

export function Portfolio() {
  const { language } = useLanguage();
  const { projects } = useProjects();
  const { activeFilter, updateFilter } = useProjectFilter();

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Keep selectedProject state updated if projects state changes
  const activeProject = selectedProject
    ? projects.find((p) => p.id === selectedProject.id) || selectedProject
    : null;

  // Get unique categories
  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))],
    [projects]
  );

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

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
      className="relative py-32 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Floating Orbs */}
      <FloatingOrb
        delay={0}
        size={600}
        x="10%"
        y="20%"
        color="radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)"
      />
      <FloatingOrb
        delay={2}
        size={500}
        x="60%"
        y="10%"
        color="radial-gradient(circle, rgba(168, 85, 247, 0.07) 0%, transparent 70%)"
      />
      <FloatingOrb
        delay={4}
        size={400}
        x="75%"
        y="60%"
        color="radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)"
      />
      <FloatingOrb
        delay={1}
        size={350}
        x="20%"
        y="70%"
        color="radial-gradient(circle, rgba(251, 191, 36, 0.06) 0%, transparent 70%)"
      />

      {/* Central glow with color shift */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Background shapes */}
      <BackgroundShapes />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <PortfolioHeader language={language as "en" | "id"} />

        {/* Filter Tabs */}
        <FilterTabs
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={updateFilter}
          language={language as "en" | "id"}
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <EnhancedProjectCard
                key={project.id}
                project={project}
                index={index}
                language={language as "en" | "id"}
                onSelect={handleProjectSelect}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">
              {language === "en"
                ? "No projects found in this category"
                : "Tidak ada proyek di kategori ini"}
            </p>
          </div>
        )}

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
