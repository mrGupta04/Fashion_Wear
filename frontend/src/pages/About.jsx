import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { FaLeaf, FaHeart, FaTruck, FaAward, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: <FaLeaf className="text-3xl text-emerald-500" />,
      title: "Sustainable Fashion",
      description: "Ethically sourced materials with eco-friendly production"
    },
    {
      icon: <FaHeart className="text-3xl text-rose-500" />,
      title: "Handcrafted Quality",
      description: "Traditional Nepali craftsmanship meets modern design"
    },
    {
      icon: <FaTruck className="text-3xl text-amber-500" />,
      title: "Free Local Delivery",
      description: "Same-day delivery in Janakpur area"
    },
    {
      icon: <FaAward className="text-3xl text-indigo-500" />,
      title: "Authentic Designs",
      description: "Unique patterns inspired by Mithila art"
    }
  ];

  const team = [
    {
      name: "Raja Gupta",
      role: "Owner",
      bio: "With over 15 years of experience in traditional textile design, Raja infuses authentic Mithila artistry into contemporary fashion, shaping the unique identity of Fashion Wear."
    },
    {
      name: "Roshan Gupta",
      role: "Head of Marketing",
      bio: "A social media strategist with a sharp eye for trends, Roshan leads all digital campaigns and community engagement for Fashion Wear, driving brand visibility and connection."
    },
    {
      name: "Tripti Sah",
      role: "Senior Fashion Consultant",
      bio: "With more than 5 years of hands-on experience in custom tailoring and styling, Tripti ensures every piece is crafted to perfection and tailored to individual tastes."
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-100 to-indigo-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://assets.codepen.io/3364143/glass-bg.jpg')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Title
              text1={"OUR"}
              text2={"STORY"}
              className="text-4xl md:text-6xl font-light text-gray-900"
            />
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Celebrating Janakpur's rich textile heritage through contemporary fashion
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-auto"
                src={assets.about_img}
                alt="Our store in Shiv Chowk, Janakpur"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm">Our flagship store in the heart of Janakpur</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl font-light text-gray-900">
              <span className="font-medium">Fashion Wear</span> - Where Tradition Meets Trend
            </h2>
            <p className="text-gray-600">
              Founded in 2015 at Shiv Chowk, Janakpur, Forever Fashion began as a small boutique showcasing local textile artistry. Today, we've grown into a beloved destination for those who appreciate the fusion of traditional Mithila designs with contemporary silhouettes.
            </p>
            <p className="text-gray-600">
              Each garment tells a story - from the hands that weave our fabrics in local workshops to the meticulous stitching by our master tailors. We're proud to support Nepal's textile heritage while creating fashion that resonates with today's style-conscious customers.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To preserve Nepal's textile traditions while innovating designs that empower wearers to express their unique identity. We commit to ethical production, fair wages, and sustainable practices at every step.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Title
              text1={"WHY"}
              text2={"CHOOSE US"}
              className="text-3xl md:text-4xl font-light text-gray-900"
            />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              What makes Forever Fashion special in Nepal's clothing landscape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Title
              text1={"MEET"}
              text2={"OUR TEAM"}
              className="text-3xl md:text-4xl font-light text-gray-900"
            />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Forever Fashion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-rose-200 to-indigo-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <FaUsers className="text-3xl text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-1 text-gray-800">{member.name}</h3>
                <p className="text-center text-rose-600 mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Local Connection */}
      <div className="bg-gradient-to-r from-rose-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl md:text-4xl font-light mb-6"
            >
              <span className="font-medium">Proudly Nepali</span> - Rooted in Janakpur
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg mb-8 opacity-90"
            >
              We source 90% of our materials within Nepal and collaborate with local artisans to keep traditional crafts alive. Every purchase supports our community's economy and cultural heritage.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button className="bg-white text-rose-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all">
                Visit Our Store in Shiv Chowk
              </button>
            </motion.div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default About;