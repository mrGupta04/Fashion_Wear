import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiPackage, FiCreditCard, FiCalendar, FiCheckCircle, FiTruck, FiClock, FiFilter, FiChevronDown } from 'react-icons/fi';

const statusColors = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  shipped: 'bg-purple-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500'
};

const statusIcons = {
  pending: <FiClock className="text-yellow-500" />,
  processing: <FiPackage className="text-blue-500" />,
  shipped: <FiTruck className="text-purple-500" />,
  delivered: <FiCheckCircle className="text-green-500" />,
  cancelled: <FiClock className="text-red-500" />
};

const statusSteps = [
  { name: 'Placed', status: 'pending' },
  { name: 'Processing', status: 'processing' },
  { name: 'Shipped', status: 'shipped' },
  { name: 'Delivered', status: 'delivered' }
];

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const loadOrderData = async () => {
    try {
      setIsLoading(true);
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const filteredOrders = activeFilter === 'all' 
    ? orderData 
    : orderData.filter(item => item.status === activeFilter);

  const getStatusProgress = (status) => {
    const currentStepIndex = statusSteps.findIndex(step => step.status === status);
    if (currentStepIndex === -1) return 0; // For cancelled orders
    return ((currentStepIndex + 1) / statusSteps.length) * 100;
  };

  const getActiveStepIndex = (status) => {
    return statusSteps.findIndex(step => step.status === status);
  };

  const getFilterLabel = () => {
    if (activeFilter === 'all') return 'All Orders';
    return `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title text1={'MY'} text2={'ORDERS'} />
          <p className="mt-2 text-lg text-gray-600">
            View and manage your order history
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8">
          {/* Desktop Filter Buttons */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === 'all' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              All Orders
            </button>
            {Object.keys(statusColors).map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeFilter === status ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {statusIcons[status]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Filter Dropdown */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <FiFilter className="mr-2" />
                {getFilterLabel()}
              </div>
              <FiChevronDown className={`transition-transform ${showMobileFilter ? 'rotate-180' : ''}`} />
            </button>

            {showMobileFilter && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  onClick={() => {
                    setActiveFilter('all');
                    setShowMobileFilter(false);
                  }}
                  className={`block px-4 py-2 text-sm ${activeFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  All Orders
                </div>
                {Object.keys(statusColors).map((status) => (
                  <div
                    key={status}
                    onClick={() => {
                      setActiveFilter(status);
                      setShowMobileFilter(false);
                    }}
                    className={`block px-4 py-2 text-sm ${activeFilter === status ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{statusIcons[status]}</span>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <AnimatePresence>
            {filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No orders found
                </h3>
                <p className="mt-1 text-gray-500">
                  {activeFilter === 'all' 
                    ? "You haven't placed any orders yet." 
                    : `You don't have any ${activeFilter} orders.`}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((item, index) => (
                  <motion.div
                    key={`${item.orderId}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 sm:flex sm:items-start sm:justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-20 h-20 object-cover rounded-lg"
                            src={item.image[0]}
                            alt={item.name}
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="font-medium">{currency}{item.price}</span>
                            <span>•</span>
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span>Size: {item.size}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 pt-1 text-sm">
                            <div className="flex items-center text-gray-500">
                              <FiCalendar className="mr-1.5" />
                              {new Date(item.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <FiCreditCard className="mr-1.5" />
                              {item.paymentMethod}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:ml-6 sm:w-64">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${statusColors[item.status] || 'bg-gray-500'} mr-2`}></div>
                            <span className="text-sm font-medium capitalize">
                              {item.status}
                            </span>
                          </div>
                          <button
                            onClick={loadOrderData}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors"
                          >
                            <FiRefreshCw className="mr-1" size={12} />
                            Refresh
                          </button>
                        </div>

                        {/* Status Progress Bar */}
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`${statusColors[item.status] || 'bg-gray-500'} h-1.5 rounded-full`}
                              style={{ width: `${getStatusProgress(item.status)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            {statusSteps.map((step, index) => {
                              const isActive = getActiveStepIndex(item.status) >= index;
                              return (
                                <span 
                                  key={step.name} 
                                  className={`${isActive ? 'text-black font-medium' : ''}`}
                                >
                                  {step.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Order ID: {item.orderId}
                      </span>
                      <div className="space-x-2">
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                          View Details
                        </button>
                        <button className="text-xs font-medium text-gray-600 hover:text-gray-800">
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Orders;