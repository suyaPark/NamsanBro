import React from 'react';
import { useApp } from '../context/AppContext';

const OrderDetailPage = () => {
  const { setCurrentView } = useApp();

  const mockOrder = {
    id: 'order1',
    buyerId: 'user123',
    buyerEmail: 'buyer@example.com',
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
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 3L9'
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <button 
        onClick={() => setCurrentView('buyer-orders')}
        className="mb-8 text-gray-900 hover:text-gray-700 flex items-center gap-2 font-medium"
      >
        ← Back to Orders
      </button>
      <div>
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">Order Details</h1>
            <p className="text-gray-600">Order #{mockOrder.id}</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm ${
              mockOrder.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
              mockOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' :
              mockOrder.status === 'shipped' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {mockOrder.status.charAt(0).toUpperCase() + mockOrder.status.slice(1)}
            </span>
            <p className="text-3xl font-medium text-gray-900 mt-3">${mockOrder.totalAmount}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-4">Shipping Address</h2>
            <div className="space-y-2 text-gray-600">
              <p>{mockOrder.shippingAddress.firstName} {mockOrder.shippingAddress.lastName}</p>
              <p>{mockOrder.shippingAddress.address}</p>
              <p>{mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.province} {mockOrder.shippingAddress.postalCode}</p>
              <p>Canada</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {mockOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">{item.quantity} × ${item.unitPrice}</p>
                  </div>
                  <p className="font-medium">${item.totalPrice}</p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-medium text-lg">
                <span>Total</span>
                <span>${mockOrder.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
        {mockOrder.trackingNumber && (
          <div className="mt-10 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Tracking Information</h3>
            <p className="text-blue-700">Tracking Number: <span className="font-mono">{mockOrder.trackingNumber}</span></p>
            <p className="text-sm text-blue-600 mt-2">Your order has been shipped and is on its way!</p>
          </div>
        )}
        <div className="mt-10 flex gap-4">
          <button
            onClick={() => setCurrentView('buyer-orders')}
            className="border border-gray-900 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Back to Orders
          </button>
          {(mockOrder.status === 'confirmed' || mockOrder.status === 'processing') && (
            <button
              onClick={() => alert('Order cancellation request submitted')}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;