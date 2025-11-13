import { SignUp } from '@clerk/clerk-react';

const UserSignup = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <SignUp 
        routing="path" 
        path="/user-signup" 
        fallbackRedirectUrl="/" // ✅ Updated prop
      />
    </div>
  );
};
export default UserSignup;