import React, { useState } from 'react';
import { Plus, Minus, X, Upload as UploadIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductUploadForm = () => {
  const { 
    user, 
    uploadProduct, 
    setCurrentView,
    loading
  } = useApp();
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    moqPrices: [{ minQty: 1, maxQty: 9, unitPrice: 20 }],
    stock: 100
  });
  const [productImages, setProductImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const addMOQPriceTier = () => {
    const lastTier = newProduct.moqPrices[newProduct.moqPrices.length - 1];
    setNewProduct(prev => ({
      ...prev,
      moqPrices: [...prev.moqPrices, { 
        minQty: lastTier.maxQty + 1, 
        maxQty: lastTier.maxQty + 50, 
        unitPrice: Math.max(1, lastTier.unitPrice - 1) 
      }]
    }));
  };

  const updateMOQPriceTier = (index, field, value) => {
    const newValue = field === 'unitPrice' ? parseFloat(value) : parseInt(value);
    if (isNaN(newValue) || newValue < 0) return;
    
    setNewProduct(prev => ({
      ...prev,
      moqPrices: prev.moqPrices.map((tier, i) => 
        i === index ? { ...tier, [field]: newValue } : tier
      )
    }));
  };

  const removeMOQPriceTier = (index) => {
    if (newProduct.moqPrices.length > 1) {
      setNewProduct(prev => ({
        ...prev,
        moqPrices: prev.moqPrices.filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setUploading(true);
    try {
      // In real implementation, this would upload to Firebase Storage
      // For now, we'll create placeholder URLs
      const newImages = files.map((file, index) => 
        `https://placehold.co/400x300/8B4513/FFFFFF?text=Image${index+1}`
      );
      setProductImages(prev => [...prev, ...newImages]);
    } catch (error) {
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    
    try {
      await uploadProduct(newProduct, productImages);
    } catch (error) {
      setValidationError(error.message);
    }
  };

  if (user?.userType !== 'seller' || user?.status !== 'active') {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seller Account Required</h2>
          <p className="text-gray-600 mb-6">
            {user?.status === 'pending' 
              ? "Your seller account is pending approval. You will be notified once approved."
              : "You need to register as a seller and get approved to upload products."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={() => setCurrentView('home')}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Products
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product to Namsan Bro</h1>
        
        {validationError && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            <strong>Error:</strong> {validationError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                required
                value={newProduct.category}
                onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Beauty">Beauty</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              required
              rows={4}
              value={newProduct.description}
              onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your product..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <UploadIcon className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label 
                htmlFor="image-upload"
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200"
              >
                Choose Files
              </label>
            </div>
            {uploading && <p className="text-blue-600 text-sm mt-2">Uploading...</p>}
            {productImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {productImages.map((url, index) => (
                  <img key={index} src={url} alt={`preview ${index}`} className="w-full h-20 object-cover rounded" />
                ))}
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">MOQ Pricing Tiers *</label>
              <button
                type="button"
                onClick={addMOQPriceTier}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
              >
                <Plus size={16} />
                Add Tier
              </button>
            </div>
            
            <div className="space-y-3">
              {newProduct.moqPrices.map((tier, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Min Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={tier.minQty}
                        onChange={(e) => updateMOQPriceTier(index, 'minQty', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Max Qty</label>
                      <input
                        type="number"
                        min={tier.minQty}
                        value={tier.maxQty}
                        onChange={(e) => updateMOQPriceTier(index, 'maxQty', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Unit Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={tier.unitPrice}
                        onChange={(e) => updateMOQPriceTier(index, 'unitPrice', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                  {newProduct.moqPrices.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMOQPriceTier(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <p><strong>Note:</strong> MOQ tiers must be contiguous (no gaps) and start from quantity 1.</p>
              <p>The system will automatically normalize your tiers to ensure proper pricing.</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
            <input
              type="number"
              min="1"
              required
              value={newProduct.stock}
              onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) || 1 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || productImages.length === 0}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Product for Approval'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadForm;