// UpdateProductForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X, Package, DollarSign, Star, MessageSquare, Image, Tag, List, ExternalLink, Globe, HardDrive, Youtube } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UpdateProductForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Access the product data and the 'from' path from the location state
    const product = location.state?.product;
    const fromPath = location.state?.from || '/';

    const [formData, setFormData] = useState({
        _id: product?._id || '',
        name: product?.name || '',
        price: product?.price?.toString() || '',
        originalPrice: product?.originalPrice?.toString() || '',
        rating: product?.rating?.toString() || '',
        reviews: product?.reviews?.toString() || '',
        image: product?.image || '',
        brand: product?.brand || '',
        category: product?.category || '',
        platform: product?.platform || '',
        features: product?.features?.length > 0 ? [...product.features] : [''],
        amazonLink: product?.amazonLink || '',
        youtubeLink: product?.youtubeLink || ''
    });

    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState({ success: false, message: null });

    // The key correction is in this useEffect hook
    // It checks if product data exists and only redirects if it's missing,
    // which prevents the infinite loop and allows the form to render.
    useEffect(() => {
        if (!product) {
            navigate('/');
        }
    }, [product, navigate]);

    const [categorie, setCategories] = useState([]);
    
    
           useEffect(() => {
        fetch("http://localhost:5000/api/categories")
          .then((res) => res.json())
          .then((data) => setCategories(data))
          .catch((err) => console.error("Error fetching categories:", err));
      }, []);
    
      const categories = categorie;

    // const categories = ['electronics', 'home', 'fitness'];
    const platforms = ['amazon', 'flipkart', 'ebay', 'best buy'];

    const validateField = (name, value) => {
        let error = null;
        switch (name) {
            case 'name':
                const trimmedName = value.trim();
                if (!trimmedName) { error = 'Product name is required'; }
                else if (trimmedName.length < 3) { error = 'Product name must be at least 3 characters long'; }
                break;
            case 'price':
                if (!value) { error = 'Price is required'; }
                else if (isNaN(value) || parseFloat(value) < 0) { error = 'Price must be a number greater than or equal to 0'; }
                break;
            case 'originalPrice':
                if (value && (isNaN(value) || parseFloat(value) < 0)) { error = 'Original price must be a number greater than or equal to 0'; }
                break;
            case 'rating':
                if (value && (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 5)) { error = 'Rating must be a number between 0 and 5'; }
                break;
            case 'reviews':
                if (value && (isNaN(value) || parseInt(value, 10) < 0)) { error = 'Reviews must be a number greater than or equal to 0'; }
                break;
            case 'image':
                if (!value.trim()) { error = 'Image URL is required'; }
                break;
            case 'category':
                if (!value) { error = 'Category is required'; }
                break;
            case 'platform':
                if (!value) { error = 'Platform is required'; }
                break;
            case 'amazonLink':
                if (!value.trim()) { error = 'Amazon Link is required'; }
                break;
            default:
                break;
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        if (formData.features.length > 1) {
            const newFeatures = formData.features.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, features: newFeatures }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus({ success: false, message: null });

        const newErrors = {};

        const requiredFields = ['name', 'price', 'image', 'category', 'platform', 'amazonLink'];
        requiredFields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        const optionalFields = ['originalPrice', 'rating', 'reviews', 'brand'];
        optionalFields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            let iframeLink = undefined;
            if (formData.youtubeLink) {
                try {
                    const youtubeUrl = new URL(formData.youtubeLink);
                    let videoId = null;

                    if (youtubeUrl.hostname === 'www.youtube.com' || youtubeUrl.hostname === 'youtube.com') {
                        const searchParams = new URLSearchParams(youtubeUrl.search);
                        videoId = searchParams.get('v');
                    } else if (youtubeUrl.hostname === 'youtu.be') {
                        videoId = youtubeUrl.pathname.substring(1);
                    }

                    if (videoId) {
                        iframeLink = `https://www.youtube.com/embed/${videoId}`;
                    }
                } catch (e) {
                    console.error("Invalid YouTube URL:", e);
                }
            }

            const processedProduct = {
                name: formData.name.trim(),
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
                rating: formData.rating ? parseFloat(formData.rating) : undefined,
                reviews: formData.reviews ? parseInt(formData.reviews, 10) : undefined,
                image: formData.image.trim(),
                brand: formData.brand.trim() || undefined,
                category: formData.category.toLowerCase().trim(),
                platform: formData.platform.toLowerCase().trim(),
                features: formData.features.map(f => f.trim()).filter(f => f.length > 0),
                amazonLink: formData.amazonLink.trim(),
                youtubeLink: iframeLink
            };
            console.log(fromPath)
            try {
                const response = await axios.put(`http://localhost:5000/api/products/${formData._id}`, processedProduct);
                console.log('Product updated successfully:', response.data);

                setSubmissionStatus({ success: true, message: 'Product updated successfully!' });

                setTimeout(() => {
                    navigate(fromPath);
                }, 2000);

            } catch (err) {
                console.error('API call error:', err);
                setSubmissionStatus({ success: false, message: 'Failed to update product. Please try again.' });
                if (err.response && err.response.data && err.response.data.message) {
                    setSubmissionStatus({ success: false, message: `Error: ${err.response.data.message}` });
                }
                navigate(fromPath);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
            <div className="max-w-4xl mx-auto overflow-hidden">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                            <Package className="w-8 h-8" />
                            Update Product
                        </h1>
                        <p className="text-indigo-100">Edit the product details below</p>
                    </div>

                    <div className="p-8 space-y-6">
                        {submissionStatus.message && (
                            <div className={`p-4 rounded-lg text-center font-semibold ${
                                submissionStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {submissionStatus.message}
                            </div>
                        )}

                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Tag className="w-4 h-4" />
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
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
                                    value={formData.price}
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
                                    value={formData.originalPrice}
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
                                    value={formData.rating}
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
                                    value={formData.reviews}
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

                        {/* Image URL and Brand Name - side by side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Image className="w-4 h-4" />
                                    Image URL *
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                        errors.image ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                                    }`}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <HardDrive className="w-4 h-4" />
                                    Brand Name
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                        errors.brand ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                                    }`}
                                    placeholder="e.g., Apple, Samsung (optional)"
                                />
                                {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
                            </div>
                        </div>

                        {/* Category and Platform */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Tag className="w-4 h-4" />
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
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

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Globe className="w-4 h-4" />
                                    Platform *
                                </label>
                                <select
                                    name="platform"
                                    value={formData.platform}
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

                        {/* Amazon Link and YouTube Link */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <ExternalLink className="w-4 h-4" />
                                    Amazon Link *
                                </label>
                                <input
                                    type="url"
                                    name="amazonLink"
                                    value={formData.amazonLink}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                        errors.amazonLink ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
                                    }`}
                                    placeholder="https://amazon.com/product-link"
                                />
                                {errors.amazonLink && <p className="text-red-500 text-sm">{errors.amazonLink}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Youtube className="w-4 h-4" />
                                    YouTube Link
                                </label>
                                <input
                                    type="url"
                                    name="youtubeLink"
                                    value={formData.youtubeLink}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-200 focus:border-indigo-300`}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <List className="w-4 h-4" />
                                Product Features
                            </label>
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200"
                                        placeholder={`Feature ${index + 1}`}
                                    />
                                    {formData.features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addFeature}
                                className="mt-2 text-indigo-600 flex items-center gap-1 hover:text-indigo-800 transition-colors duration-200"
                            >
                                <Plus className="w-4 h-4" />
                                Add another feature
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Update Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductForm;