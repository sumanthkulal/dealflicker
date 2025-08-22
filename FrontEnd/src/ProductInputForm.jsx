import React, { useState } from 'react';
import { Plus, X, Package, DollarSign, Star, MessageSquare, Image, Tag, List, ExternalLink, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProductInputForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    rating: '',
    reviews: '',
    image: '',
    category: '',
    platform: '', // New state for platform
    features: [''],
    amazonLink: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const categories = ['electronics', 'home', 'fitness'];
  const platforms = ['amazon', 'flipkart', 'ebay', 'best buy']; // New list for platforms

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        const trimmedName = value.trim();
        if (!trimmedName) {
          newErrors.name = 'Product name is required';
        } else if (trimmedName.length < 3) {
          newErrors.name = 'Product name must be at least 3 characters long';
        } else {
          delete newErrors.name;
        }
        break;

      case 'price':
        if (!value) {
          newErrors.price = 'Price is required';
        } else if (isNaN(value) || parseFloat(value) < 0) {
          newErrors.price = 'Price must be a number greater than or equal to 0';
        } else {
          delete newErrors.price;
        }
        break;

      case 'originalPrice':
        if (value && (isNaN(value) || parseFloat(value) < 0)) {
          newErrors.originalPrice = 'Original price must be a number greater than or equal to 0';
        } else {
          delete newErrors.originalPrice;
        }
        break;

      case 'rating':
        if (value && (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 5)) {
          newErrors.rating = 'Rating must be a number between 0 and 5';
        } else {
          delete newErrors.rating;
        }
        break;

      case 'reviews':
        if (value && (isNaN(value) || parseInt(value) < 0)) {
          newErrors.reviews = 'Reviews must be a number greater than or equal to 0';
        } else {
          delete newErrors.reviews;
        }
        break;

      case 'image':
        if (!value.trim()) {
          newErrors.image = 'Image URL is required';
        } else {
          delete newErrors.image;
        }
        break;

      case 'category':
        if (!value) {
          newErrors.category = 'Category is required';
        } else {
          delete newErrors.category;
        }
        break;

      case 'platform':
        if (!value) {
          newErrors.platform = 'Platform is required';
        } else {
          delete newErrors.platform;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    setProduct(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setProduct(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    if (product.features.length > 1) {
      const newFeatures = product.features.filter((_, i) => i !== index);
      setProduct(prev => ({ ...prev, features: newFeatures }));
    }
  };

  const handleSubmit = () => {
    
    // Validate all fields, including the new 'platform' field
    Object.keys(product).forEach(key => {
      if (key !== 'features') {
        validateField(key, product[key]);
      }
    });

    // Check if there are any errors
    const hasErrors = Object.keys(errors).length > 0;
    
    if (!hasErrors) {
      // Process the form data with trimming and formatting
      const processedProduct = {
        name: product.name.trim(),
        price: parseFloat(product.price),
        originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : undefined,
        rating: product.rating ? parseFloat(product.rating) : undefined,
        reviews: product.reviews ? parseInt(product.reviews) : undefined,
        image: product.image.trim(),
        category: product.category.toLowerCase().trim(),
        platform: product.platform.toLowerCase().trim(), // Process the new platform field
        features: product.features.map(f => f.trim()).filter(f => f.length > 0),
        amazonLink: product.amazonLink ? product.amazonLink.trim() : undefined
      };

      console.log('Processed Product Data:', processedProduct);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setProduct({
          name: '',
          price: '',
          originalPrice: '',
          rating: '',
          reviews: '',
          image: '',
          category: '',
          platform: '',
          features: [''],
          amazonLink: ''
        });
        setErrors({}); // Also reset errors on success
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Added Successfully!</h2>
          <p className="text-gray-600">Your product has been processed and saved.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Package className="w-8 h-8" />
              Add New Product
            </h1>
            <p className="text-indigo-100">Enter product details below</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag className="w-4 h-4" />
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                }`}
                placeholder="Enter product name (min 3 characters)"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Price Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <DollarSign className="w-4 h-4" />
                  Current Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.price ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <DollarSign className="w-4 h-4" />
                  Original Price
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={product.originalPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.originalPrice ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                  }`}
                  placeholder="0.00 (optional)"
                />
                {errors.originalPrice && <p className="text-red-500 text-sm">{errors.originalPrice}</p>}
              </div>
            </div>

            {/* Rating and Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Star className="w-4 h-4" />
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={product.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.rating ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                  }`}
                  placeholder="0.0 (optional)"
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MessageSquare className="w-4 h-4" />
                  Number of Reviews
                </label>
                <input
                  type="number"
                  name="reviews"
                  value={product.reviews}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.reviews ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                  }`}
                  placeholder="0 (optional)"
                />
                {errors.reviews && <p className="text-red-500 text-sm">{errors.reviews}</p>}
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Image className="w-4 h-4" />
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.image ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            {/* Category and Platform */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Tag className="w-4 h-4" />
                  Category *
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.category ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>

              {/* Platform */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Globe className="w-4 h-4" />
                  Platform *
                </label>
                <select
                  name="platform"
                  value={product.platform}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.platform ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                  }`}
                >
                  <option value="">Select a platform</option>
                  {platforms.map(plat => (
                    <option key={plat} value={plat}>
                      {plat.charAt(0).toUpperCase() + plat.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.platform && <p className="text-red-500 text-sm">{errors.platform}</p>}
              </div>
            </div>

            {/* Features */}
{/*             <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <List className="w-4 h-4" />
                Product Features
              </label>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200"
                      placeholder={`Feature ${index + 1}`}
                    />
                    {product.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>
            </div> */}

            {/* Amazon Link */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ExternalLink className="w-4 h-4" />
                Amazon Link
              </label>
              <input
                type="url"
                name="amazonLink"
                value={product.amazonLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200"
                placeholder="https://amazon.com/product-link (optional)"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInputForm;