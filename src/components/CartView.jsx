// src/components/CartView.jsx
import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { getUnitPriceFromTiers, calculateTotalPrice } from '../utils/moqUtils';
import { useApp } from '../context/AppContext';

const CartView = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    checkout, 
    setCurrentView,
    openAuthModal, // ← ✅ 추가
    user,
    loading
  } = useApp();
  const total = cart.reduce((sum, item) => sum + calculateTotalPrice(item.moqPrices, item.quantity), 0);
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6-5V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button 
            onClick={() => setCurrentView('home')}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => {
            const unitPrice = getUnitPriceFromTiers(item.moqPrices, item.quantity);
            const totalPrice = calculateTotalPrice(item.moqPrices, item.quantity);
            
            return (
              <div key={item.id} className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-sm">
                <img 
                  src={item.images[0]} 
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                  <p className="text-gray-600 text-sm">Category: {item.category}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, Math.max(item.moqPrices[0].minQty, item.quantity - 1))}
                        className="bg-gray-200 rounded-l px-2 py-1 hover:bg-gray-300 disabled:opacity-50"
                        disabled={item.quantity <= item.moqPrices[0].minQty}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        min={item.moqPrices[0].minQty}
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val >= item.moqPrices[0].minQty) {
                            updateCartQuantity(item.id, val);
                          }
                        }}
                        className="w-16 px-2 py-1 border border-gray-300 text-center text-sm"
                      />
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 rounded-r px-2 py-1 hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-gray-600 text-sm">x ${unitPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Subtotal</span>
                <span className="text-lg">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-4 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            {!user ? (
              <button
                onClick={() => openAuthModal()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium mt-6"
              >
                Sign In to Checkout
              </button>
            ) : (
              <button
                onClick={checkout}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium mt-6 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;