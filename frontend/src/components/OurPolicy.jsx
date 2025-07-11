import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          Our <span className="text-indigo-600">Commitment</span> to You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Exchange Policy */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src={assets.exchange_icon} className="w-8 h-8 object-contain" alt="Exchange" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Easy Exchange</h3>
            <p className="text-gray-600 mb-4">Not satisfied? We'll make it right with our simple exchange process.</p>
            <span className="text-indigo-600 text-sm font-medium">Learn more →</span>
          </div>
          
          {/* Return Policy */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src={assets.quality_icon} className="w-8 h-8 object-contain" alt="Quality" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">7-Day Returns</h3>
            <p className="text-gray-600 mb-4">Change your mind? Return any item within 7 days for a full refund.</p>
            <span className="text-indigo-600 text-sm font-medium">Learn more →</span>
          </div>
          
          {/* Support Policy */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src={assets.support_img} className="w-8 h-8 object-contain" alt="Support" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">24/7 Support</h3>
            <p className="text-gray-600 mb-4">Our team is always ready to help with any questions or concerns.</p>
            <span className="text-indigo-600 text-sm font-medium">Learn more →</span>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            We stand behind our products and services. If you're not completely satisfied, 
            we'll work with you to make it right.
          </p>
          <button className="mt-8 px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
            View Full Policy Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;