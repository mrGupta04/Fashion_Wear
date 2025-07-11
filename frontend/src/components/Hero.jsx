import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Hero = () => {
  const navigate = useNavigate();
  
  const heroContent = [
    {
      image: assets.hero2,
      tagline: "SUMMER COLLECTION",
      title: "Embrace the Warmth",
      subtitle: "Discover our vibrant summer styles perfect for sunny days",
      ctaPrimary: "Shop Summer",
      ctaSecondary: "View Lookbook",
      accentColor: "from-amber-400/20 to-transparent"
    },
    {
      image: assets.hero3,
      tagline: "NEW ARRIVALS",
      title: "Elevate Your Wardrobe",
      subtitle: "Fresh styles that blend comfort with contemporary design",
      ctaPrimary: "Shop New Arrivals",
      ctaSecondary: "Explore Trends",
      accentColor: "from-blue-400/20 to-transparent"
    },
    {
      image: assets.hero4,
      tagline: "LIMITED EDITION",
      title: "Exclusive Designs",
      subtitle: "Unique pieces that make a statement wherever you go",
      ctaPrimary: "Shop Now",
      ctaSecondary: "Learn More",
      accentColor: "from-rose-400/20 to-transparent"
    },
    {
      image: assets.hero5,
      tagline: "LIMITED EDITION",
      title: "Exclusive Designs",
      subtitle: "Unique pieces that make a statement wherever you go",
      ctaPrimary: "Shop Now",
      ctaSecondary: "Learn More",
      accentColor: "from-rose-400/20 to-transparent"
    },
    {
      image: assets.hero6,
      tagline: "LIMITED EDITION",
      title: "Exclusive Designs",
      subtitle: "Unique pieces that make a statement wherever you go",
      ctaPrimary: "Shop Now",
      ctaSecondary: "Learn More",
      accentColor: "from-rose-400/20 to-transparent"
    },
    {
      image: assets.hero7,
      tagline: "LIMITED EDITION",
      title: "Exclusive Designs",
      subtitle: "Unique pieces that make a statement wherever you go",
      ctaPrimary: "Shop Now",
      ctaSecondary: "Learn More",
      accentColor: "from-rose-400/20 to-transparent"
    }

  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);

  const goToCollection = () => navigate('/collection');

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteracting) {
        setDirection(1);
        setCurrentIndex(prev => (prev === heroContent.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [heroContent.length, isInteracting]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev === heroContent.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? heroContent.length - 1 : prev - 1));
  };

  // Corner-to-corner image animation
  const imageVariants = {
    enter: (direction) => ({
      clipPath: direction > 0 
        ? 'polygon(100% 0%, 100% 0%, 200% 100%, 100% 100%)' // From top-right
        : 'polygon(0% 100%, 0% 100%, -100% 0%, 0% 0%)', // From bottom-left
      opacity: 0.8,
      transition: { duration: 0 }
    }),
    center: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: (direction) => ({
      clipPath: direction > 0
        ? 'polygon(0% -100%, 0% 0%, -100% 100%, 0% 100%)' // Exit bottom-left
        : 'polygon(100% 0%, 200% 0%, 100% 200%, 100% 100%)', // Exit top-right
      opacity: 0.8,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1]
      }
    })
  };

  // Original text animations
  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 1, 
        ease: [0.32, 0.72, 0, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -40,
      filter: 'blur(5px)',
      transition: { duration: 0.8 } 
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "backOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="relative w-full h-screen max-h-[1000px] min-h-[500px] overflow-hidden bg-gray-900">
      {/* Image with corner-to-corner animation */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={heroContent[currentIndex].image} 
              alt={`Hero ${currentIndex + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${heroContent[currentIndex].accentColor} via-black/30 to-black/10`}></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content with original text animations */}
      <div className="container mx-auto h-full relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="h-full flex flex-col justify-center items-start">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
              className="max-w-2xl space-y-4 sm:space-y-6"
            >
              {/* Tagline with character animation */}
              <motion.div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full overflow-hidden">
                <motion.div 
                  className="w-6 h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
                />
                <motion.p className="font-medium text-sm tracking-widest text-white">
                  {heroContent[currentIndex].tagline.split('').map((char, i) => (
                    <motion.span 
                      key={i} 
                      variants={letterVariants}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>

              {/* Animated title */}
              <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight">
                {heroContent[currentIndex].title.split(' ').map((word, i) => (
                  <motion.span 
                    key={i} 
                    className={`inline-block mr-2 ${i % 2 === 0 ? "font-medium" : ""}`}
                    variants={letterVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base sm:text-lg text-white/80 max-w-lg"
                variants={textVariants}
              >
                {heroContent[currentIndex].subtitle}
              </motion.p>

              {/* Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={goToCollection}
                  className="px-6 py-3 sm:px-8 sm:py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all text-sm sm:text-base shadow-lg hover:shadow-xl"
                >
                  {heroContent[currentIndex].ctaPrimary}
                </motion.button>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={goToCollection}
                  className="px-6 py-3 sm:px-6 sm:py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl"
                >
                  {heroContent[currentIndex].ctaSecondary} 
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FiArrowRight />
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Dots */}
          <div className="flex gap-2">
            {heroContent.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Arrows */}
          <div className="hidden sm:flex gap-4">
            <button 
              onClick={goToPrev}
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => setIsInteracting(false)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white"
              aria-label="Previous"
            >
              <FiChevronLeft size={20} />
            </button>
            <button 
              onClick={goToNext}
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => setIsInteracting(false)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white"
              aria-label="Next"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;