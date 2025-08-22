import React, { useState } from 'react';
import { Shield, X, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    adminId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to admin dashboard after successful login
      navigate('/admin-dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Admin Login</h2>
                <p className="text-white/80 text-sm">Administrator access</p>
              </div>
            </div>
            <Link to="/" className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              <X className="w-6 h-6" />
            </Link>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin ID
              </label>
              <input
                type="text"
                name="adminId"
                value={formData.adminId}
                onChange={handleInputChange}
                placeholder="Enter admin ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-purple-900">Security Notice</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    This is a secure admin portal. All login attempts are logged and monitored for security purposes.
                  </p>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                'Admin Login'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <Link to="/admin-support" className="text-purple-600 hover:text-purple-800 font-medium">
                Contact admin support
              </Link>
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Admin Access Requirements</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Valid admin credentials</li>
              <li>• Two-factor authentication enabled</li>
              <li>• IP address verification</li>
              <li>• Session timeout after 30 minutes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;




