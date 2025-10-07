import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const CategoryPage = ({ category }) => {
  const { products, setCurrentView } = useApp();
  const categoryMap = {
    'kitchen': 'Kitchen',
    'bathroom': 'Bathroom',
    'built-in-storage': 'Built-in Storage',
    'sliding-door': 'Sliding Door',
    'home-care': 'Home Care',
    'windows-folding-doors': 'Windows & Folding Door',
    'wallpaper-flooring': 'Wallpaper / Flooring'
  };
  
  const categoryName = categoryMap[category] || 'Products';
  const filteredProducts = products.filter(p => p.category === categoryName);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">{categoryName}</h1>
        <button
          onClick={() => setCurrentView('home')}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to Home
        </button>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;