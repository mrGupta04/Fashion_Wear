import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024
      setIsMobile(mobile)
      setSidebarOpen(!mobile)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className='bg-gray-50 min-h-screen font-sans'>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className='flex flex-col h-screen overflow-hidden'>
          <Navbar setToken={setToken} toggleSidebar={toggleSidebar} />
          
          <div className='flex flex-1 overflow-hidden'>
            <Sidebar 
              isOpen={sidebarOpen} 
              closeSidebar={closeSidebarOnMobile}
            />
            
            <motion.main 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex-1 overflow-y-auto transition-all duration-300 ${
                sidebarOpen && !isMobile ? 'ml-64' : 'ml-0'
              }`}
              onClick={closeSidebarOnMobile}
            >
              <div className='p-4 md:p-6 lg:p-8 w-full mx-auto'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </motion.main>
          </div>
        </div>
      )}
    </div>
  )
}

export default App