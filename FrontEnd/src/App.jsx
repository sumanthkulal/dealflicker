import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react'; // 🚨 IMPORT CLERK AUTH
import HomePage from './Home';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import UserSignup from './components/UserSignup';
import ProductInputForm from './ProductInputForm';
import ProductPage from './ProductList';
import ProductLandingPage from './videoPage';
import Test from './Test';
import UpdateProductForm from './UpdateProductForm';
import ProfilePage from './ProfilePage';
import SSOCallback from './SSOCallback';
import VerifyEmail from './verifyEmail'

const App = () => {
  // 1. Shared state for products
  const [products, setProducts] = useState([]);
  
  // 🚨 2. LIFTED STATE: Centralized favorites state
  const [favorites, setFavorites] = useState([]);
  
  // 🚨 3. CLERK AUTH TOOLS
  const { getToken, userId } = useAuth();

  // 4. Function to add a new product (remains the same)
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  
  // --- FAVORITES FETCHING LOGIC (LIFTED FROM ProductGrid.js) ---
  useEffect(() => {
    const fetchFavorites = async () => {
      // Clear or skip if user is logged out
      if (!userId) {
        setFavorites([]);
        return;
      }
      try {
        const token = await getToken(); 
        const response = await fetch('http://localhost:5000/api/user-favorites', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favoriteIds);
        }
      } catch (error) {
        console.error("Failed to fetch user favorites:", error);
      }
    };
    fetchFavorites();
  }, [userId, getToken]); // Reruns on login/logout/refresh

  // --- TOGGLE FAVORITE LOGIC (LIFTED FROM ProductGrid.js) ---
  const toggleFavorite = async (productId) => {
    if (!userId) return; // Should be handled in ProductCard, but good to check

    const token = await getToken();
    
    try {
      const response = await fetch('http://localhost:5000/api/toggle-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        // Update local state based on API response
        setFavorites(prev =>
          prev.includes(productId) 
            ? prev.filter(id => id !== productId) // Remove (Unlike)
            : [...prev, productId]                  // Add (Like)
        );
      } else {
          console.error("Server denied like request. Status:", response.status);
      }
    } catch (error) {
      console.error("Network error during like:", error);
    }
  };
  // -----------------------------------------------------------------

  const commonProps = { favorites, toggleFavorite };

  return (
    <Router>
      <Routes>
        {/* PASS COMMON PROPS TO ALL PRODUCT-AWARE COMPONENTS */}
        <Route 
          path="/" 
          element={<HomePage products={products} {...commonProps} />} 
        />

        {/* --- Auth Routes --- */}
        <Route path="/user-login/*" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route 
          path="/user-signup/sso-callback" 
          element={<SSOCallback />} 
        />

        {/* --- Product Management Routes --- */}
        <Route
          path="/product-input-form"
          element={<ProductInputForm onProductAdd={handleAddProduct} />}
        />
        <Route 
          path="/all-products" 
          element={<ProductPage {...commonProps} />} 
        />

        {/* Updated route to handle dynamic product ID */}
        <Route 
          path="/product/:id" 
          element={<ProductLandingPage {...commonProps} />} 
        />

        {/* New route for updating a specific product */}
        <Route path="/product/:id/edit" element={<UpdateProductForm />} />

        {/* --- Other Routes --- */}
        <Route path="/profile" element={<ProfilePage {...commonProps} />} />
        <Route path="/test" element={<Test />} />
        <Route path="/user-signup/verify-email-address" element={<VerifyEmail/>} />
        
      </Routes>
    </Router>
  );
};

export default App;