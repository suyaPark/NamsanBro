import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, ShoppingCart, User, Home, ShoppingBag, 
  BarChart3, Menu, X, LogIn, ChevronDown 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { 
    currentView, 
    setCurrentView, 
    cart, 
    user, 
    signOutUser, 
    openAuthModal,
    searchTerm, 
    setSearchTerm,
    setAuthForm,
    setAuthMode
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setProfileDropdownOpen(false);
  };

  // ✅ Seller Login 버튼 클릭 핸들러
  const handleSellerLogin = () => {
    setAuthForm(prev => ({ 
      ...prev, 
      userType: 'seller' 
    }));
    setAuthMode('login');
    openAuthModal();
  };

  // ✅ Buyer Login 버튼 클릭 핸들러
  const handleBuyerLogin = () => {
    setAuthForm(prev => ({ 
      ...prev, 
      userType: 'buyer' 
    }));
    setAuthMode('login');
    openAuthModal();
  };

  const categories = [
    { name: 'Kitchen', key: 'kitchen' },
    { name: 'Bathroom', key: 'bathroom' },
    { name: 'Built-in Storage', key: 'built-in-storage' },
    { name: 'Sliding Door', key: 'sliding-door' },
    { name: 'Home Care', key: 'home-care' },
    { name: 'Windows & Folding Door', key: 'windows-folding-doors' },
    { name: 'Wallpaper / Flooring', key: 'wallpaper-flooring' }
  ];

  const renderAuthButtons = () => (
    <>
      <button
        onClick={handleSellerLogin}
        className="text-xs text-gray-700 hover:text-gray-900 font-light"
      >
        Seller Login
      </button>
      <button
        onClick={handleBuyerLogin}
        className="text-xs text-gray-700 hover:text-gray-900 font-light"
      >
        Buyer Login
      </button>
    </>
  );

  const renderProfileDropdown = () => {
    if (!user) return null;
    
    const isSeller = user.userType === 'seller' && user.status === 'active';
    const isBuyer = user.userType === 'buyer';
    
    return (
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          className="flex items-center gap-2 p-2 text-gray-700 hover:text-blue-600"
        >
          <User size={16} />
          <span className="text-xs hidden sm:inline">
            {user.firstName || user.email.split('@')[0]}
          </span>
          {isSeller && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Seller
            </span>
          )}
          {isBuyer && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Buyer
            </span>
          )}
          <ChevronDown size={14} className="hidden sm:inline" />
        </button>
        
        {profileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {isSeller && (
              <button
                onClick={() => {
                  setCurrentView('seller-dashboard');
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <BarChart3 size={14} />
                Seller Dashboard
              </button>
            )}
            
            <button
              onClick={() => {
                setCurrentView('profile');
                setProfileDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <User size={14} />
              Profile Settings
            </button>
            
            {isBuyer && (
              <>
                <button
                  onClick={() => {
                    setCurrentView('buyer-orders');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <ShoppingBag size={14} />
                  Order Management
                </button>
                <button
                  onClick={() => {
                    setCurrentView('cart');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <ShoppingCart size={14} />
                  Cart
                </button>
              </>
            )}
            
            <div className="border-t border-gray-200 my-1"></div>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogIn size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => setCurrentView('home')}
            className="text-sm font-light tracking-tight text-gray-900"
          >
            Namsan Bro
          </button>
          
          <nav className="hidden md:flex items-center space-x-5">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setCurrentView(`category-${category.key}`)}
                className="text-xs text-gray-700 hover:text-gray-900 font-light"
              >
                {category.name}
              </button>
            ))}
            <div className="w-px h-4 bg-gray-300 mx-2"></div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-1 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-gray-400 focus:border-gray-400 w-48"
              />
            </div>
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('cart')}
              className="relative p-2 text-gray-700 hover:text-blue-600"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="hidden md:block">
                {renderProfileDropdown()}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                {renderAuthButtons()}
              </div>
            )}
            
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="px-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-gray-400 focus:border-gray-400 w-full"
                />
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => {
                      setCurrentView(`category-${category.key}`);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-2 w-full text-xs text-gray-700 hover:text-blue-600"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {user ? (
                <div className="space-y-2 pt-4">
                  {user.userType === 'seller' && user.status === 'active' && (
                    <button 
                      onClick={() => {
                        setCurrentView('seller-dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left py-2 w-full text-xs text-gray-700 hover:text-blue-600"
                    >
                      <BarChart3 size={14} className="inline mr-2" />
                      Dashboard
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setCurrentView('profile');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-2 w-full text-xs text-gray-700 hover:text-blue-600"
                  >
                    <User size={14} className="inline mr-2" />
                    Profile
                  </button>
                  {user.userType === 'buyer' && (
                    <>
                      <button 
                        onClick={() => {
                          setCurrentView('buyer-orders');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left py-2 w-full text-xs text-gray-700 hover:text-blue-600"
                      >
                        <ShoppingBag size={14} className="inline mr-2" />
                        Orders
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('cart');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left py-2 w-full text-xs text-gray-700 hover:text-blue-600"
                      >
                        <ShoppingCart size={14} className="inline mr-2" />
                        Cart
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-2 w-full text-xs text-red-600 hover:text-red-700"
                  >
                    <LogIn size={14} className="inline mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-4">
                  <button 
                    onClick={() => {
                      handleSellerLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-2 w-full text-xs text-gray-700 hover:text-blue-600"
                  >
                    Seller Login
                  </button>
                  <button 
                    onClick={() => {
                      handleBuyerLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-2 w-full text-xs text-gray-700 hover:text-blue-600"
                  >
                    Buyer Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;