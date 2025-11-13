import { SignIn } from '@clerk/clerk-react';

const UserLogin = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <SignIn 
        routing="path" 
        path="/user-login" 
        fallbackRedirectUrl="/" // ✅ Updated prop
      />
    </div>
  );
};
export default UserLogin;