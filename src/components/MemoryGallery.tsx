import { useState } from "react";
import { Heart } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const heights = [300, 350, 400, 250, 380, 320, 280, 360, 340, 420];

// Update this to match your actual file names in public/memories/
const images = Array.from({ length: 86 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    // Path points directly to the public folder root
    src: `/memories/photo-${id}.jpg`,
    caption: `Special Moment #${id}`,
  };
});

export const MemoryGallery = () => {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(null);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
        {images.map((img, index) => (
          <div key={img.id} className="break-inside-avoid mb-4 group cursor-pointer" onClick={() => setSelectedImage(img)}>
            {/* The "Polaroid" Container */}
            <div className="bg-[#FFFDD0] p-3 pb-6 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative border border-black/5">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  // Using the heights array to maintain that staggered masonry look
                  style={{ height: `${heights[index % heights.length]}px` }}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <button onClick={(e) => toggleLike(e, img.id)} className="absolute bottom-16 right-5 z-10 transition-transform hover:scale-125 active:scale-90">
                <Heart className={`w-6 h-6 drop-shadow-md ${likedIds.has(img.id) ? "text-red-500 fill-red-500" : "text-white/90"}`} />
              </button>

              <p className="font-dancing text-center text-lg mt-4 text-slate-700">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen View */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-1 bg-black/95 border-none flex items-center justify-center">
          <DialogTitle className="sr-only">Viewing {selectedImage?.caption}</DialogTitle>
          {selectedImage && <img src={selectedImage.src} alt={selectedImage.caption} className="max-w-full max-h-[90vh] rounded-md object-contain" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
