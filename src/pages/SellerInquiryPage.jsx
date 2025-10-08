// src/pages/SellerInquiryPage.jsx
import React from 'react';

const SellerInquiryPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Seller Partnership Inquiry</h1>
      <p className="text-gray-700 mb-4">
        We welcome partnerships with manufacturers, distributors, and global suppliers who wish to expand into the Canadian market.
      </p>
      <p className="text-gray-700 mb-4">
        Please contact our Partnership Team with the following information:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>Company Name & Country</li>
        <li>Product Categories</li>
        <li>MOQ and Wholesale Terms</li>
        <li>Certifications or Compliance Documents</li>
      </ul>
      <p className="text-gray-700 mb-2">
        📧 Email: <a href="mailto:partner@namsanbro.com" className="text-blue-600 hover:underline">partner@namsanbro.com</a>
      </p>
      <p className="text-gray-700 mb-2">
        📍 Head Office: Toronto, Ontario, Canada
      </p>
      <p className="text-gray-700 mb-2">
        Let’s build the future of global sourcing — together.
      </p>
    </div>
  );
};

export default SellerInquiryPage;
