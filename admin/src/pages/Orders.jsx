import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiHome, FiCreditCard, FiPhone, FiCalendar } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  const statusOptions = [
    'All',
    'Order Placed',
    'Packing',
    'Shipped',
    'Out for delivery',
    'Delivered'
  ]

  const statusIcons = {
    'Order Placed': <FiClock className="text-orange-500" />,
    'Packing': <FiPackage className="text-blue-500" />,
    'Shipped': <FiTruck className="text-purple-500" />,
    'Out for delivery': <FiTruck className="text-green-500" />,
    'Delivered': <FiCheckCircle className="text-green-600" />
  }

  const fetchAllOrders = async () => {
    if (!token) return
    
    setIsLoading(true)
    try {
      const response = await axios.post(
        backendUrl + '/api/order/list', 
        {}, 
        { headers: { token } }
      )
      
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      
      if (response.data.success) {
        await fetchAllOrders()
        toast.success(`Order status updated to ${event.target.value}`)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const filteredOrders = orders.filter(order => 
    filter === 'All' || order.status === filter
  )

  const getStatusColor = (status) => {
    switch(status) {
      case 'Order Placed': return 'bg-orange-100 text-orange-800'
      case 'Packing': return 'bg-blue-100 text-blue-800'
      case 'Shipped': return 'bg-purple-100 text-purple-800'
      case 'Out for delivery': return 'bg-green-100 text-green-800'
      case 'Delivered': return 'bg-green-200 text-green-900'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Order Management</h1>
        
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">No orders found</div>
          {filter !== 'All' && (
            <button 
              onClick={() => setFilter('All')}
              className="text-purple-600 hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6">
                {/* Order Summary */}
                <div className="md:col-span-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <FiPackage className="text-gray-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      
                      <div className="mt-3 space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-sm">
                              {item.name} × {item.quantity} 
                              {item.size && ` (${item.size})`}
                              {idx < order.items.length - 1 && ','}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="md:col-span-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <FiHome className="text-gray-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {order.address.firstName} {order.address.lastName}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.address.street},<br />
                        {order.address.city}, {order.address.state}<br />
                        {order.address.country}, {order.address.zipcode}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-sm">
                        <FiPhone className="text-gray-500" />
                        <span>{order.address.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <FiCreditCard className="text-gray-600 text-xl" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${order.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {order.payment ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm">
                        <span className="text-gray-500">Method:</span> {order.paymentMethod}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="text-gray-500">Items:</span> {order.items.length}
                      </p>
                      <p className="text-lg font-semibold mt-2">
                        {currency}{order.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Control */}
                <div className="md:col-span-2 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-2 mb-4">
                    {statusIcons[order.status]}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    {statusOptions.slice(1).map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Orders