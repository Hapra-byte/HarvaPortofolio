import { Maximize2 } from "lucide-react";

interface PhotoGalleryProps {
  photos: string[];
  language: "en" | "id";
  onPhotoSelect: (imageUrl: string) => void;
  isCompact?: boolean;
}

export function PhotoGallery({
  photos,
  language,
  onPhotoSelect,
  isCompact = false,
}: PhotoGalleryProps) {
  if (isCompact) {
    return (
      <div className="pt-6 border-t border-slate-800">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          {language === "en" ? "Photos in this section" : "Foto di bagian ini"} (
          {photos.length})
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((imgUrl, idx) => (
            <div
              key={idx}
              className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-square cursor-pointer"
              onClick={() => onPhotoSelect(imgUrl)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onPhotoSelect(imgUrl);
                }
              }}
              aria-label={`View photo ${idx + 1}`}
            >
              <img
                src={imgUrl}
                alt={`Photo ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {language === "en" ? "Photo Gallery" : "Galeri Foto"} ({photos.length})
          </span>
        </div>
        <span className="text-xs text-indigo-400 font-medium hidden sm:inline">
          {language === "en" ? "Click photo to view" : "Klik foto untuk memperbesar"}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((imgUrl, idx) => (
          <div
            key={idx}
            className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-square hover:border-indigo-500/60 transition-all duration-300 cursor-pointer"
            onClick={() => onPhotoSelect(imgUrl)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onPhotoSelect(imgUrl);
              }
            }}
            aria-label={`View photo ${idx + 1}`}
          >
            <img
              src={imgUrl}
              alt={`Photo ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPhotoSelect(imgUrl);
                }}
                className="p-2.5 bg-indigo-600 rounded-full text-white shadow-lg pointer-events-auto hover:bg-indigo-500 transition-colors"
                aria-label="Zoom photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}