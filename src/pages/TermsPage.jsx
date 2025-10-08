// src/pages/TermsPage.jsx
import React from 'react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-gray-700 mb-4">Effective Date: [Insert Date]</p>
      <p className="text-gray-700 mb-4">
        These Terms of Service (“Terms”) govern your use of the Namsan Bro platform, services, and related features operated by Namsan Bro Inc. (“we,” “our,” “us”).
      </p>
      <p className="text-gray-700 mb-4">By accessing or using our platform, you agree to these Terms.</p>

      <h2 className="text-xl font-medium text-gray-900 mt-6 mb-2">1. Eligibility</h2>
      <p className="text-gray-700 mb-2">
        Users must be at least 18 years old and represent a registered business entity or authorized individual.
      </p>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">2. Account Registration</h2>
      <p className="text-gray-700 mb-2">
        You are responsible for maintaining the confidentiality of your account and login credentials. Misuse, sharing, or unauthorized access may result in account suspension.
      </p>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">3. Seller Verification</h2>
      <p className="text-gray-700 mb-2">
        All sellers must undergo business verification in accordance with Canadian import and trade regulations before listing products.
      </p>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">4. Transactions & Payments</h2>
      <p className="text-gray-700 mb-2">
        All transactions are conducted on a MoQ basis. Prices, shipping, and applicable taxes must be clearly disclosed before purchase.
      </p>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">5. Prohibited Conduct</h2>
      <p className="text-gray-700 mb-2">
        You agree not to post false or misleading product information, violate Canadian trade or customs laws, or engage in fraudulent or deceptive business practices.
      </p>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">6. Limitation of Liability</h2>
      <p className="text-gray-700 mb-2">
        Namsan Bro is not liable for indirect, incidental, or consequential damages arising from platform use or third-party transactions.
      </p>

      <h2 className="text-xl font-medium text-gray-900 mt-4 mb-2">7. Governing Law</h2>
      <p className="text-gray-700 mb-2">These Terms are governed by the laws of the Province of Ontario, Canada.</p>
    </div>
  );
};

export default TermsPage;
