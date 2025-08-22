import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import UserSignup from './components/UserSignup';
import ProductInputForm from './ProductInputForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/ProductInputForm" element={<ProductInputForm />} />
      </Routes>
    </Router>
  );
};

export default App;