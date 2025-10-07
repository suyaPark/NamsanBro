import React from 'react';
import { getUnitPriceFromTiers } from '../utils/moqUtils';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { handleViewDetail, addToCart } = useApp();
  const unitPrice = getUnitPriceFromTiers(product.moqPrices, 1);
  const lowestPrice = Math.min(...product.moqPrices.map(p => p.unitPrice));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-sm transition-shadow duration-200 overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2">{product.name}</h3>
          <span className="text-xs text-blue-600 font-medium">{product.category}</span>
        </div>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{product.description}</p>
        <div className="space-y-1 mb-3">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">From:</span>
            <span className="text-sm font-medium text-gray-900">${unitPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Best:</span>
            <span className="text-sm font-medium text-green-600">${lowestPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleViewDetail(product)}
            className="flex-1 bg-black text-white py-2 px-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-xs font-medium"
          >
            View Details
          </button>
          <button 
            onClick={() => addToCart(product, product.moqPrices[0].minQty)}
            className="bg-gray-100 text-gray-900 py-2 px-3 rounded-full hover:bg-gray-200 transition-colors duration-200 text-xs font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;