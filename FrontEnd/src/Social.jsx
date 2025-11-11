import React from 'react';
import whatsappIcon from "./assets/whatsapp-color.svg";
import instagramIcon from "./assets/instagram-1.svg";
import facebookIcon from "./assets/facebook-color.svg";

const Social = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          
          {/* WhatsApp */}
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 bg-white-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
              <img src={whatsappIcon} alt="WhatsApp" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">WhatsApp</h3>
            <p className="text-gray-600">Connect instantly and chat with us via WhatsApp support</p>
          </div>

          {/* Instagram */}
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
              <img src={instagramIcon} alt="Instagram" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Instagram</h3>
            <p className="text-gray-600">Follow us on Instagram for daily updates and exclusive content</p>
          </div>

          {/* Facebook */}
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 bg-white-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl">
              <img src={facebookIcon} alt="Facebook" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Facebook</h3>
            <p className="text-gray-600">Join our Facebook community and stay connected</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Social;
