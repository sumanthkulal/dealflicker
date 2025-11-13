import React from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));
};

// Add the 'hideReviews' prop with a default value of false
const ProductCard = ({ product, toggleFavorite, favorites, hideReviews = false }) => {
  const navigate = useNavigate();
  
  // FIX: Use product._id to check if this specific item is in favorites
  const isFavorite = favorites.includes(product._id); 

  const handleViewDetails = () => {
    // Using product._id for routing details
    navigate(`/product/${product._id}`); 
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.badge}
          </span>
        </div>
        <button
          // FIX: Pass product._id to the toggleFavorite function
          onClick={() => toggleFavorite(product._id)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "text-red-500 fill-current" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
       
        {/* Conditionally render the reviews section based on the new prop */}
        {!hideReviews && (
            <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-600">
                    ({product.reviews} reviews)
                </span>
            </div>
        )}

        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-base text-gray-500 line-through">
            ${product.originalPrice}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        </div>

        <button
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

//emails id updated