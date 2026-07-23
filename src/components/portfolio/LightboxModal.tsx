import { motion } from "motion/react";
import { X } from "lucide-react";

interface LightboxModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function LightboxModal({ imageUrl, onClose }: LightboxModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-slate-800/90 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors z-10 shadow-xl"
        aria-label="Close lightbox"
        type="button"
      >
        <X className="w-6 h-6" />
      </button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-5xl max-h-[90vh] flex items-center justify-center p-2"
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged image view"
      >
        <img
          src={imageUrl}
          alt="Enlarged view"
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-slate-800"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
}