import React, { useContext, useState } from 'react';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCreditCard, FiTruck, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
                    if (response.data.success) {
                        setCartItems({});
                        toast.success('Order placed successfully!');
                        navigate('/orders');
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url);
                    } else {
                        toast.error(responseStripe.data.message);
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full px-0 sm:px-4 py-4 sm:py-8 bg-gray-50 min-h-screen"
        >
            <div className="w-full mx-auto lg:max-w-7xl">
                <div className="text-center mb-6 sm:mb-8 px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
                    <p className="text-gray-600">Final step to get your products delivered</p>
                </div>

                <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-4 sm:gap-6 px-4 sm:px-0">
                    {/* ------------- Left Side ---------------- */}
                    <motion.div 
                        variants={itemVariants}
                        className="w-full lg:w-1/2 bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-6 border border-gray-100"
                    >
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                            <div className="w-2 h-5 sm:h-6 bg-indigo-600 rounded-full"></div>
                            Delivery Information
                        </h2>

                        <div className="space-y-3 sm:space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        required
                                        id="firstName"
                                        onChange={onChangeHandler}
                                        name="firstName"
                                        value={formData.firstName}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        type="text"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        required
                                        id="lastName"
                                        onChange={onChangeHandler}
                                        name="lastName"
                                        value={formData.lastName}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        type="text"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    required
                                    id="email"
                                    onChange={onChangeHandler}
                                    name="email"
                                    value={formData.email}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    type="email"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                <input
                                    required
                                    id="street"
                                    onChange={onChangeHandler}
                                    name="street"
                                    value={formData.street}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    type="text"
                                    placeholder="123 Main St"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        required
                                        id="city"
                                        onChange={onChangeHandler}
                                        name="city"
                                        value={formData.city}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        type="text"
                                        placeholder="New York"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                                    <input
                                        id="state"
                                        onChange={onChangeHandler}
                                        name="state"
                                        value={formData.state}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        type="text"
                                        placeholder="NY"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                    <input
                                        required
                                        id="zipcode"
                                        onChange={onChangeHandler}
                                        name="zipcode"
                                        value={formData.zipcode}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        type="number"
                                        placeholder="10001"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <input
                                        required
                                        id="country"
                                        onChange={onChangeHandler}
                                        name="country"
                                        value={formData.country}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        type="text"
                                        placeholder="United States"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    required
                                    id="phone"
                                    onChange={onChangeHandler}
                                    name="phone"
                                    value={formData.phone}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    type="number"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* ------------- Right Side ------------------ */}
                    <motion.div 
                        variants={itemVariants}
                        className="w-full lg:w-1/2 space-y-4 sm:space-y-6"
                    >
                        {/* Order Summary */}
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-6 border border-gray-100">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                                <div className="w-2 h-5 sm:h-6 bg-indigo-600 rounded-full"></div>
                                Order Summary
                            </h2>
                            <CartTotal />
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-6 border border-gray-100">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                                <div className="w-2 h-5 sm:h-6 bg-indigo-600 rounded-full"></div>
                                Payment Method
                            </h2>

                            <div className="space-y-3 sm:space-y-4">
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setMethod('stripe')} 
                                    className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition ${method === 'stripe' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'stripe' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`}>
                                            {method === 'stripe' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <FiCreditCard className="text-gray-700 text-xl" />
                                        <span className="font-medium">Credit/Debit Card</span>
                                    </div>
                                    <img src={assets.stripe_logo} alt="Stripe" className="h-5 sm:h-6" />
                                </motion.div>

                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setMethod('cod')} 
                                    className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition ${method === 'cod' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`}>
                                            {method === 'cod' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <FiTruck className="text-gray-700 text-xl" />
                                        <span className="font-medium">Cash on Delivery</span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-500">Pay when you receive</span>
                                </motion.div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className="w-full mt-4 sm:mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    'Processing...'
                                ) : (
                                    <>
                                        Place Order <FiArrowRight />
                                    </>
                                )}
                            </motion.button>

                            <p className="text-xs text-gray-500 mt-3 text-center">
                                By placing your order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    );
};

export default PlaceOrder;