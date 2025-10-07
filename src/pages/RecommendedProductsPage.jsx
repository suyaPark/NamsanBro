import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const RecommendedProductsPage = () => {
  const { products, setCurrentView } = useApp();
  // In real implementation, this would be filtered by recommendation algorithm
  const recommendedProducts = products.slice(2, 10);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">Recommended Products</h1>
        <button
          onClick={() => setCurrentView('home')}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to Home
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProductsPage;