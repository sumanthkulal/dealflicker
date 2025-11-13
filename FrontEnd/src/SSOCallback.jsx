// SSOCallback.jsx
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

const SSOCallback = () => {
  // This Clerk component reads the necessary URL parameters 
  // and completes the session and redirect to the home page (/).
  return <AuthenticateWithRedirectCallback />;
};

export default SSOCallback;