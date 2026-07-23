interface VideoGalleryProps {
  videos: string[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <div
            key={idx}
            className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-[9/16] relative flex flex-col items-center justify-center group shadow-lg"
          >
            <video
              controls
              autoPlay
              muted
              playsInline
              loop
              preload="lazy"
              className="w-full h-full object-cover rounded-xl"
              aria-label={`Video ${idx + 1}`}
            >
              <source src={video} type="video/mp4" />
              <source src={video.toLowerCase()} type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}