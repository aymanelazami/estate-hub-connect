
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage: string;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  className,
}: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setLoaded(true);
  }, [backgroundImage]);

  return (
    <div
      className={cn(
        'relative min-h-[500px] md:min-h-[600px] flex items-center justify-center',
        className
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
          loaded ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-up">
            {title}
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Button size="lg" asChild>
              <Link to={ctaLink} className="flex items-center gap-2">
                {ctaText}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            {secondaryCtaText && secondaryCtaLink && (
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                <Link to={secondaryCtaLink}>
                  {secondaryCtaText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
