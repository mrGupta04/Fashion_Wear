import React from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'

const Navbar = ({ setToken, toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 hover:text-gray-900 lg:hidden"
        >
          <FiMenu size={24} />
        </button>
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Fashion Admin
          </span>
        </Link>
      </div>
      <button
        onClick={() => setToken('')}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
      >
        Logout
      </button>
    </header>
  )
}

export default Navbar