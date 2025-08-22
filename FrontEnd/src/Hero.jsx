import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Hero = ({ scrollToSection }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Find the Best Deals",
      subtitle: "Discover top-rated products with honest reviews and exclusive Amazon deals. We help you make informed purchasing decisions.",
      buttonText: "Explore Products",
      background: "from-blue-600/20 to-purple-600/20",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Save Time & Money",
      subtitle: "Skip the research and get straight to the best products. Our expert-curated lists save you hours of comparison shopping.",
      buttonText: "Shop Smart",
      background: "from-green-600/20 to-blue-600/20",
      gradient: "from-green-600 to-blue-600"
    },
    {
      id: 3,
      title: "Verified by Experts",
      subtitle: "Every product is thoroughly tested and reviewed by our team of experts. Trust our recommendations for your next purchase.",
      buttonText: "See Reviews",
      background: "from-purple-600/20 to-pink-600/20",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  // Auto-advance slides
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

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide Container */}
        <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-3xl">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.background}`}></div>
              <div className="relative h-full flex items-center justify-center text-center">
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i}>
                        {i === slide.title.split(' ').length - 1 ? (
                          <span className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                            {word}
                          </span>
                        ) : (
                          word + ' '
                        )}
                      </span>
                    ))}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <button 
                    onClick={() => scrollToSection('products')}
                    className={`bg-gradient-to-r ${slide.gradient} text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    {slide.buttonText} <ChevronRight className="inline w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;