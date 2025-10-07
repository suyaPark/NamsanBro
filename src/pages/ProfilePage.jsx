import React from 'react';
import { useApp } from '../context/AppContext';

const ProfilePage = () => {
  const { user, setCurrentView, setAuthMode } = useApp();
  
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Please sign in to access your profile.
          </p>
          <button 
            onClick={() => {
              setAuthMode('login');
              setCurrentView('auth');
            }}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-10">Profile</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="text-gray-900">{user.email}</div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <div className="text-gray-900">{user.firstName || '-'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <div className="text-gray-900">{user.lastName || '-'}</div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <div className="text-gray-900">{user.phone || '-'}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <div className="text-gray-900">{user.address || '-'}</div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <div className="text-gray-900">{user.city || '-'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
            <div className="text-gray-900">{user.province || '-'}</div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
          <div className="text-gray-900">{user.postalCode || '-'}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <div className="text-gray-900">{user.company || '-'}</div>
        </div>
        {user.userType === 'seller' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Registration</label>
            <div className="text-gray-900">{user.businessRegistration || '-'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;