import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import ProductGrid from './ProductGrid'; // This component needs the state
import Testimonials from './Testimonials';
import About from './About';
import Footer from './Footer';
import Social from './Social';


// 🚨 1. RECEIVE THE LIFTED STATE/FUNCTIONS AS PROPS
const HomePage = ({ products, favorites, toggleFavorite }) => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Features />
      
      {/* 🚨 2. PASS THE RECEIVED PROPS DOWN TO ProductGrid 🚨 */}
      <ProductGrid 
            products={products} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
        />
        
      {/* <Testimonials /> */}
      <About />
      <Social/>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default HomePage;