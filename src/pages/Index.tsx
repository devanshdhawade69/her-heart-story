import { useEffect, useState, useRef } from "react";
import { Heart, ArrowDown, Sparkles, Calendar, Music as MusicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingHearts } from "@/components/FloatingHearts";
import { MusicPlayer } from "@/components/MusicPlayer";
import { TypingEffect } from "@/components/TypingEffect";
import { TimelineItem } from "@/components/TimelineItem";
import heroImage from "@/assets/hero-image.jpg";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import timeline1 from "@/assets/timeline-1.jpg";
import timeline2 from "@/assets/timeline-2.jpg";
import timeline3 from "@/assets/timeline-3.jpg";
import timeline4 from "@/assets/timeline-4.jpg";
import valentineFinale from "@/assets/valentine-finale.jpg";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const letterRef = useRef<HTMLDivElement>(null);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShowContent(true), 1000);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === letterRef.current) {
            setShowLetter(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const heartfeltLetter = `My Dearest Love,

As I sit here trying to put my feelings into words, I realize that no amount of code, no matter how elegant, could ever express what you mean to me. You've turned my world into something magical, something I never knew was possible.

Every moment with you feels like a gift. Your laugh is my favorite melody, your smile my favorite view, and your presence my favorite place to be. You've taught me what it means to truly love someone, not just with words, but with every beat of my heart.

On this special day, I want you to know that you are cherished beyond measure. You are my best friend, my adventure partner, my safe harbor, and my greatest love. Thank you for being exactly who you are, and for letting me be part of your beautiful life.

Here's to many more memories, many more laughs, and a lifetime of love together.

Forever yours,
With all my heart ❤️`;

  const timelineEvents = [
    {
      date: "The Beginning",
      title: "When Our Eyes First Met",
      description: "I remember this moment like it was yesterday. The world seemed to pause, and everything else faded away. That was the moment I knew my life was about to change forever.",
      image: timeline1,
    },
    {
      date: "Our First Date",
      title: "The Start of Something Beautiful",
      description: "Nervous smiles, endless conversations, and the realization that I never wanted the night to end. You made me feel like the luckiest person alive, and you still do every single day.",
      image: timeline2,
    },
    {
      date: "Our Adventure",
      title: "Exploring the World Together",
      description: "Every adventure with you is a new chapter in our story. Whether we're climbing mountains or just walking down the street, everything is better when I'm with you.",
      image: timeline3,
    },
    {
      date: "The Confession",
      title: "Three Words That Changed Everything",
      description: "Under the stars, with my heart racing, I told you how I felt. And when you said it back, I knew I had found my forever. That moment will always be etched in my heart.",
      image: timeline4,
    },
  ];

  const photoGallery = [
    {
      image: memory1,
      caption: "You looked so cute here I forgot how to breathe.",
    },
    {
      image: memory2,
      caption: "This day still plays in my mind like a movie.",
    },
    {
      image: memory3,
      caption: "Every coffee date with you feels like home.",
    },
  ];

  // Calculate days together (example date - replace with your actual date)
  const startDate = new Date("2023-01-01");
  const today = new Date();
  const daysTogether = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <FloatingHearts />
      <MusicPlayer />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {["hero", "timeline", "gallery", "letter", "finale"].map((section) => (
          <button key={section} onClick={() => scrollToSection(section)} className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section ? "bg-primary scale-150" : "bg-primary/30 hover:bg-primary/60"}`} aria-label={`Go to ${section}`} />
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 opacity-10">
          <img src={heroImage} alt="Hero background" className="w-full h-full object-cover" />
        </div>

        <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Heart className="w-20 h-20 mx-auto mb-8 text-primary animate-heart-beat" fill="currentColor" />
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-8 text-foreground">Hey Love...</h1>
          {showContent && (
            <div className="space-y-6 animate-fade-in">
              <p className="text-2xl md:text-3xl text-foreground/90 leading-relaxed">This isn't just a website...</p>
              <p className="text-3xl md:text-4xl font-playfair font-bold text-primary">It's our story ❤️</p>
              <p className="text-xl md:text-2xl text-muted-foreground mt-8">Happy Valentines to my favorite person in the universe</p>

              <div className="flex gap-4 justify-center items-center mt-12">
                <div className="text-center p-4 bg-white/50 backdrop-blur rounded-2xl">
                  <div className="text-3xl font-bold text-primary">{daysTogether}</div>
                  <div className="text-sm text-muted-foreground">Days Together</div>
                </div>
                <Heart className="text-primary animate-pulse" fill="currentColor" />
                <div className="text-center p-4 bg-white/50 backdrop-blur rounded-2xl">
                  <div className="text-3xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">Forever To Go</div>
                </div>
              </div>

              <Button onClick={() => scrollToSection("timeline")} size="lg" className="mt-12 rounded-full shadow-glow animate-pulse-glow">
                Begin Our Journey
                <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 px-4 relative z-10 bg-gradient-to-b from-transparent to-background/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary animate-twinkle" />
            <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-foreground">Our Love Story Timeline</h2>
            <p className="text-xl text-muted-foreground">Every moment that brought us here</p>
          </div>

          <div className="relative">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={index} {...event} isLeft={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-foreground">Moments Frozen in Time</h2>
            <p className="text-xl text-muted-foreground">Each photo tells a story of us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {photoGallery.map((photo, index) => (
              <Card key={index} className="group overflow-hidden bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-500 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.2}s`, animationFillMode: "both" }}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img src={photo.image} alt={`Memory ${index + 1}`} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <p className="text-white p-6 font-playfair text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.caption}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Letter Section */}
      <section id="letter" ref={letterRef} className="py-32 px-4 relative z-10 bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-primary">A Letter from the Heart</h2>
          </div>

          <Card className="bg-gradient-card shadow-strong p-8 md:p-12">
            <CardContent>
              {showLetter ? (
                <TypingEffect text={heartfeltLetter} delay={30} className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90 font-sans" />
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-primary animate-pulse" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Shared Music Section */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <MusicIcon className="w-12 h-12 mx-auto mb-6 text-primary animate-float" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Songs</h2>
          <p className="text-xl text-muted-foreground mb-12">The soundtrack to our love story</p>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-glow transition-all">
              <p className="text-lg text-muted-foreground mb-2">"This one reminds me of your sleepy voice in the morning"</p>
              <p className="text-sm text-primary">🎵 Replace with your special song</p>
            </Card>
            <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-glow transition-all">
              <p className="text-lg text-muted-foreground mb-2">"Play this when you miss me"</p>
              <p className="text-sm text-primary">🎵 Replace with your special song</p>
            </Card>
            <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-glow transition-all">
              <p className="text-lg text-muted-foreground mb-2">"Our song that started it all"</p>
              <p className="text-sm text-primary">🎵 Replace with your special song</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Valentines Finale */}
      <section id="finale" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={valentineFinale} alt="Birthday celebration" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            {/* Sparkling stars */}
            <div className="flex justify-center gap-4 mb-8">
              {[...Array(5)].map((_, i) => (
                <Sparkles key={i} className="w-8 h-8 text-accent animate-twinkle" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>

            <Heart className="w-24 h-24 mx-auto mb-8 text-primary animate-heart-beat" fill="currentColor" />

            <h2 className="font-playfair text-6xl md:text-8xl font-bold mb-8 text-foreground">Happy Valentines!</h2>

            <div className="space-y-6 text-xl md:text-2xl text-foreground/90 leading-relaxed mb-12">
              <p>Today is YOUR day, and I hope it's filled with as much joy as you bring into my life every single day.</p>
              <p>You deserve all the happiness in the world, all the love, all the magic.</p>
              <p className="font-playfair text-3xl md:text-4xl font-bold text-primary pt-6">Thank you for being you. I love you more than words can express. ❤️</p>
            </div>

            <div className="flex justify-center gap-4 mb-12">
              {[...Array(7)].map((_, i) => (
                <Heart key={i} className="w-6 h-6 text-primary animate-float" fill="currentColor" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>

            <Button size="lg" className="text-xl px-12 py-6 rounded-full shadow-glow animate-pulse-glow" onClick={() => scrollToSection("hero")}>
              Relive Our Story Again ❤️
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center relative z-10 bg-gradient-dark">
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          Made with <Heart className="w-5 h-5 text-primary animate-heart-beat" fill="currentColor" /> for the most amazing person
        </p>
        <p className="text-sm text-muted-foreground/60 mt-4">{new Date().getFullYear()} • Forever & Always</p>
      </footer>
    </div>
  );
};

export default Index;
