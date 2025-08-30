import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from './ProductCard'; // Import the new ProductCard component
import './index.css';

const ProductGrid = () => {
    // Initialize state with null to indicate that no data has been fetched yet
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
    
    const categoriesRef = useRef(null);

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products);
                setCategories(data.categories);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this runs only once on mount

    // Conditional rendering for loading state
    if (loading || !products || !categories) {
        return <div className="text-center py-16">Loading products...</div>;
    }

    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleFavorite = (productId) => {
        setFavorites(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const scrollLeft = () => {
        if (categoriesRef.current) {
            categoriesRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (categoriesRef.current) {
            categoriesRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <section id="products" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                    <p className="text-xl text-gray-600">Handpicked deals and top-rated items</p>
                </div> */}

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1 md:flex-[0.6]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-hidden md:flex-1">
                        <button
                            onClick={scrollLeft}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors hidden md:block"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        <div
                            ref={categoriesRef}
                            className="flex gap-2 overflow-x-auto md:flex-1 no-scrollbar"
                        >
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setCurrentCategory(category)}
                                    className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                                        currentCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={scrollRight}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors hidden md:block"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                toggleFavorite={toggleFavorite} 
                                favorites={favorites} 
                            />
                        ))
                    ) : (
                        <div className="text-center col-span-full text-gray-600">No products found.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;