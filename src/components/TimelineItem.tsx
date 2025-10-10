import { Card, CardContent } from "@/components/ui/card";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  image: string;
  isLeft?: boolean;
}

export const TimelineItem = ({ date, title, description, image, isLeft = false }: TimelineItemProps) => {
  return (
    <div className={`flex items-center gap-8 mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}>
      {/* Timeline dot */}
      <div className="relative flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-primary animate-pulse-glow" />
        <div className="absolute top-6 left-1/2 w-0.5 h-24 bg-gradient-to-b from-primary to-transparent -translate-x-1/2" />
      </div>

      {/* Content card */}
      <Card className="flex-1 bg-gradient-card shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 animate-fade-in">
        <CardContent className="p-6">
          <div className={`grid md:grid-cols-2 gap-6 items-center ${isLeft ? 'md:grid-flow-dense' : ''}`}>
            <div className={isLeft ? 'md:col-start-2' : ''}>
              <p className="text-sm text-primary font-medium mb-2">{date}</p>
              <h3 className="font-playfair text-2xl font-bold mb-3 text-foreground">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
            <div className={isLeft ? 'md:col-start-1 md:row-start-1' : ''}>
              <div className="rounded-2xl overflow-hidden shadow-soft">
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
