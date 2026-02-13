import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // You can replace this with your own music URL or file
  const musicUrl = "/Dave-feat-Tems-Raindance-(CeeNaija.com).mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2">
      <Button onClick={togglePlay} size="icon" variant="secondary" className="rounded-full shadow-glow animate-pulse-glow">
        <Music className={`w-5 h-5 ${isPlaying ? "animate-pulse" : ""}`} />
      </Button>
      <Button onClick={toggleMute} size="icon" variant="secondary" className="rounded-full shadow-glow">
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </Button>
      <audio ref={audioRef} loop src={musicUrl} />
    </div>
  );
};
