// src/pages/BecomeSellerPage.jsx
import React from 'react';
import { useApp } from '../context/AppContext';

const BecomeSellerPage = () => {
  const { user, setCurrentView, setAuthMode, setAuthForm } = useApp(); // ✅ 훅을 컴포넌트 최상단에서 호출

  const guideSections = [
    {
      title: "1. Getting Started",
      content: "Start selling globally with ease!\nNamsan Bro is an enterprise platform that allows global suppliers to sell products to the Canadian market on a MoQ (Minimum Order Quantity) basis.",
      steps: [
        "Sign Up – Create an account and enter basic information",
        "Verification – Business verification and account approval", 
        "Start Selling – Register products and begin trading"
      ]
    },
    {
      title: "2. Sign Up",
      content: "Quick and easy registration",
      tips: [
        "Enter your email and business information",
        "Complete a simple verification process", 
        "Choose between a corporate or individual account"
      ],
      tipNote: "Providing accurate business information will speed up the verification process."
    },
    {
      title: "3. Seller Verification",
      content: "Build trust through proper verification",
      tips: [
        "Submit your business license and relevant documents",
        "Verify your product categories",
        "Once approved, you can start selling"
      ],
      tipNote: "Refer to Canadian import regulations when submitting documents to speed up approval."
    },
    {
      title: "4. Product Listing",
      content: "How to list your first product",
      tips: [
        "Product Name: Use keyword-focused names for easy discovery",
        "Product Options: Set MoQ, color, size, and other options",
        "Category: Assign the correct category to maximize search visibility",
        "Product Images/Thumbnails: Use clear visuals that global buyers can understand",
        "Detailed Description: Include features, stock, and shipping information clearly"
      ],
      tipNote: "Add English translations and certification marks to attract international buyers."
    },
    {
      title: "5. Selling & Operations",
      content: "Operate smartly and boost sales",
      tips: [
        "Announcements & Promotions: Share discounts, campaigns, and new product updates",
        "Order & Inventory Management: Use automation tools and monitor stock in real time",
        "Customer Management: Maintain regular buyers and track transaction history",
        "Data Analysis: Analyze sales and popular products to refine your strategy"
      ],
      tipNote: "For MoQ-based B2B transactions, clearly set unit price, minimum order quantity, and shipping options."
    },
    {
      title: "6. International Selling Tips",
      content: "",
      tips: [
        "MoQ-Based Selling: Set minimum order quantities to make your products accessible to global buyers",
        "Certified Products: Display certifications to gain buyer trust",
        "Shipping & Fulfillment: Provide information on Canadian logistics and delivery options",
        "Eco-Friendly & Regulatory Compliance: Ensure your products comply with Canadian import regulations"
      ]
    },
    {
      title: "7. Payment & Settlement",
      content: "",
      tips: [
        "Settlement Cycle: Monthly or upon completion of transactions",
        "Fees: Clearly explain platform and transaction fees",
        "Automated Invoicing: Save time by automatically processing orders"
      ],
      tipNote: "Provide clear information about customs and taxes when selling internationally."
    },
    {
      title: "8. Help & Support",
      content: "",
      tips: [
        "FAQs: Covers accounts, product listing, payments, shipping, and more",
        "Customer Support: 24/7 email support and live chat assistance"
      ]
    }
  ];

  // ✅ 훅을 사용한 상태는 이미 컴포넌트 최상단에서 가져왔으므로, 여기서 직접 사용
  const handleSellerRegistration = () => {
    if (user) {
      if (user.userType === 'seller') {
        // 이미 셀러인 경우 대시보드로 이동
        setCurrentView('seller-dashboard');
      } else {
        // 바이어인 경우 경고 후 회원가입
        if (window.confirm('You are already registered as a buyer. Do you want to register as a seller as well?')) {
          setAuthMode('register');
          setAuthForm(prev => ({ ...prev, userType: 'seller' }));
          setCurrentView('auth');
        }
      }
    } else {
      // 비로그인 사용자 → 셀러 회원가입 모달
      setAuthMode('register');
      setAuthForm(prev => ({ ...prev, userType: 'seller' }));
      setCurrentView('auth');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">Namsan Bro Seller Guide</h1>
        <p className="text-gray-600 max-w-2xl">
          Everything you need to know to start selling on our B2B wholesale marketplace.
        </p>
      </div>

      <div className="space-y-12">
        {guideSections.map((section, index) => (
          <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">{section.title}</h2>
            
            {section.content && (
              <p className="text-gray-700 mb-4 whitespace-pre-line">{section.content}</p>
            )}
            
            {section.steps && (
              <ul className="space-y-2 mb-4">
                {section.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-2">
                    <span className="text-blue-600 font-medium">{stepIndex + 1}.</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {section.tips && (
              <div className="space-y-2">
                {section.tips.map((tip, tipIndex) => (
                  <p key={tipIndex} className="text-gray-700 pl-6 relative">
                    <span className="absolute left-0 text-blue-600">•</span>
                    {tip}
                  </p>
                ))}
              </div>
            )}
            
            {section.tipNote && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">Tip: {section.tipNote}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
            onClick={handleSellerRegistration}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-lg font-medium cursor-pointer"
            >
            {user?.userType === 'seller' ? 'Go to Seller Dashboard' : 'Start Selling'}
            </button>
      </div>
    </div>
  );
};
export default BecomeSellerPage;