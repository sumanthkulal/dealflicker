import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About DealFinder Pro</h2>
            <p className="text-lg text-gray-700 mb-6">
              We're passionate about helping consumers make informed purchasing decisions. Our team of experts 
              rigorously tests and reviews products to bring you honest, detailed insights.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Since 2020, we've helped millions of shoppers find the best deals on Amazon, saving them both 
              time and money. We believe in transparency, which is why we clearly mark our affiliate relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">1000+</div>
                <div className="text-gray-600">Products Reviewed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$5M+</div>
                <div className="text-gray-600">Money Saved</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-lg opacity-90">To be your most trusted source for honest and expert product recommendations, helping you shop smarter and save more.</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&fit=crop"
              alt="Our team working"
              className="rounded-2xl shadow-xl mt-6 transform rotate-2 hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;