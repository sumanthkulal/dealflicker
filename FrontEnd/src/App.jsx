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
        {/* ✅ Pass products to HomePage for display */}
        <Route path="/" element={<HomePage products={products} />} />

        {/* Auth Routes */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />

        {/* ✅ Pass add function to ProductInputForm */}
        <Route
          path="/product-input-form"
          element={<ProductInputForm onProductAdd={handleAddProduct} />}
        />

        {/* Other Routes */}
        <Route path="/all-products" element={<ProductPage />} />
        <Route path="/product-video" element={<ProductLandingPage />} />

        {/* ✅ Test page will now receive product via navigation state */}
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
