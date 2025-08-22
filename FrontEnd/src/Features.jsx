import React from 'react';
import { Award, Shield, Truck, Users } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Expert Verified</h3>
            <p className="text-gray-600">Thoroughly tested and verified by our product experts with years of experience</p>
          </div>
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast Shipping</h3>
            <p className="text-gray-600">Lightning-fast delivery through Amazon Prime with same-day and next-day options</p>
          </div>
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Verified Deals</h3>
            <p className="text-gray-600">Only authentic Amazon deals and discounts, verified daily for accuracy</p>
          </div>
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Community Driven</h3>
            <p className="text-gray-600">Real feedback from thousands of verified customers and community members</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;