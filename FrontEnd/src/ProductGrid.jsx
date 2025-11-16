import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from './ProductCard';
import './index.css';

// Clerk auth
import { useAuth } from '@clerk/clerk-react';

const ProductGrid = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Clerk token + user info
    const { getToken, userId } = useAuth();
    const categoriesRef = useRef(null);

    // ---------------------------------------------------------------------
    // 1. Fetch all products
    // ---------------------------------------------------------------------
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) throw new Error('Failed to load products');

                const data = await response.json();
                setProducts(data.products);
                setCategories(data.categories);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ---------------------------------------------------------------------
    // 2. Fetch favorites if user is logged in
    // ---------------------------------------------------------------------
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) {
                setFavorites([]);
                return;
            }

            try {
                const token = await getToken();
                const response = await fetch('http://localhost:5000/api/user-favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFavorites(data.favoriteIds);
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            }
        };

        fetchFavorites();
    }, [userId, getToken]);

    if (loading || !products || !categories) {
        return <div className="text-center py-16">Loading products...</div>;
    }

    // Filter + sort
    const filteredAndSortedProducts = products
        .sort((a, b) => b._id.localeCompare(a._id))
        .filter(p => {
            const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .slice(0, 8);

    // ---------------------------------------------------------------------
    // 3. Toggle favorite
    // ---------------------------------------------------------------------
    const toggleFavorite = async (productId) => {
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
            } else {
                console.error("Server denied like request. Status:", response.status);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    // Scroll functions
    const scrollLeft = () => categoriesRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    const scrollRight = () => categoriesRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

    return (
        <section id="products" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                    <p className="text-xl text-gray-600">Handpicked deals and top-rated items</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    
                    <div className="relative flex-1 md:flex-[0.6]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-hidden md:flex-1">
                        <button onClick={scrollLeft} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 hidden md:block">
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        <div ref={categoriesRef} className="flex gap-2 overflow-x-auto no-scrollbar">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setCurrentCategory(category)}
                                    className={`px-6 py-3 rounded-lg whitespace-nowrap font-medium ${
                                        currentCategory === category
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>

                        <button onClick={scrollRight} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 hidden md:block">
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {filteredAndSortedProducts.length > 0 ? (
                        filteredAndSortedProducts.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                toggleFavorite={toggleFavorite}
                                favorites={favorites}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600">No products found.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;