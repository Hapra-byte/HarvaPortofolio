import React, { useRef, useState } from 'react';
import JSZip from 'jszip';
import { useProjects } from '@/src/context/ProjectsContext';
import { Upload, Loader2, FileArchive } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';

export const ZipUploader: React.FC = () => {
  const { projects, addPhotosToProject } = useProjects();
  const { language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string>("auto");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processZip = async (file: File) => {
    setIsProcessing(true);
    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      
      const newPhotosByProject: Record<number, string[]> = {};
      let totalExtracted = 0;
      
      // Iterate over all files in the zip
      for (const [relativePath, zipEntry] of Object.entries(contents.files)) {
        if (zipEntry.dir) continue;
        
        const lowerPath = relativePath.toLowerCase();
        const zipFileName = file.name.toLowerCase();
        if (!lowerPath.match(/\.(jpg|jpeg|png|webp|gif)$/)) continue;
        
        // Convert to base64 data URL
        const base64Data = await zipEntry.async("base64");
        
        // Determine mime type
        let mime = "image/jpeg";
        if (lowerPath.endsWith(".png")) mime = "image/png";
        else if (lowerPath.endsWith(".webp")) mime = "image/webp";
        else if (lowerPath.endsWith(".gif")) mime = "image/gif";
        
        const dataUrl = `data:${mime};base64,${base64Data}`;
        
        let matchedProjectId: number | null = null;
        
        if (selectedSectionId !== "auto") {
          matchedProjectId = parseInt(selectedSectionId);
        } else {
          // Find which project this belongs to
          // Look at folder name or file name or zip file name
          for (const project of projects) {
            const titleEn = project.title.en.toLowerCase();
            const titleId = project.title.id.toLowerCase();
            const category = project.category.toLowerCase();
            
            if (lowerPath.includes(titleEn) || lowerPath.includes(titleId) || lowerPath.includes(category) || zipFileName.includes(titleEn) || zipFileName.includes(titleId) || zipFileName.includes(category)) {
              matchedProjectId = project.id;
              break;
            }
          }
        }
        
        if (matchedProjectId) {
          if (!newPhotosByProject[matchedProjectId]) {
            newPhotosByProject[matchedProjectId] = [];
          }
          newPhotosByProject[matchedProjectId].push(dataUrl);
          totalExtracted++;
        }
      }
      
      // Add photos to the respective projects
      for (const [projectId, dataUrls] of Object.entries(newPhotosByProject)) {
        addPhotosToProject(parseInt(projectId), dataUrls);
      }
      
      if (totalExtracted > 0) {
        alert(language === 'en' ? `Successfully extracted and added ${totalExtracted} photos from the ZIP!` : `Berhasil mengekstrak dan menambahkan ${totalExtracted} foto dari ZIP!`);
      } else {
        alert(language === 'en' ? `No photos were added. Make sure the folders or files inside the ZIP are named after your sections, or select a specific section.` : `Tidak ada foto yang ditambahkan. Pastikan folder atau file dinamai sesuai section, atau pilih section spesifik.`);
      }
      
    } catch (error) {
      console.error("Error processing zip:", error);
      alert(language === 'en' ? "Error processing ZIP file. Please try again." : "Terjadi kesalahan saat memproses file ZIP. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processZip(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 mb-8 mt-4">
      <div className="flex items-center gap-3 text-slate-300 flex-1">
        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 hidden sm:block">
          <FileArchive className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold">{language === 'en' ? 'Upload Multiple Photos (ZIP)' : 'Unggah Banyak Foto (ZIP)'}</h4>
          <p className="text-xs text-slate-500 hidden sm:block">{language === 'en' ? 'Upload a ZIP containing photos.' : 'Unggah file ZIP berisi foto.'}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        <select
          value={selectedSectionId}
          onChange={(e) => setSelectedSectionId(e.target.value)}
          className="w-full sm:w-auto bg-slate-950 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          disabled={isProcessing}
        >
          <option value="auto">{language === 'en' ? 'Auto-detect section' : 'Deteksi otomatis dari nama'}</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>
              {language === 'en' ? 'Add to: ' : 'Tambah ke: '} {p.title[language] || p.title.id}
            </option>
          ))}
        </select>
        
        <input
          type="file"
          ref={fileInputRef}
          accept=".zip,application/zip"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => fileInputRef.current?.click()}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-lg shadow-indigo-900/20 text-sm whitespace-nowrap"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{language === 'en' ? (isProcessing ? 'Processing ZIP...' : 'Upload ZIP File') : (isProcessing ? 'Memproses ZIP...' : 'Unggah File ZIP')}</span>
        </button>
      </div>
    </div>
  );
};
