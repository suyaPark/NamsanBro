// src/pages/YouthPage.jsx
import React from 'react';

const YouthPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Youth Protection Policy</h1>
      <p className="text-gray-700 mb-4">
        Namsan Bro’s services are designed for businesses and professionals. We do not knowingly collect personal information from individuals under the age of 18.
      </p>
      <p className="text-gray-700 mb-4">
        If it comes to our attention that a minor has provided personal information, we will promptly delete such data in compliance with Canadian and international privacy standards.
      </p>
      <p className="text-gray-700 mb-2">
        For inquiries, contact: <a href="mailto:youth-protection@namsanbro.com" className="text-blue-600 hover:underline">youth-protection@namsanbro.com</a>
      </p>
    </div>
  );
};

export default YouthPage;
