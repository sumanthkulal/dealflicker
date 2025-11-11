// src/pages/ProfilePage.js

import React from 'react';
import { useUser, UserButton, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Mail, User, Briefcase, Camera } from 'lucide-react';
import { Link } from 'react-router-dom'; // Required for any internal links

// --- Profile Details Component (The professional view) ---
const ProfileContent = ({ user }) => {
  // Extract user details securely
  const primaryEmail = user.primaryEmailAddress 
                       ? user.primaryEmailAddress.emailAddress 
                       : 'Not available';
  
  // Example of accessing custom data (Role)
  const userRole = user.publicMetadata?.role || 'Basic User'; 

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full">
      
      {/* Profile Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 h-40 flex items-center justify-center">
        <div className="absolute top-4 right-4">
          <UserButton afterSignOutUrl="/" /> 
        </div>
        <div className="relative -bottom-16 w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200">
          <img 
            src={user.imageUrl} 
            alt={`${user.fullName}'s profile`} 
            className="w-full h-full object-cover rounded-full" 
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
            <Camera className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="pt-20 pb-8 px-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {user.fullName || "User Name"}
        </h1>
        <p className="text-md text-gray-600 mb-6">
          <span className="inline-flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-500" /> <span>{primaryEmail}</span>
          </span>
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
          {/* Detail Card: Clerk User ID */}
          <div className="bg-blue-50 p-4 rounded-xl shadow-sm flex items-center space-x-3">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">Clerk ID</p>
              <p className="text-lg font-semibold text-blue-800 break-all">{user.id}</p>
            </div>
          </div>
          {/* Detail Card: Role */}
          <div className="bg-purple-50 p-4 rounded-xl shadow-sm flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="text-lg font-semibold text-purple-800">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component (Handles Authentication and Loading) ---
const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    // Show loading screen while session check is underway
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <SignedIn>
        {/* If signed in, render the profile details */}
        <ProfileContent user={user} />
      </SignedIn>
      
      <SignedOut>
        {/* If NOT signed in, automatically redirect to the login page */}
        <RedirectToSignIn redirectUrl="/profile" /> 
      </SignedOut>
    </div>
  );
};

export default ProfilePage;