import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiPlus, FiList, FiShoppingBag } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/add', name: 'Add Product', icon: <FiPlus /> },
    { path: '/list', name: 'Product List', icon: <FiList /> },
    { path: '/orders', name: 'Orders', icon: <FiShoppingBag /> }
  ]

  return (
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: isOpen ? 256 : 0 }}
      className={`bg-white shadow-lg h-full fixed lg:relative z-20 overflow-hidden`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center p-4 my-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-purple-100 text-purple-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar