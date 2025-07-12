import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight } from 'react-icons/fi';
import { FaInstagram, FaTwitter, FaLinkedin, FaDribbble } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Glassmorphism Hero */}
      <div className="relative overflow-hidden h-[400px] md:h-[500px]">
        {/* Background images - responsive switching */}
        <div className="absolute inset-0">
          {/* Mobile image (hero13) */}
          <div
            className="md:hidden absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${assets.hero13})` }}
          ></div>

          {/* Desktop image (hero12) */}
          <div
            className="hidden md:block absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${assets.hero12})` }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full px-4"
          >
            <Title
              text1="CONTACT"
              text2="US"
              className="text-white text-4xl sm:text-5xl md:text-7xl font-light tracking-tight"
            />
            
          </motion.div>
        </div>
      </div>

      {/* Floating Contact Cards */}
      <div className="relative max-w-7xl mx-auto px-6 -mt-16 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Card 1 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm bg-white/70"
          >
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <FiMapPin className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
            <p className="text-gray-600 mb-4">Shiv Chowk<br />Station Road,Janakpurdham -02,Nepal</p>
            <p className="text-gray-600 mb-4">Near new<br />Sitasharan plaza & Hotel</p>
            <a href="#" className="text-indigo-600 font-medium flex items-center group">
              View on map
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Contact Card 2 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm bg-white/70"
          >
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <FiPhone className="text-pink-600 text-2xl" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="text-2xl">👤</div>
                <div>
                  <p className="font-semibold text-gray-900">Raja Gupta</p>
                  <p className="text-sm text-gray-600">+91 98198 36135</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="text-2xl">📱</div>
                <div>
                  <p className="font-semibold text-gray-900">Roshan Gupta</p>
                  <p className="text-sm text-gray-600">+91 98121 38803</p>
                </div>
              </div>
            </div>


            <p className="text-gray-600 mb-4"></p>
            <a href="#" className="text-pink-600 font-medium flex items-center group">
              Call now
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Contact Card 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm bg-white/70"
          >
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <FiClock className="text-amber-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Hours</h3>
            <p className="text-gray-600 mb-2">Everyday: 9am - 9pm</p>
            <p className="text-gray-600 mb-4">Every day open</p>
            <a href="#" className="text-amber-600 font-medium flex items-center group">
              Reach to us
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Modern Form Section */}
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-light text-gray-900 mb-8"
            >
              Send us a <span className="font-medium">message</span>
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <div className={`relative rounded-lg transition-all duration-300 ${activeField === 'name' ? 'ring-2 ring-indigo-500' : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className={`relative rounded-lg transition-all duration-300 ${activeField === 'email' ? 'ring-2 ring-indigo-500' : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <div className={`relative rounded-lg transition-all duration-300 ${activeField === 'message' ? 'ring-2 ring-indigo-500' : ''}`}>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center"
                >
                  Send Message
                  <FiArrowRight className="ml-2" />
                </button>
              </motion.div>
            </form>
          </div>

          {/* Interactive Map & Social */}
          <div className="space-y-10">
            {/* 3D Map Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 z-10 pointer-events-none"></div>

              {/* Google Maps iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.483761115987!2d85.9275812!3d26.7297619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3f3980777407%3A0x3d12961048ff5f33!2sFashion%20wear!5e0!3m2!1sen!2sus!4v1712345678901!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                aria-label="Fashion Wear store location on Google Maps"
                title="Fashion Wear Location"
              ></iframe>

              {/* Store info overlay (optional) */}
              <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">Fashion Wear</p>
                <p className="text-sm text-gray-600">26.729969, 85.9301812</p>
              </div>
            </motion.div>

            {/* Social Links - Corrected with proper icons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Connect With Us</h3>
              <div className="flex space-x-6">
                {[
                  { icon: <FaInstagram size={20} />, color: 'bg-pink-500', label: 'Instagram' },
                  { icon: <FaTwitter size={20} />, color: 'bg-blue-400', label: 'Twitter' },
                  { icon: <FaLinkedin size={20} />, color: 'bg-blue-600', label: 'LinkedIn' },
                  { icon: <FaDribbble size={20} />, color: 'bg-pink-400', label: 'Dribbble' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5 }}
                    href="#"
                    aria-label={social.label}
                    className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Careers CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-indigo-600 rounded-2xl p-8 text-white shadow-2xl"
            >
              <h3 className="text-xl font-semibold mb-4">Join Our Team</h3>
              <p className="mb-6 opacity-90">We're always looking for talented individuals to join our growing team.</p>
              <button className="bg-white text-indigo-600 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all">
                View Open Positions
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Micro-interactions Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-light text-center mb-16"
          >
            Why <span className="font-medium">choose us</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Instant Response",
                desc: "Our AI assistant responds immediately to all inquiries 24/7",
                icon: "⚡"
              },
              {
                title: "Global Support",
                desc: "Multilingual support team across 12 time zones",
                icon: "🌎"
              },
              {
                title: "Secure Data",
                desc: "Enterprise-grade encryption for all your communications",
                icon: "🔒"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;