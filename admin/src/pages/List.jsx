import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { FiEdit2, FiTrash2, FiEye, FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const fetchList = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove', 
        { id }, 
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  // Filter products based on search and category
  const filteredProducts = list.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = ['All', ...new Set(list.map(item => item.category))]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Inventory</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1">Image</div>
              <div className="col-span-4">Product</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Image */}
                    <div className="col-span-1 flex items-center">
                      <img 
                        className="w-12 h-12 rounded-md object-cover border" 
                        src={item.image[0] || 'https://via.placeholder.com/50'} 
                        alt={item.name} 
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="col-span-4">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    
                    {/* Category */}
                    <div className="col-span-2 flex items-center">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {item.category}
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 flex items-center font-medium">
                      {currency}{item.price}
                    </div>
                    
                    {/* Status */}
                    <div className="col-span-1 flex items-center">
                      {item.bestseller ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Bestseller
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Standard
                        </span>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="col-span-2 flex justify-end items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => removeProduct(item._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="text-gray-400 mb-2">No products found</div>
                  {searchTerm || selectedCategory !== 'All' ? (
                    <button 
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedCategory('All')
                      }}
                      className="text-purple-600 hover:underline"
                    >
                      Clear filters
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Mobile List */}
          <div className="md:hidden space-y-3">
            {filteredProducts.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg shadow-sm border w-full"
              >
                <div className="flex gap-3">
                  <img 
                    className="w-16 h-16 rounded-md object-cover border" 
                    src={item.image[0] || 'https://via.placeholder.com/50'} 
                    alt={item.name} 
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {item.category}
                      </span>
                      {item.bestseller && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <div className="mt-2 font-medium">{currency}{item.price}</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                  <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full">
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => removeProduct(item._id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-gray-400 mb-2">No products found</div>
                {searchTerm || selectedCategory !== 'All' ? (
                  <button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('All')
                    }}
                    className="text-purple-600 hover:underline"
                  >
                    Clear filters
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}

export default List