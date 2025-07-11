import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const variantKey in cartItems[items]) {
          if (cartItems[items][variantKey] > 0) {
            // Split the variantKey to get size and color
            const [size, color] = variantKey.split('|');
            tempData.push({
              _id: items,
              size,
              color,
              quantity: cartItems[items][variantKey]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Title text1={'YOUR'} text2={'CART'} />
          <p className="mt-2 text-gray-500">Review your selection before checkout</p>
        </div>

        {cartData.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                const variantKey = `${item.size}|${item.color}`; // Reconstruct the variant key

                return (
                  <div 
                    key={index} 
                    className={`p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 ${
                      index !== cartData.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <img 
                      className="w-full sm:w-24 h-24 object-cover rounded-lg" 
                      src={productData.image[0]} 
                      alt={productData.name} 
                    />
                    
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{productData.name}</h3>
                          <p className="text-gray-500 mt-1">{currency}{productData.price}</p>
                        </div>
                        <button 
                          onClick={() => updateQuantity(item._id, variantKey, 0)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                            Size: {item.size}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full flex items-center gap-1">
                            <span 
                              className="w-3 h-3 rounded-full inline-block" 
                              style={{ backgroundColor: item.color.toLowerCase() }}
                            ></span>
                            {item.color}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item._id, variantKey, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-50"
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            min="1" 
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, variantKey, Math.max(1, Number(e.target.value)))}
                            className="w-12 h-8 text-center border-t border-b border-gray-300 outline-none"
                          />
                          <button 
                            onClick={() => updateQuantity(item._id, variantKey, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary & Checkout */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
              <CartTotal />
              
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <button 
                  onClick={() => navigate('/')}
                  className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={() => navigate('/place-order')}
                  className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart