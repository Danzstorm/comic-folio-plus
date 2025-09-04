import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Descubre Mundos Infinitos",
      subtitle: "Los mejores libros, comics y mangas están aquí",
      description: "Explora nuestra colección curada de historias que cambiarán tu perspectiva del mundo.",
      cta: "Explorar Novedades",
      badge: "Nuevo",
      image: "bg-gradient-hero",
      features: ["Envío gratis +€35", "Devoluciones 30 días", "Atención 24/7"]
    },
    {
      id: 2,
      title: "Ofertas Especiales",
      subtitle: "Hasta 50% de descuento en bestsellers",
      description: "No te pierdas nuestras ofertas limitadas en los títulos más populares del momento.",
      cta: "Ver Ofertas",
      badge: "Oferta",
      image: "bg-gradient-secondary",
      features: ["Miles de títulos", "Precios imbatibles", "Stock limitado"]
    },
    {
      id: 3,
      title: "Colección Premium",
      subtitle: "Ediciones especiales y exclusivas",
      description: "Encuentra ediciones únicas, libros firmados y contenido exclusivo para verdaderos coleccionistas.",
      cta: "Ver Exclusivos",
      badge: "Exclusivo",
      image: "bg-gradient-primary",
      features: ["Ediciones limitadas", "Contenido exclusivo", "Para coleccionistas"]
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

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden">
      <div className={`${currentHero.image} transition-all duration-1000 ease-in-out`}>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <Badge className={`px-3 py-1 text-sm font-semibold ${
                currentHero.badge === 'Nuevo' ? 'badge-new' :
                currentHero.badge === 'Oferta' ? 'badge-sale' : 'badge-bestseller'
              }`}>
                {currentHero.badge}
              </Badge>
              <div className="flex items-center gap-1 text-secondary">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium text-white/90 ml-2">4.9/5 • 15,000+ reseñas</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {currentHero.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
              {currentHero.subtitle}
            </p>
            
            <p className="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
              {currentHero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 text-lg font-semibold transition-bounce">
                {currentHero.cta}
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
                Ver Catálogo Completo
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentHero.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/90">
                  <div className="bg-white/20 rounded-full p-1">
                    {index === 0 && <TrendingUp className="h-4 w-4" />}
                    {index === 1 && <Star className="h-4 w-4" />}
                    {index === 2 && <Zap className="h-4 w-4" />}
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full p-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full p-2"
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
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Productos disponibles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">15K+</div>
              <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Envío express</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Valoración media</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;