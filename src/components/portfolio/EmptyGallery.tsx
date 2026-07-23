interface EmptyGalleryProps {
  image: string;
  title: string;
  language: "en" | "id";
}

export function EmptyGallery({ image, title, language }: EmptyGalleryProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-950/60 rounded-xl border border-slate-800 p-8 text-center min-h-[300px]">
      <img
        src={image}
        alt={title}
        className="max-h-64 w-auto object-contain rounded-lg mb-6 border border-slate-800 shadow-md opacity-80"
        loading="lazy"
      />
      <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold uppercase tracking-wider">
        {language === "en"
          ? "No Photos in This Section Yet"
          : "Belum Ada Foto di Bagian Ini"}
      </div>
    </div>
  );
}