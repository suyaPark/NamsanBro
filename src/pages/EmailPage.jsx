// src/pages/EmailPage.jsx
import React from 'react';

const EmailPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Email Collection Refusal</h1>
      <p className="text-gray-700 mb-4">
        In compliance with the Canadian Anti-Spam Legislation (CASL), Namsan Bro strictly prohibits unauthorized collection of email addresses from this website.
      </p>
      <p className="text-gray-700 mb-4">
        Collected emails may only be used for:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>Verified business communication</li>
        <li>Seller partnership inquiries</li>
        <li>Customer support</li>
      </ul>
      <p className="text-gray-700 mb-2">
        Unauthorized use or mass solicitation of email data will be reported to Canadian regulatory authorities.
      </p>
    </div>
  );
};

export default EmailPage;
