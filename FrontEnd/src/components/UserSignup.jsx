import { SignUp } from '@clerk/clerk-react';

const UserSignup = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      {/* Renders Clerk's default UI. The 'appearance' prop is removed. */}
      <SignUp 
        routing="path" 
        path="/user-signup" 
        afterSignUpUrl="/dashboard" // Redirect after success
      />
    </div>
  );
};
export default UserSignup;