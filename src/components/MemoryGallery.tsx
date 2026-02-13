import { useState } from "react";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const captions = [
  "A moment I'll never forget", "You & me, always", "My favorite smile",
  "This day was magic", "Forever grateful", "Our little adventure",
  "Can we go back here?", "You looked perfect", "My happy place",
  "The best surprise ever", "Heart full of love", "Just us two",
  "Dancing in the rain", "Sunday mornings", "Late night talks",
  "Your laugh, my medicine", "Partners in crime", "Golden hour glow",
  "Coffee & cuddles", "My forever person", "Lost in your eyes",
  "Chasing sunsets", "Our secret spot", "Pure happiness",
  "Weekend vibes", "Love at first sight", "Starry nights",
  "Beach days", "Road trip memories", "Home is you",
  "Pillow fights", "Kitchen disasters", "Movie marathons",
  "Matching outfits", "First snow together", "Garden picnics",
  "Lazy afternoons", "City lights", "Mountain tops",
  "Morning coffee", "Midnight snacks", "Your sleepy face",
  "Dancing together", "Holding hands", "Forehead kisses",
  "Bear hugs", "Silly selfies", "Deep conversations",
  "Building dreams", "Growing together", "Our song playing",
  "Candlelit dinners", "Park bench talks", "Rainy day in",
  "Your favorite meal", "Surprise flowers", "Love letters",
  "Phone calls at 2am", "Airport reunions", "Matching mugs",
  "Shared playlists", "Inside jokes", "Comfortable silence",
  "Warm blankets", "Hot chocolate", "Window shopping",
  "Farmer's market", "Cooking together", "Binge watching",
  "Game nights", "Puzzle pieces", "Art museums",
  "Bookstore dates", "Ice cream runs", "Stargazing",
  "Cloud watching", "Bike rides", "Train journeys",
  "Festival fun", "Holiday magic", "Birthday wishes",
  "New Year's kiss", "Anniversary love", "Everyday magic",
  "You are my home", "To infinity", "Our forever story",
  "The best chapter", "Grateful for you", "Love wins",
];

const heights = [300, 350, 400, 250, 380, 320, 280, 360, 340, 420];

const images = Array.from({ length: 89 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/memory${i + 1}/400/${heights[i % heights.length]}`,
  caption: captions[i % captions.length],
}));

export const MemoryGallery = () => {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

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
    <>
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="break-inside-avoid mb-4 group cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <div className="bg-[#FFFDD0] p-3 pb-4 rounded-xl shadow-soft hover:shadow-strong hover:scale-105 transition-all duration-300 relative">
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full rounded-lg object-cover"
              />
              <button
                onClick={(e) => toggleLike(e, img.id)}
                className="absolute bottom-12 right-5 z-10 transition-transform hover:scale-125"
                aria-label={likedIds.has(img.id) ? "Unlike" : "Like"}
              >
                <Heart
                  className={`w-6 h-6 drop-shadow-md transition-colors ${
                    likedIds.has(img.id)
                      ? "text-red-500 fill-red-500"
                      : "text-white/80 hover:text-red-400"
                  }`}
                  fill={likedIds.has(img.id) ? "currentColor" : "none"}
                />
              </button>
              <p className="font-dancing text-center text-sm mt-2 text-foreground/70">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-2 bg-background/80 backdrop-blur-xl border-none">
          <DialogTitle className="sr-only">Memory photo</DialogTitle>
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="w-full rounded-lg object-contain max-h-[85vh]"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
