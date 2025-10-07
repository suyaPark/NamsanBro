import React from 'react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { setCurrentView } = useApp();
  
  const footerLinks = [
    { name: 'About Us', view: 'about' },
    { name: 'Terms of Service', view: 'terms' },
    { name: 'Privacy Policy', view: 'privacy' },
    { name: 'Youth Protection Policy', view: 'youth' },
    { name: 'Legal Notice & Disclaimer', view: 'disclaimer' },
    { name: 'Email Collection Refusal', view: 'email' },
    { name: 'Seller Partnership Inquiry', view: 'seller-inquiry' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-900 font-light text-lg">Namsan Bro</p>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-600">
            {footerLinks.map((link) => (
              <button 
                key={link.view}
                onClick={() => setCurrentView(link.view)}
                className="hover:text-gray-900"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2025 Namsan Bro. Built for the Canadian market.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;