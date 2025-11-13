import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import SSOCallback from './SSOCallback'; // 👈 1. IMPORT THE NEW FILE

// ----------------------------------------------------
// REMOVED: The placeholder SSOCallbackHandler function is no longer needed.
// ----------------------------------------------------

const App = () => {
  // 1. Shared state for products
  const [products, setProducts] = useState([]);

  // 2. Function to add a new product
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <Routes>
        {/* Pass products to HomePage for display */}
        <Route path="/" element={<HomePage products={products} />} />

        {/* --- Auth Routes --- */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        
        {/* ✅ FINAL FIX: Use the dedicated Clerk component for SSO redirect */}
        <Route 
          path="/user-signup/sso-callback" 
          element={<SSOCallback />} // 👈 3. USE THE IMPORTED COMPONENT
        />

        {/* --- Product Management Routes --- */}
        {/* Pass add function to ProductInputForm */}
        <Route
          path="/product-input-form"
          element={<ProductInputForm onProductAdd={handleAddProduct} />}
        />
        <Route path="/all-products" element={<ProductPage />} />

        {/* Updated route to handle dynamic product ID */}
        <Route path="/product/:id" element={<ProductLandingPage />} />

        {/* New route for updating a specific product */}
        <Route path="/product/:id/edit" element={<UpdateProductForm />} />

        {/* --- Other Routes --- */}
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;