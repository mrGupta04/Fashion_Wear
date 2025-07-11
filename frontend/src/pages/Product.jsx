import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FiStar, FiChevronRight, FiTruck, FiRefreshCw, FiShield, FiChevronLeft, FiX, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import RelatedProducts from '../components/RelatedProducts';
import { useMediaQuery } from 'react-responsive';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image[0]);
      // Set default color if available
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(productData._id, selectedSize, selectedColor, quantity);
      setShowAddedToCart(true);
      
      setTimeout(() => {
        setShowAddedToCart(false);
      }, 3000);
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">Loading product...</div>
      </div>
    );
  }

  // Mobile View
  if (isMobile) {
    return (
      <div className="bg-white min-h-screen">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-medium truncate max-w-[70vw]">{productData.name}</h1>
          <div className="w-6"></div>
        </div>

        {/* Product Gallery - Mobile */}
        <div>
          <div 
            className="w-full bg-gray-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(true)}
          >
            <motion.img
              src={selectedImage}
              alt={productData.name}
              className="w-full h-auto max-h-[70vh] object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
            {productData.image.map((img, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 cursor-pointer border rounded-lg overflow-hidden ${selectedImage === img ? 'border-black' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Product Info - Mobile */}
        <div className="px-4 py-4">
          <div className="mb-4">
            <h1 className="text-xl font-bold">{productData.name}</h1>
            <div className="flex items-center mt-1">
              <div className="flex text-amber-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    fill={i < 4 ? "currentColor" : "none"} 
                    className="w-3 h-3"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">(122 reviews)</span>
            </div>
          </div>

          <div className="text-2xl font-bold text-gray-900 mb-4">
            {currency}{productData.price}
            {productData.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                {currency}{productData.originalPrice}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-6">{productData.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">SELECT SIZE</h3>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs border rounded-md ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-900 border-gray-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">SELECT COLOR</h3>
            <div className="flex flex-wrap gap-2">
              {productData.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 text-xs border rounded-md flex items-center ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                >
                  <span 
                    className="w-4 h-4 rounded-full mr-1.5" 
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></span>
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">QUANTITY</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-28">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1.5 text-gray-600"
              >
                -
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1.5 text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`w-full py-3 rounded-md font-medium ${selectedSize && selectedColor ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {selectedSize && selectedColor ? 'ADD TO CART' : 'SELECT OPTIONS'}
            </button>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-2 gap-3 text-xs mb-8">
            <div className="flex items-center text-gray-600">
              <FiTruck className="mr-1.5" size={14} />
              <span>Free shipping</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiRefreshCw className="mr-1.5" size={14} />
              <span>7-day returns</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiShield className="mr-1.5" size={14} />
              <span>Authentic</span>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mb-16">
            <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'description' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                >
                  DESCRIPTION
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'details' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                >
                  DETAILS
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'reviews' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                >
                  REVIEWS (122)
                </button>
              </div>
            </div>
            
            <div className="py-4">
              {activeTab === 'description' && (
                <div className="text-sm text-gray-600 space-y-3">
                  <p>{productData.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Premium quality {productData.material || 'cotton'} fabric</li>
                    <li>Designed for all-day comfort</li>
                    <li>Machine washable for easy care</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium text-gray-900 mb-2">Product Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Material</span>
                      <span>{productData.material || 'Cotton'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Fit</span>
                      <span>{productData.fit || 'Regular'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Colors</span>
                      <span>{productData.colors.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="text-sm">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl font-bold mr-3">4.2</div>
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            fill={i < 4 ? "currentColor" : "none"} 
                            className="w-4 h-4 text-amber-400"
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">122 reviews</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2].map((review) => (
                      <div key={review} className="border-b border-gray-100 pb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                          <div>
                            <div className="font-medium text-sm">Customer {review}</div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FiStar 
                                  key={i} 
                                  fill={i < 4 ? "currentColor" : "none"} 
                                  className="w-3 h-3 text-amber-400"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs">
                          "Great product! Fits perfectly and very comfortable."
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mb-24">
            <h2 className="text-lg font-bold mb-4">You May Also Like</h2>
            <RelatedProducts 
              category={productData.category} 
              subCategory={productData.subCategory} 
              currentProductId={productData._id}
            />
          </div>
        </div>

        {/* Added to Cart Notification - Mobile */}
        <AnimatePresence>
          {showAddedToCart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-20 left-4 right-4 z-50"
            >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FiShoppingCart className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Added to Cart</p>
                    <p className="text-sm text-gray-600">{quantity} × {productData.name} ({selectedColor}, {selectedSize})</p>
                  </div>
                  <button 
                    onClick={goToCart}
                    className="ml-4 px-3 py-1 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                  >
                    View Cart
                  </button>
                  <button 
                    onClick={() => setShowAddedToCart(false)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white"
            >
              <FiX size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt={productData.name}
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop View
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Gallery */}
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                <motion.img
                  src={selectedImage}
                  alt={productData.name}
                  className="w-full h-auto object-contain p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productData.image.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${selectedImage === img ? 'border-black' : 'border-transparent'}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-8 sticky top-24">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>Shop</span>
                <FiChevronRight className="mx-2" />
                <span>{productData.category}</span>
                <FiChevronRight className="mx-2" />
                <span className="text-black">{productData.name}</span>
              </div>

              <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      fill={i < 4 ? "currentColor" : "none"} 
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(122 reviews)</span>
              </div>

              <div className="text-3xl font-bold text-gray-900 mb-6">
                {currency}{productData.price}
                {productData.originalPrice && (
                  <span className="text-lg text-gray-400 line-through ml-2">
                    {currency}{productData.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-8">{productData.description}</p>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">SELECT SIZE</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-900 border-gray-300'}`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">SELECT COLOR</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium flex items-center ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: color.toLowerCase() }}
                      ></span>
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">QUANTITY</h3>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className={`w-full py-3 rounded-md font-medium ${selectedSize && selectedColor ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                {selectedSize && selectedColor ? 'ADD TO CART' : 'SELECT OPTIONS'}
              </motion.button>

              {/* Product Features */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <FiTruck className="mr-2" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiRefreshCw className="mr-2" />
                  <span>7-day returns</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiShield className="mr-2" />
                  <span>Authentic guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-medium text-sm ${activeTab === 'description' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-4 font-medium text-sm ${activeTab === 'details' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
              >
                PRODUCT DETAILS
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-medium text-sm ${activeTab === 'reviews' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'}`}
              >
                REVIEWS (122)
              </button>
            </nav>
          </div>
          
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-4">About This Product</h3>
                <p className="text-gray-600 mb-4">
                  {productData.description}
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Premium quality {productData.material || 'cotton'} fabric</li>
                  <li>Designed for all-day comfort</li>
                  <li>Machine washable for easy care</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="text-3xl font-bold mr-4">4.2</div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          fill={i < 4 ? "currentColor" : "none"} 
                          className="w-5 h-5 text-amber-400"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on 122 reviews</div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <div>
                          <div className="font-medium">Customer {review}</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                fill={i < 4 ? "currentColor" : "none"} 
                                className="w-3 h-3 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        "Great product! Fits perfectly and very comfortable."
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <RelatedProducts 
            category={productData.category} 
            subCategory={productData.subCategory} 
            currentProductId={productData._id}
          />
        </div>

        {/* Added to Cart Notification - Desktop */}
        <AnimatePresence>
          {showAddedToCart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FiShoppingCart className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Added to Cart</p>
                    <p className="text-sm text-gray-600">{quantity} × {productData.name} ({selectedColor}, {selectedSize})</p>
                  </div>
                  <button 
                    onClick={goToCart}
                    className="ml-4 px-3 py-1 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                  >
                    View Cart
                  </button>
                  <button 
                    onClick={() => setShowAddedToCart(false)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Product;