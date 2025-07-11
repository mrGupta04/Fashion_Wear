import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      {/* Navbar - full width always */}
      <div className='w-full'>
        <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <Navbar />
          <SearchBar />
        </div>
      </div>

      {/* Main content */}
      <main className='flex-1 w-full'>
        <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {/* Home route with full-width container */}
          <Route path='/' element={
            <div className='w-full'>
              <Home />
            </div>
          } />
          
          {/* Other routes with standard container */}
          <Route path='/collection' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Collection />
            </div>
          } />
          <Route path='/about' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <About />
            </div>
          } />
          <Route path='/contact' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Contact />
            </div>
          } />
          <Route path='/product/:productId' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Product />
            </div>
          } />
          <Route path='/cart' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Cart />
            </div>
          } />
          <Route path='/login' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Login />
            </div>
          } />
          <Route path='/place-order' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <PlaceOrder />
            </div>
          } />
          <Route path='/orders' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Orders />
            </div>
          } />
          <Route path='/verify' element={
            <div className='w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Verify />
            </div>
          } />
        </Routes>
      </main>

      {/* Footer - full width always */}
      <div className='w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default App