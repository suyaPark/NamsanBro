import React from 'react';
import { AppProvider, useApp } from './context/AppContext'; // ✅ useApp 추가
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import AllProductsPage from './pages/AllProductsPage';
import RecommendedProductsPage from './pages/RecommendedProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import ProfilePage from './pages/ProfilePage';
import BuyerOrdersPage from './pages/BuyerOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AuthModal from './components/AuthModal';
import BecomeSellerPage from './pages/BecomeSellerPage';

const AppContent = () => {
  const { currentView, setCurrentView } = useApp();
  
  const renderPage = () => {
    switch(currentView) {
      case 'home': return <Home />;
      case 'become-seller': return <BecomeSellerPage />;
      case 'cart': return <CartPage />;
      case 'profile': return <ProfilePage />;
      case 'buyer-orders': return <BuyerOrdersPage />;
      case 'order-detail': return <OrderDetailPage />;
      case 'seller-dashboard': return <SellerDashboardPage />;
      case 'all-products': return <AllProductsPage />;
      case 'recommended-products': return <RecommendedProductsPage />;
      case 'product-detail': return <ProductDetailPage />;
      
      // 카테고리 페이지
      case 'category-kitchen': 
      case 'category-bathroom': 
      case 'category-built-in-storage': 
      case 'category-sliding-door': 
      case 'category-home-care': 
      case 'category-windows-folding-doors': 
      case 'category-wallpaper-flooring':
        return <CategoryPage category={currentView.replace('category-', '')} />;
      
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header /> {/* ✅ 모든 페이지에서 헤더 표시 */}
      <main className="pt-16"> {/* Header 높이만큼 padding-top */}
        {renderPage()}
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;