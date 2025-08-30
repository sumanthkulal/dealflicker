import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronDown, User, LogIn, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginDropdownOpen && !event.target.closest('.login-dropdown')) {
        setLoginDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [loginDropdownOpen]);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DealFinder Pro
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Products
            </button>
           <Link to="/product-input-form" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Create Listing
          </Link>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </button>
            
            {/* Login Dropdown */}
            <div className="relative login-dropdown">
              <button 
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${loginDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {loginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Login</h3>
                    <Link
                      to="/user-login"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">User Login</div>
                        <div className="text-xs text-gray-500">Access your account</div>
                      </div>
                    </Link>
                    <Link
                      to="/admin-login"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200 flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Admin Login</div>
                        <div className="text-xs text-gray-500">Administrator access</div>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Sign Up</h3>
                    <Link
                      to="/user-signup"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200 flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">User Signup</div>
                        <div className="text-xs text-gray-500">Create new account</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('products')} className="text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                Products
              </button>
              <button onClick={() => scrollToSection('reviews')} className="text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                Reviews
              </button>
              <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
                Contact
              </button>
              
              {/* Mobile Login Options */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="text-sm font-medium text-gray-500 mb-3">Login Options</div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Login</div>
                  <Link to="/user-login" onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-all flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>User Login</span>
                  </Link>
                  <Link to="/admin-login" onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-gray-700 hover:text-purple-600 font-medium py-2 px-3 rounded-lg hover:bg-purple-50 transition-all flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>Admin Login</span>
                  </Link>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Sign Up</div>
                  <Link to="/user-signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-gray-700 hover:text-green-600 font-medium py-2 px-3 rounded-lg hover:bg-green-50 transition-all flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <span>User Signup</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;