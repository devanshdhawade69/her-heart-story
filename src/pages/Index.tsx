import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Heart className="w-16 h-16 mx-auto mb-6 text-primary animate-float" />
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 text-foreground">
            To My Love
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Every moment with you is a treasure. Here's a journey through some of our most beautiful memories together.
          </p>
        </div>
      </section>

      {/* Memories Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-32">
          {/* Memory 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <div className="bg-gradient-card rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105">
                <img 
                  src={memory1} 
                  alt="Our first picnic" 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Our First Picnic
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Remember that perfect day in the park? The sun was shining, the breeze was gentle, and time seemed to stand still. We laughed, we talked, and I knew right then that every moment with you would be special.
              </p>
            </div>
          </div>

          {/* Memory 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in order-2 md:order-1" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Sunset by the Beach
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Watching the sunset with you, feeling the sand beneath our feet and hearing the waves... It was pure magic. The sky painted in pink and purple, just like the colors of our love story.
              </p>
            </div>
            <div className="animate-fade-in order-1 md:order-2" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              <div className="bg-gradient-card rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105">
                <img 
                  src={memory2} 
                  alt="Beach sunset" 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Memory 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
              <div className="bg-gradient-card rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105">
                <img 
                  src={memory3} 
                  alt="Coffee dates" 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Our Cozy Coffee Dates
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From our first coffee date to all the countless cups we've shared since, each one has been filled with laughter, deep conversations, and the warmth of being with you. You're my favorite person to share everything with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Message */}
      <section className="py-32 px-4 bg-gradient-romantic">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
            <Heart className="w-20 h-20 mx-auto mb-8 text-primary animate-float" />
            <h2 className="font-playfair text-5xl md:text-7xl font-bold mb-8 text-foreground">
              Happy Birthday, My Love!
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-foreground leading-relaxed">
              <p>
                Today is your special day, and I want you to know just how much you mean to me. You've brought so much joy, laughter, and love into my life.
              </p>
              <p>
                Every day with you is a gift, and I'm grateful for every moment we share. Your smile brightens my darkest days, your laugh is my favorite sound, and your love is my greatest treasure.
              </p>
              <p className="font-playfair text-2xl md:text-3xl font-bold pt-6">
                Here's to another year of adventures, memories, and endless love together. I love you more than words can express. ❤️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <p className="text-muted-foreground">
          Made with <Heart className="inline w-5 h-5 text-primary" /> for the most amazing person
        </p>
      </footer>
    </div>
  );
};

export default Index;
