import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Footer = ({ scrollToSection }) => {
  return (
    <footer id="contact" className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DealFinder Pro
              </h4>
            </div>
            <p className="text-sm">Your trusted source for finding the best deals and honest reviews on Amazon.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-lg font-semibold text-white">Quick Links</h5>
            <ul className="space-y-1">
              <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">Products</button></li>
              <li><button onClick={() => scrollToSection('reviews')} className="hover:text-white transition-colors">Reviews</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-lg font-semibold text-white">Categories</h5>
            <ul className="space-y-1">
              <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">Electronics</button></li>
              <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">Home & Kitchen</button></li>
              <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">Health & Fitness</button></li>
              <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">Fashion</button></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Contact Us</h5>
            <p className="text-sm">Email: support@dealfinderpro.com</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
            <p className="text-sm">Address: 123 Affiliate St, Suite 400, Tech City, USA</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          &copy; 2025 DealFinder Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;