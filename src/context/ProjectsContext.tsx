import React, { createContext, useContext, useState, useEffect } from "react";
import { projects as staticProjects } from "@/src/data/projects";
import galleryMap from "@/src/data/gallery-map.json";
import { get, set, del } from "idb-keyval";

export interface ProjectItem {
  id: number;
  title: { id: string; en: string };
  category: string;
  description: { id: string; en: string };
  image: string;
  videos?: string[];
  gallery?: string[];
  tags: string[];
  link?: string;
}

// Merge gallery map into default projects
const defaultProjects = staticProjects.map(project => {
  const mergedProject = { ...project };
  const projectGallery = new Set(mergedProject.gallery || []);
  
  // Try to find matching folder in galleryMap
  const titleEn = project.title.en.toLowerCase();
  const titleId = project.title.id.toLowerCase();
  const category = project.category.toLowerCase();
  
  for (const [folderName, images] of Object.entries(galleryMap as Record<string, string[]>)) {
    const lowerFolder = folderName.toLowerCase();
    if (lowerFolder === titleEn || lowerFolder === titleId || lowerFolder === category) {
      // Add these images
      images.forEach(img => projectGallery.add(img));
    }
  }
  
  mergedProject.gallery = Array.from(projectGallery);
  
  // Update thumbnails based on specific requirements
  if (mergedProject.id === 2) { // Graphic Design (2)
    mergedProject.image = "/graphic_design.png";
  } else if (mergedProject.id === 4) { // Personal Project (4)
    mergedProject.image = "/personal_project_thumbnail.png";
  } else if (mergedProject.id === 1) { // Produksi Video & Animasi 3D
    mergedProject.image = "/video_thumbnail.png";
  }
  
  return mergedProject;
});

interface ProjectsContextType {
  projects: ProjectItem[];
  addPhotoToProject: (projectId: number, photoUrl: string, isCover?: boolean) => void;
  addPhotosToProject: (projectId: number, photoUrls: string[], isCover?: boolean) => void;
  removePhotoFromProject: (projectId: number, photoUrl: string) => void;
  clearProjectPhotos: (projectId: number) => void;
  addProject: (newProject: Omit<ProjectItem, "id">) => void;
  resetToDefault: () => void;
  storageError: string | null;
  isLoading: boolean;
}

const STORAGE_KEY = "portfolio_projects_data_v13"; // updated version for idb

// Clean up old localstorage keys to free space
try {
  localStorage.removeItem("portfolio_projects_data_v1");
  localStorage.removeItem("portfolio_projects_data_v2");
  localStorage.removeItem("portfolio_projects_data_v3");
  localStorage.removeItem("portfolio_projects_data_v4");
  localStorage.removeItem("portfolio_projects_data_v5");
  localStorage.removeItem("portfolio_projects_data_v6");
  localStorage.removeItem("portfolio_projects_data_v7");
} catch (e) {
  // Ignore
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storageError, setStorageError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [isLoading, setIsLoading] = useState(true);

  // Load from IndexedDB on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await get(STORAGE_KEY);
        if (saved && Array.isArray(saved) && saved.length > 0) {
          setProjects(saved);
        }
      } catch (e) {
        console.error("Failed to load projects from IndexedDB", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save to IndexedDB whenever projects change (skip initial load)
  useEffect(() => {
    if (isLoading) return;
    
    const saveData = async () => {
      try {
        await set(STORAGE_KEY, projects);
        setStorageError(null);
      } catch (e: any) {
        console.warn("IndexedDB write error", e);
        setStorageError("Gagal menyimpan data ke penyimpanan lokal browser. Beberapa foto mungkin tidak tersimpan permanen.");
      }
    };
    saveData();
  }, [projects, isLoading]);

  const addPhotosToProject = (projectId: number, photoUrls: string[], isCover: boolean = false) => {
    if (!photoUrls || photoUrls.length === 0) return;
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const currentGallery = p.gallery || [];
          const newGallery = [...currentGallery, ...photoUrls];
          if (isCover && photoUrls.length > 0) {
            return {
              ...p,
              image: photoUrls[0],
              gallery: newGallery
            };
          } else {
            return {
              ...p,
              gallery: newGallery
            };
          }
        }
        return p;
      })
    );
  };

  const addPhotoToProject = (projectId: number, photoUrl: string, isCover: boolean = false) => {
    addPhotosToProject(projectId, [photoUrl], isCover);
  };

  const removePhotoFromProject = (projectId: number, photoUrl: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedGallery = (p.gallery || []).filter(img => img !== photoUrl);
          return {
            ...p,
            gallery: updatedGallery
          };
        }
        return p;
      })
    );
  };

  const clearProjectPhotos = (projectId: number) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            gallery: []
          };
        }
        return p;
      })
    );
  };

  const addProject = (newProjectData: Omit<ProjectItem, "id">) => {
    const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProj: ProjectItem = {
      ...newProjectData,
      id: nextId
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const resetToDefault = async () => {
    setProjects(defaultProjects);
    try {
      await del(STORAGE_KEY);
    } catch (e) {
      // Ignore
    }
    setStorageError(null);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addPhotoToProject,
        addPhotosToProject,
        removePhotoFromProject,
        clearProjectPhotos,
        addProject,
        resetToDefault,
        storageError,
        isLoading
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
