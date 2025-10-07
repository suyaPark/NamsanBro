import React from 'react';
import { useApp } from '../context/AppContext';

const SellerDashboardPage = () => {
  const { user, setCurrentView } = useApp();
  
  if (!user || user.userType !== 'seller') {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">Seller Access Required</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {user ? 
              "You need to register as a seller to access this dashboard." :
              "Please sign in as a seller to access your dashboard."
            }
          </p>
        </div>
      </div>
    );
  }
  
  if (user.status === 'pending') {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">Account Pending Approval</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Your seller account is currently under review. You will receive an email notification once your account is approved.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg inline-block">
            <p className="text-yellow-800 font-medium">Estimated approval time: 1-2 business days</p>
          </div>
        </div>
      </div>
    );
  }
  
  const sellerProducts = [];
  const sellerOrders = [];
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-10">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 border border-gray-200 rounded-2xl">
          <p className="text-gray-600 mb-2">Total Products</p>
          <p className="text-3xl font-medium">{sellerProducts.length}</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-2xl">
          <p className="text-gray-600 mb-2">Active Orders</p>
          <p className="text-3xl font-medium">{sellerOrders.length}</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-2xl">
          <p className="text-gray-600 mb-2">Total Revenue</p>
          <p className="text-3xl font-medium">$0</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">Your Products</h2>
            <button 
              onClick={() => setCurrentView('upload')}
              className="text-sm text-blue-600 font-medium hover:text-blue-800"
            >
              Add Product
            </button>
          </div>
          {sellerProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't added any products yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sellerProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 text-sm">Stock: {product.stock}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.moqPrices[0].unitPrice}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'approved' ? 'bg-green-100 text-green-800' :
                      product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Recent Orders</h2>
          {sellerOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sellerOrders.map((order) => (
                <div key={order.id} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-gray-600 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('en-CA')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium">${order.totalAmount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;