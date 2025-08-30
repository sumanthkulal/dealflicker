// ProductInputForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // ADDED: Import axios for API calls
import { Plus, X, Package, DollarSign, Star, MessageSquare, Image, Tag, List, ExternalLink, Globe, HardDrive, Clipboard, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Keep Link and useNavigate
import parseAmazonProductDetails from './ProductParser';

const ProductInputForm = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        originalPrice: '',
        rating: '',
        reviews: '',
        image: '',
        brand: '',
        category: '',
        platform: '',
        features: [''],
        amazonLink: '',
        youtubeLink: ''
    });

    const [rawText, setRawText] = useState('');
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState({ success: false, message: null }); // ADDED: State for submission feedback
    const navigate = useNavigate(); // Get the navigate function

    const categories = ['electronics', 'home', 'fitness'];
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
        setProduct(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
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

    const handleParse = () => {
        if (!rawText.trim()) {
            setErrors(prev => ({ ...prev, rawText: 'Please paste Amazon product details here.' }));
            return;
        }

        const parsedData = parseAmazonProductDetails(rawText);
        console.log('Parsed Data:', parsedData);

        setProduct(prev => ({
            ...prev,
            name: parsedData.product_name !== 'N/A' ? parsedData.product_name : prev.name,
            brand: parsedData.brand_name !== 'N/A' ? parsedData.brand_name : prev.brand,
            price: parsedData.current_price !== 'N/A' ? parsedData.current_price.toString() : prev.price,
            originalPrice: parsedData.mrp !== 'N/A' ? parsedData.mrp.toString() : prev.originalPrice,
            rating: parsedData.rating !== 'N/A' ? parsedData.rating.toString() : prev.rating,
            reviews: parsedData.ratings_count !== 'N/A' ? parsedData.ratings_count.toString() : prev.reviews,
            platform: 'amazon',
        }));

        setErrors(prev => ({ ...prev, rawText: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus({ success: false, message: null }); // Reset status

        const newErrors = {};

        const requiredFields = ['name', 'price', 'image', 'category', 'platform', 'amazonLink'];
        requiredFields.forEach(field => {
            const error = validateField(field, product[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        const optionalFields = ['originalPrice', 'rating', 'reviews', 'brand'];
        optionalFields.forEach(field => {
            const error = validateField(field, product[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const processedProduct = {
                name: product.name.trim(),
                price: parseFloat(product.price),
                originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : undefined,
                rating: product.rating ? parseFloat(product.rating) : undefined,
                reviews: product.reviews ? parseInt(product.reviews, 10) : undefined,
                image: product.image.trim(),
                brand: product.brand.trim() || undefined,
                category: product.category.toLowerCase().trim(),
                platform: product.platform.toLowerCase().trim(),
                features: product.features.map(f => f.trim()).filter(f => f.length > 0),
                amazonLink: product.amazonLink.trim(),
                youtubeLink: product.youtubeLink.trim() || undefined
            };

            try {
                // ADDED: API call to your Express backend
                const response = await axios.post('http://localhost:5000/api/products', processedProduct);
                console.log('Product added successfully:', response.data);
                
                setSubmissionStatus({ success: true, message: 'Product added successfully!' });
                
                // Reset form fields after successful submission
                setProduct({
                    name: '', price: '', originalPrice: '', rating: '', reviews: '',
                    image: '', brand: '', category: '', platform: '', features: [''],
                    amazonLink: '', youtubeLink: ''
                });
                setErrors({});
                setRawText('');

                // Redirect to the home page after a short delay
                setTimeout(() => {
                    navigate('/'); 
                }, 2000); 

            } catch (err) {
                console.error('API call error:', err);
                setSubmissionStatus({ success: false, message: 'Failed to add product. Please try again.' });
                // Check if the error has a response from the server with a specific message
                if (err.response && err.response.data && err.response.data.message) {
                    setSubmissionStatus({ success: false, message: `Error: ${err.response.data.message}` });
                }
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
                            Add New Product
                        </h1>
                        <p className="text-indigo-100">Enter product details below</p>
                    </div>

                    <div className="p-8 space-y-6">

                        {/* Submission Feedback Message */}
                        {submissionStatus.message && (
                            <div className={`p-4 rounded-lg text-center font-semibold ${
                                submissionStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {submissionStatus.message}
                            </div>
                        )}

                        {/* --- NEW: Text Input and Parse Section --- */}
                        <div className="space-y-4 p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                            <h2 className="text-xl font-bold text-indigo-800 flex items-center gap-2">
                                <Clipboard className="w-5 h-5" />
                                Paste & Parse from Amazon
                            </h2>
                            <p className="text-sm text-indigo-700">
                                Paste the raw text from an Amazon product page to automatically fill the form.
                            </p>
                            <textarea
                                value={rawText}
                                onChange={(e) => setRawText(e.target.value)}
                                rows="5"
                                className="w-full px-4 py-3 rounded-lg border-2 border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 transition-all duration-200"
                                placeholder="Paste the product title and details here..."
                            />
                            {errors.rawText && <p className="text-red-500 text-sm">{errors.rawText}</p>}
                            <button
                                type="button"
                                onClick={handleParse}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Parse Text
                            </button>
                        </div>
                        {/* --- END NEW SECTION --- */}

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
                                    value={product.image}
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
                                    value={product.brand}
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
                                    value={product.amazonLink}
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
                                    value={product.youtubeLink}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-200 focus:border-indigo-300`}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </div>
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