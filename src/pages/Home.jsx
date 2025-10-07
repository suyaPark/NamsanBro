// src/pages/Home.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';

const Home = () => {
  const { products, setCurrentView, user } = useApp();
  
  const latestProducts = products.slice(0, 8);
  const popularProducts = products.slice(1, 9);
  const recommendedProducts = products.slice(2, 10);

  const handleBecomeSeller = () => {
    if (user) {
      if (user.userType === 'seller') {
        setCurrentView('seller-dashboard');
      } else {
        if (window.confirm('You are already registered as a buyer. Do you want to register as a seller as well?')) {
          setCurrentView('become-seller');
        }
      }
    } else {
      setCurrentView('become-seller');
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section - 애플 스타일 */}
      <div className="bg-white pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-left">
            <span className="text-blue-600">The finest B2B materials</span><br />
            For<br />
            Everyone around the world.
          </h1>
        </div>
      </div>

      {/* Latest Products */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-light tracking-tight text-gray-900">Latest Products</h2>
            <button
              onClick={() => setCurrentView('all-products')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Products
            </button>
          </div>
          <Slider>
            {latestProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-light tracking-tight text-gray-900">Popular Products</h2>
            <button
              onClick={() => setCurrentView('all-products')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Products
            </button>
          </div>
          <Slider>
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </div>
      </section>

      {/* Become Seller */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-light tracking-tight text-gray-900 mb-8 text-center">
            Become a Seller
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              "Start exporting to Canada with Namsan Bro.",
              "Expand your business and connect with verified buyers.",
              "Sell with MOQ-based pricing and build long-term deals.",
              "Need consulting? Contact us anytime."
            ].map((text, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-sm transition-shadow duration-200"
              >
                <p className="text-gray-700 font-light">{text}</p>
              </div>
            ))}
          </div>
          
          {/* Seller Registration Button */}
          <div className="text-center">
            <button 
              onClick={() => setCurrentView('become-seller')} 
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-lg font-medium shadow-sm hover:shadow-md"
            > 
              Start Seller Registration
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-light tracking-tight text-gray-900">Recommended Products</h2>
            <button
              onClick={() => setCurrentView('recommended-products')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Recommended Products
            </button>
          </div>
          <Slider>
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Home;