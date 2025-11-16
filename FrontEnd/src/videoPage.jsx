import React, { useState, useEffect } from 'react';
import {
    Heart,
    Users,
    Eye,
    Share,
    ShoppingBag,
    MoreHorizontal,
    Play,
    Pencil,
    Trash2
} from 'lucide-react';
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductCard from './ProductCard';
import { useAuth } from '@clerk/clerk-react';

export default function ProductLandingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]); // store liked product IDs

    const { getToken, userId, isSignedIn } = useAuth();

    useEffect(() => {
        const fetchProductAndRelated = async () => {
            if (!id) {
                setError("No product ID found in URL.");
                setLoading(false);
                return;
            }

            try {
                // Fetch all products
                const allProductsResponse = await fetch(`http://localhost:5000/api/products`);
                if (!allProductsResponse.ok) throw new Error('Failed to fetch products');
                const allProductsData = await allProductsResponse.json();
                const allProducts = allProductsData.products;

                // Main product
                const mainProduct = allProducts.find(p => p._id === id);
                if (!mainProduct) throw new Error('Product not found');
                setProduct(mainProduct);

                // Related products
                const filteredRelated = allProducts.filter(
                    p => p.category === mainProduct.category && p._id !== mainProduct._id
                );
                setRelatedProducts(filteredRelated);

                // Fetch user favorites if signed in
                if (userId) {
                    const token = await getToken();
                    const response = await fetch(`http://localhost:5000/api/user-favorites`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setFavorites(data.favoriteIds);
                    }
                }

            } catch (err) {
                console.error(err);
                setError("Failed to load product. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductAndRelated();
    }, [id, userId, getToken]);

    // Toggle like/favorite for any product
    const toggleFavorite = async (productId) => {
        if (!isSignedIn) {
            alert("Please login to like products");
            return;
        }
        try {
            const token = await getToken();
            const response = await fetch('http://localhost:5000/api/toggle-like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ productId })
            });
            if (response.ok) {
                setFavorites(prev =>
                    prev.includes(productId)
                        ? prev.filter(id => id !== productId)
                        : [...prev, productId]
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        // 1. Fetch the authentication token
        const token = await getToken(); 
        
        try {
            const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
                method: 'DELETE',
                // 2. ADD the Authorization header to send the token
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });
            if (response.ok) {
                alert("Product deleted successfully!");
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete product. Please try again.");
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white"><p>Loading product...</p></div>;
    if (error) return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white"><p>Error: {error}</p></div>;
    if (!product) return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white"><p>No product data found.</p></div>;

    const videoData = {
        title: product.name,
        brandName: product.brand || "Brand",
        subscribers: "2.4M",
        views: "847K",
        likes: "12K",
        uploadTime: "2 days ago",
        description: product.description || "Product description",
        youtubeVideoId: product.youtubeLink || ""
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen pt-4 pl-8">
            <div className="flex gap-6">
                {/* Main video section */}
                <div className="flex flex-col gap-4">
                    <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20" style={{ width: '1050px', height: '540px' }}>
                        <iframe
                            className="w-full h-full"
                            src={product.youtubeLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="p-4" style={{ width: '1050px' }}>
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h1 className="text-xl font-bold mb-2 sm:mb-0">{product.name}</h1>
                                <div className="flex items-center text-gray-400 text-sm space-x-4">
                                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{videoData.views} views</span>
                                    <span>•</span>
                                    <span>{videoData.uploadTime}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center space-x-2 bg-gradient-to-r from-slate-800/50 to-purple-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                            {product.brand && product.brand.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm">{product.brand}</h3>
                                            <p className="text-gray-400 text-xs flex items-center gap-1"><Users className="w-3 h-3" />{videoData.subscribers} followers</p>
                                        </div>
                                    </div>
                                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25">Follow</button>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleFavorite(product._id)}
                                        className={`flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/20 rounded-full hover:bg-purple-700/50 transition-all duration-300 shadow-lg text-sm ${favorites.includes(product._id) ? 'text-red-400' : ''}`}
                                    >
                                        <Heart className="w-4 h-4" fill={favorites.includes(product._id) ? 'currentColor' : 'none'} stroke={favorites.includes(product._id) ? 'currentColor' : 'white'} />
                                        <span>{videoData.likes}</span>
                                    </button>

                                    <button className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/20 rounded-full hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 shadow-lg text-sm">
                                        <Share className="w-4 h-4" />
                                        <span className="hidden sm:inline">Share</span>
                                    </button>

                                    <a href={product.amazonLink} className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-sm">
                                        <ShoppingBag className="w-4 h-4" />
                                        <span className="hidden sm:inline">Buy Now</span>
                                    </a>

                                    <Link to={`/product/${id}/edit`} state={{ product, from: `/product/${id}` }} className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/20 rounded-full hover:from-indigo-700/50 hover:to-blue-700/50 transition-all duration-300 shadow-lg text-sm text-blue-400">
                                        <Pencil className="w-4 h-4" />
                                        <span className="hidden sm:inline">Edit</span>
                                    </Link>

                                    <button onClick={handleDelete} className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/20 rounded-full hover:from-red-700/50 hover:to-red-700/50 transition-all duration-300 shadow-lg text-sm text-red-400">
                                        <Trash2 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Delete</span>
                                    </button>

                                    <button className="p-1 bg-gradient-to-r from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/20 rounded-full hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 shadow-lg">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-slate-800/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/10 rounded-xl p-4">
                                <p className="text-gray-300 leading-relaxed">{videoData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Up Next Section */}
                <div className="flex-grow p-6 pt-4">
                    <h3 className="text-lg font-semibold mb-4">Up next</h3>
                    <div className="flex flex-col gap-4 overflow-y-auto pb-4 scrollbar-hide">
                        {relatedProducts.length > 0 ? (
                            relatedProducts.slice(0,2).map(rp => (
                                <ProductCard
                                    key={rp._id}
                                    product={rp}
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                    hideReviews={true}
                                />
                            ))
                        ) : (
                            <p className="text-gray-400">No related products found in this category.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">You might also like</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className="flex-shrink-0 w-80 bg-gradient-to-r from-slate-800/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/10 rounded-lg p-3 hover:from-purple-700/30 hover:to-pink-700/20 cursor-pointer transition-all duration-300">
                            <div className="w-full h-44 bg-gradient-to-br from-slate-700 to-purple-700/50 rounded flex items-center justify-center mb-3">
                                <Play className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm line-clamp-2 mb-2">Advanced JavaScript Concepts You Need to Know - Part {i}</h4>
                                <p className="text-gray-400 text-xs mb-1">CodeAcademy Pro</p>
                                <p className="text-gray-400 text-xs">234K views • 1 week ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}