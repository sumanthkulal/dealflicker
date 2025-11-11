import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import ProductGrid from './ProductGrid';
import Testimonials from './Testimonials';
import About from './About';
import Footer from './Footer'; // <-- Import the new Footer component
import Social from './Social';


const HomePage = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Features />
      <ProductGrid />
      {/* <Testimonials /> */}
      <About />
      <Social/>
      <Footer scrollToSection={scrollToSection} /> {/* <-- The new Footer component */}
    </div>
  );
};

export default HomePage;