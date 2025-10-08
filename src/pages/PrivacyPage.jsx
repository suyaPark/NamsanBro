// src/pages/PrivacyPage.jsx
import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">Effective Date: [Insert Date]</p>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>Business registration details</li>
        <li>Contact and billing information</li>
        <li>Usage data for service improvement</li>
      </ul>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">2. How We Use Information</h2>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>To verify accounts and enable transactions</li>
        <li>To provide customer support and marketing updates</li>
        <li>To comply with Canadian data protection regulations (PIPEDA)</li>
      </ul>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">3. Data Retention & Protection</h2>
      <p className="text-gray-700 mb-2">
        We store information securely using encrypted servers and comply with PIPEDA (Personal Information Protection and Electronic Documents Act).
      </p>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">4. User Rights</h2>
      <p className="text-gray-700 mb-2">
        You may request access, correction, or deletion of your data at any time by contacting privacy@namsanbro.com
      </p>
    </div>
  );
};

export default PrivacyPage;
