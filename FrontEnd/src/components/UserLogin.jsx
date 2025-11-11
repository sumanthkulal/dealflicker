import { SignIn } from '@clerk/clerk-react';

const UserLogin = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      {/* Renders Clerk's default UI. Note: The 'appearance' prop is removed. */}
      <SignIn 
        routing="path" 
        path="/user-login" 
        afterSignInUrl="/dashboard" // Redirect after success
      />
    </div>
  );
};
export default UserLogin;