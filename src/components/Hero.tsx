import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowRight, Zap, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Tu próxima obsesión te está esperando",
      subtitle: "Donde los mundos cobran vida",
      description: "Descubre universos infinitos, desde épicas batallas ninja hasta romances galácticos",
      cta: "Comenzar mi Aventura",
      badge: "Otaku Zone",
      rating: 4.9,
      features: ["Portal a otros mundos", "Colecciones épicas", "Comunidad geek"],
      theme: "anime",
      bgClass: "bg-gradient-manga"
    },
    {
      title: "Donde los héroes cobran vida",
      subtitle: "Universos épicos en cada página",
      description: "Desde Gotham hasta el multiverso Marvel, cada comic es un portal a la grandeza",
      cta: "Unirse a los Héroes",
      badge: "Hero Zone",
      rating: 4.8,
      features: ["Poder ilimitado", "Ediciones legendarias", "Exclusivos de colección"],
      theme: "comic",
      bgClass: "bg-gradient-comic"
    },
    {
      title: "Cada página es un portal",
      subtitle: "Literatura que trasciende realidades",
      description: "Desde clásicos inmortales hasta nuevos mundos por descubrir",
      cta: "Abrir el Portal",
      badge: "Mystic Library",
      rating: 4.9,
      features: ["Sabiduría infinita", "Clásicos inmortales", "Aventuras épicas"],
      theme: "book",
      bgClass: "bg-gradient-book"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className={`relative overflow-hidden ${slide.bgClass || 'bg-gradient-hero'} min-h-[600px] flex items-center`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        {slide.theme === 'anime' && (
          <>
            <div className="floating absolute top-20 right-20 w-4 h-4 bg-primary-accent rounded-full opacity-60"></div>
            <div className="floating absolute top-32 left-32 w-2 h-2 bg-manga-purple rounded-full opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="floating absolute bottom-40 right-20 w-3 h-3 bg-primary-accent rounded-full opacity-50" style={{ animationDelay: '2s' }}></div>
          </>
        )}
        {slide.theme === 'comic' && (
          <>
            <div className="absolute top-32 left-32 text-6xl opacity-10 font-comic text-comic-blue transform rotate-12">POW!</div>
            <div className="absolute bottom-32 right-32 text-4xl opacity-15 font-comic text-primary-accent transform -rotate-12">BAM!</div>
          </>
        )}
        {slide.theme === 'book' && (
          <>
            <div className="absolute bottom-20 right-40 text-4xl opacity-15 font-book text-sage-green">✦</div>
            <div className="absolute top-40 left-20 text-3xl opacity-10 font-book text-primary-accent">☽</div>
            <div className="absolute top-20 right-1/3 text-2xl opacity-20 font-book text-sage-green">✧</div>
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium glow-pulse ${
                slide.theme === 'anime' ? 'bg-manga-purple text-white font-manga' :
                slide.theme === 'comic' ? 'bg-comic-blue text-white font-comic' :
                'bg-sage-green text-white font-book'
              }`}>
                {slide.badge}
              </span>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(slide.rating) ? 'text-secondary fill-secondary' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-primary-foreground ml-1">{slide.rating}</span>
              </div>
            </div>

            <h1 className={`text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight ${
              slide.theme === 'anime' ? 'font-manga' :
              slide.theme === 'comic' ? 'font-comic' :
              'font-hero'
            }`}>
              {slide.title}
            </h1>
            
            <h2 className={`text-xl lg:text-2xl text-primary-foreground/90 font-medium ${
              slide.theme === 'anime' ? 'font-manga' :
              slide.theme === 'comic' ? 'font-comic' :
              'font-book'
            }`}>
              {slide.subtitle}
            </h2>
            
            <p className="text-lg text-primary-foreground/80 max-w-lg leading-relaxed font-ui">
              {slide.description}
            </p>

            <Button size="lg" className={`font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105 hover-glow ${
              slide.theme === 'anime' ? 'bg-manga-purple hover:bg-manga-purple/90 text-white font-manga' :
              slide.theme === 'comic' ? 'bg-comic-blue hover:bg-comic-blue/90 text-white font-comic text-lg' :
              'bg-sage-green hover:bg-sage-green/90 text-white font-book'
            }`}>
              {slide.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {slide.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-primary-foreground/90">
                  <div className="bg-white/20 rounded-full p-1">
                    {index === 0 && <Zap className="h-4 w-4" />}
                    {index === 1 && <Heart className="h-4 w-4" />}
                    {index === 2 && <BookOpen className="h-4 w-4" />}
                  </div>
                  <span className="text-sm font-medium font-ui">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="hidden lg:flex justify-center items-center">
            <div className={`relative w-80 h-80 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center ${
              slide.theme === 'anime' ? 'manga-float' :
              slide.theme === 'comic' ? 'comic-zoom' :
              'book-tilt'
            }`}>
              <div className={`text-8xl ${
                slide.theme === 'anime' ? 'font-manga' :
                slide.theme === 'comic' ? 'font-comic' :
                'font-book'
              } text-white/30`}>
                {slide.theme === 'anime' ? '漫' :
                 slide.theme === 'comic' ? '⚡' :
                 '📚'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full p-3 hover-glow"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full p-3 hover-glow"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentSlide ? 'bg-white glow-pulse' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Indicators - Geek Culture */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div className="font-ui">
              <div className="text-2xl font-bold font-hero">50K+</div>
              <div className="text-xs opacity-80">Universos disponibles</div>
            </div>
            <div className="font-ui">
              <div className="text-2xl font-bold font-hero">15K+</div>
              <div className="text-xs opacity-80">Otakus satisfechos</div>
            </div>
            <div className="font-ui">
              <div className="text-2xl font-bold font-hero">24h</div>
              <div className="text-xs opacity-80">Entrega express</div>
            </div>
            <div className="font-ui">
              <div className="text-2xl font-bold font-hero">4.9★</div>
              <div className="text-xs opacity-80">Nivel épico</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;