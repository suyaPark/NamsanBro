import React, { useState } from 'react';
import { Minus, Plus, CheckCircle } from 'lucide-react';
import { getUnitPriceFromTiers } from '../utils/moqUtils';
import { useApp } from '../context/AppContext';

const ProductDetailPage = () => {
  const { selectedProduct, setCurrentView, addToCart } = useApp();
  const [quantity, setQuantity] = useState(selectedProduct?.moqPrices[0].minQty || 1);
  
  if (!selectedProduct) return null;

  const currentUnitPrice = getUnitPriceFromTiers(selectedProduct.moqPrices, quantity);
  const currentTier = selectedProduct.moqPrices.find(tier => 
    quantity >= tier.minQty && quantity <= tier.maxQty
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <button 
        onClick={() => setCurrentView('home')}
        className="mb-6 text-gray-900 hover:text-gray-700 flex items-center gap-2 font-medium"
      >
        ← Back to Products
      </button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={selectedProduct.images[0]} 
            alt={selectedProduct.name}
            className="w-full rounded-2xl shadow-sm"
          />
        </div>
        <div>
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">{selectedProduct.name}</h1>
          <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
          <p className="text-sm text-gray-500 mb-4">Sold by: {selectedProduct.sellerName}</p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-3">MOQ Pricing Structure</h3>
            <div className="space-y-2">
              {selectedProduct.moqPrices.map((tier, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <span className="text-sm">
                    {tier.minQty}-{tier.maxQty === 999999 ? '999+' : tier.maxQty} units
                  </span>
                  <span className="font-medium">${tier.unitPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (MOQ: {selectedProduct.moqPrices[0].minQty}+)
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(selectedProduct.moqPrices[0].minQty, quantity - 1))}
                  className="bg-gray-200 rounded-l-full px-3 py-2 hover:bg-gray-300 disabled:opacity-50"
                  disabled={quantity <= selectedProduct.moqPrices[0].minQty}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min={selectedProduct.moqPrices[0].minQty}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= selectedProduct.moqPrices[0].minQty) {
                      setQuantity(val);
                    }
                  }}
                  className="w-20 px-3 py-2 border-y border-gray-300 text-center focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 rounded-r-full px-3 py-2 hover:bg-gray-300"
                >
                  <Plus size={16} />
                </button>
                <span className="text-gray-600">units</span>
              </div>
              {quantity < selectedProduct.moqPrices[0].minQty && (
                <p className="text-red-600 text-sm mt-1">Minimum order quantity is {selectedProduct.moqPrices[0].minQty}</p>
              )}
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
              <span className="text-lg font-medium">Total: ${(currentUnitPrice * quantity).toFixed(2)}</span>
              <span className="text-sm text-gray-600">(${currentUnitPrice}/unit)</span>
            </div>
            {currentTier && currentTier.minQty > 1 && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-2xl">
                <CheckCircle size={20} />
                <span className="font-medium">Wholesale pricing applied!</span>
              </div>
            )}
            <button
              onClick={() => addToCart(selectedProduct, quantity)}
              disabled={quantity < selectedProduct.moqPrices[0].minQty}
              className="w-full bg-black text-white py-3 px-4 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart - ${(currentUnitPrice * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;