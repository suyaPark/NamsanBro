import React from 'react';
import { useApp } from '../context/AppContext';

const BuyerOrdersPage = () => {
  const { user, setCurrentView } = useApp();
  
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Please sign in to view your orders.
          </p>
          <button 
            onClick={() => setCurrentView('auth')}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const mockOrders = [
    {
      id: 'order1',
      buyerId: user.uid,
      buyerEmail: user.email,
      items: [
        {
          id: '1',
          productName: "Premium Organic Coffee Beans",
          quantity: 25,
          unitPrice: 15,
          totalPrice: 375,
          images: ["https://placehold.co/400x300/8B4513/FFFFFF?text=Coffee"]
        }
      ],
      totalAmount: 375,
      status: 'shipped',
      trackingNumber: 'CA123456789',
      createdAt: '2025-01-15T10:30:00Z',
      shippingAddress: {
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        province: user.province,
        postalCode: user.postalCode
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-10">My Orders</h1>
      {mockOrders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-xl mb-8">You haven't placed any orders yet</p>
          <button 
            onClick={() => setCurrentView('home')}
            className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {mockOrders.map((order) => (
            <div key={order.id} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Order #{order.id}</h3>
                  <p className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('en-CA', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <p className="text-2xl font-medium text-gray-900 mt-2">${order.totalAmount}</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img 
                      src={item.images[0]} 
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.productName}</h4>
                      <p className="text-gray-600">{item.quantity} × ${item.unitPrice}</p>
                    </div>
                    <p className="font-medium text-gray-900">${item.totalPrice}</p>
                  </div>
                ))}
              </div>
              {order.trackingNumber && (
                <div className="bg-blue-50 p-3 rounded-lg mb-6">
                  <p className="text-sm text-blue-800 font-medium">Tracking Number: {order.trackingNumber}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentView('order-detail')}
                  className="text-sm text-blue-600 font-medium hover:text-blue-800"
                >
                  View Details
                </button>
                {(order.status === 'confirmed' || order.status === 'processing') && (
                  <button
                    onClick={() => alert('Order cancellation request submitted')}
                    className="text-sm text-red-600 font-medium hover:text-red-800"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerOrdersPage;