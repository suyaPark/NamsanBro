// src/pages/DisclaimerPage.jsx
import React from 'react';

const DisclaimerPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Legal Notice & Disclaimer</h1>
      <p className="text-gray-700 mb-4">
        All content on the Namsan Bro platform — including product listings, descriptions, and supplier data — is provided for informational purposes only.
      </p>
      <p className="text-gray-700 mb-4">
        While we strive for accuracy and compliance with Canadian import and safety laws, Namsan Bro:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>Does not guarantee completeness or accuracy of third-party information</li>
        <li>Is not responsible for disputes or damages between buyers and sellers</li>
        <li>Reserves the right to modify platform features, terms, or policies at any time</li>
      </ul>
      <p className="text-gray-700 mb-2">
        By using our platform, you acknowledge and agree to these disclaimers.
      </p>
    </div>
  );
};

export default DisclaimerPage;
