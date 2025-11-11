import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

// 1. Retrieve the Publishable Key from the environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// 2. Safety check: ensure the key is present
if (!PUBLISHABLE_KEY) {
  // Use a standard error approach
  throw new Error('Missing Publishable Key for Clerk. Please check your .env file and environment configuration.');
}

// 3. Get the root element and create the React root
const container = document.getElementById('root');
const root = createRoot(container);

// 4. Render the application, wrapping App with ClerkProvider
root.render(
  <StrictMode>
    {/* Use the correct prop name: publishableKey */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>
);