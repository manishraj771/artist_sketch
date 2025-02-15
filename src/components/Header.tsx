import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Palette, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAdmin } from '../hooks/useAdmin';
import AuthModal from './auth/AuthModal';
import toast from 'react-hot-toast';

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      toast.error('You do not have admin access');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Palette className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">ArtisticSketches</h1>
          </Link>
          
          <nav className="flex items-center space-x-8">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    {isAdmin && (
                      <button
                        onClick={handleAdminClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </nav>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </header>
  );
}