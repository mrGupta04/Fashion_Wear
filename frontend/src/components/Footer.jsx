import React from "react";
import { assets } from "../assets/assets";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-50 w-full pt-16 pb-8">
      {/* Full-width background with inner spacing */}
      <div className="w-full mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <span className="w-36 text-3xl font-serif font-semibold italic text-gray-800 text-center border-b-2 border-pink-200 pb-1">
    Fashion Wear
</span>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Your destination for modern fashion. We blend style with comfort to
              bring you the latest trends at affordable prices.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <FaPinterest size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Shop</h3>
            <ul className="space-y-3">
              {['New Arrivals', 'Best Sellers', 'Sale', 'Lookbook', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-sm block hover:underline hover:underline-offset-4"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Help</h3>
            <ul className="space-y-3">
              {['Contact Us', 'FAQs', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-sm block hover:underline hover:underline-offset-4"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get 15% off your first order when you subscribe
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 w-full border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              />
              <button className="bg-indigo-600 text-white px-4 rounded-r hover:bg-indigo-700 transition-colors flex items-center">
                <FiArrowRight />
              </button>
            </div>
            <div className="mt-4 flex items-start">
              <input
                type="checkbox"
                id="privacy-check"
                className="mt-1 mr-2"
              />
              <label htmlFor="privacy-check" className="text-xs text-gray-500">
                I agree to the <a href="#" className="underline hover:text-indigo-600">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8">
          {/* Payment Methods */}
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            {['visa', 'mastercard', 'paypal', 'apple'].map((method) => (
              <img
                key={method}
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${method}/${method}-original.svg`}
                className="h-8"
                alt={method}
              />
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} ForeverYou. All rights reserved.</p>
            <div className="mt-2 flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1">
              {['Terms', 'Privacy', 'Cookies', 'Accessibility'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:underline hover:text-indigo-600"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;