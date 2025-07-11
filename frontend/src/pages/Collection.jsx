import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')
  const [activeFilters, setActiveFilters] = useState(0)
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false)
  const [mobileSubCategoryOpen, setMobileSubCategoryOpen] = useState(false)

  const toggleCategory = (e) => {
    const value = e.target.value
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value))
    } else {
      setCategory(prev => [...prev, value])
    }
    setMobileCategoryOpen(false) // Close dropdown after selection
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value))
    } else {
      setSubCategory(prev => [...prev, value])
    }
    setMobileSubCategoryOpen(false) // Close dropdown after selection
  }

  const applyFilter = () => {
    let productsCopy = products.slice()
    let filterCount = 0

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      filterCount++
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => 
        category.includes(item.category)
      )
      filterCount += category.length
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => 
        subCategory.includes(item.subCategory)
      )
      filterCount += subCategory.length
    }

    setActiveFilters(filterCount)
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = [...filterProducts]

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
        break
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)))
        break
      default:
        applyFilter()
        break
    }
  }

  const clearFilters = () => {
    setCategory([])
    setSubCategory([])
    setSortType('relavent')
    setMobileCategoryOpen(false)
    setMobileSubCategoryOpen(false)
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Mobile Filter Header */}
      <div className='sm:hidden flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Collections</h1>
        <button 
          onClick={() => setShowFilter(!showFilter)}
          className='flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full'
        >
          <span>Filters</span>
          {activeFilters > 0 && (
            <span className='bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs'>
              {activeFilters}
            </span>
          )}
          <img 
            className={`h-3 transition-transform ${showFilter ? 'rotate-180' : ''}`} 
            src={assets.dropdown_icon} 
            alt="" 
          />
        </button>
      </div>

      <div className='flex flex-col sm:flex-row gap-8'>
        {/* Filter Sidebar */}
        <div className={`sm:w-64 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <div className='sticky top-24 space-y-6'>
            {/* Filter Header */}
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
              {(category.length > 0 || subCategory.length > 0) && (
                <button 
                  onClick={clearFilters}
                  className='text-sm text-gray-500 hover:text-gray-700'
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Desktop Category Filter */}
            <div className='hidden sm:block border border-gray-200 rounded-lg p-4'>
              <p className='mb-3 text-sm font-medium text-gray-900'>CATEGORIES</p>
              <div className='space-y-3'>
                {['Men', 'Women', 'Kids'].map((cat) => (
                  <label key={cat} className='flex items-center space-x-3'>
                    <input
                      type="checkbox"
                      className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black'
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={toggleCategory}
                    />
                    <span className='text-sm text-gray-700'>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Mobile Category Dropdown */}
            <div className='sm:hidden'>
              <button 
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className='w-full flex justify-between items-center p-3 border border-gray-300 rounded-lg'
              >
                <span className='text-sm font-medium'>Categories</span>
                <img 
                  className={`h-3 transition-transform ${mobileCategoryOpen ? 'rotate-180' : ''}`} 
                  src={assets.dropdown_icon} 
                  alt="" 
                />
              </button>
              {mobileCategoryOpen && (
                <div className='mt-2 border border-gray-200 rounded-lg p-3'>
                  <div className='space-y-3'>
                    {['Men', 'Women', 'Kids'].map((cat) => (
                      <label key={cat} className='flex items-center space-x-3'>
                        <input
                          type="checkbox"
                          className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black'
                          value={cat}
                          checked={category.includes(cat)}
                          onChange={toggleCategory}
                        />
                        <span className='text-sm text-gray-700'>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop SubCategory Filter */}
            <div className='hidden sm:block border border-gray-200 rounded-lg p-4'>
              <p className='mb-3 text-sm font-medium text-gray-900'>TYPE</p>
              <div className='space-y-3'>
                {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                  <label key={type} className='flex items-center space-x-3'>
                    <input
                      type="checkbox"
                      className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black'
                      value={type}
                      checked={subCategory.includes(type)}
                      onChange={toggleSubCategory}
                    />
                    <span className='text-sm text-gray-700'>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile SubCategory Dropdown */}
            <div className='sm:hidden'>
              <button 
                onClick={() => setMobileSubCategoryOpen(!mobileSubCategoryOpen)}
                className='w-full flex justify-between items-center p-3 border border-gray-300 rounded-lg'
              >
                <span className='text-sm font-medium'>Type</span>
                <img 
                  className={`h-3 transition-transform ${mobileSubCategoryOpen ? 'rotate-180' : ''}`} 
                  src={assets.dropdown_icon} 
                  alt="" 
                />
              </button>
              {mobileSubCategoryOpen && (
                <div className='mt-2 border border-gray-200 rounded-lg p-3'>
                  <div className='space-y-3'>
                    {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                      <label key={type} className='flex items-center space-x-3'>
                        <input
                          type="checkbox"
                          className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black'
                          value={type}
                          checked={subCategory.includes(type)}
                          onChange={toggleSubCategory}
                        />
                        <span className='text-sm text-gray-700'>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className='flex-1'>
          {/* Desktop Header */}
          <div className='hidden sm:flex justify-between items-center mb-8'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-500'>Sort by:</span>
              <select 
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
                className='border-0 bg-gray-100 text-sm px-4 py-2 rounded-full focus:ring-2 focus:ring-black'
              >
                <option value="relavent">Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Mobile Sort */}
          <div className='sm:hidden mb-6'>
            <select 
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className='w-full border border-gray-300 text-sm px-4 py-2 rounded-md'
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Price Low to High</option>
              <option value="high-low">Sort by: Price High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <div className='mb-6'>
            <p className='text-sm text-gray-500'>
              Showing {filterProducts.length} {filterProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Product Grid */}
          {filterProducts.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
              {filterProducts.map((item, index) => (
                <ProductItem 
                  key={index} 
                  name={item.name} 
                  id={item._id} 
                  price={item.price} 
                  image={item.image} 
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <h3 className='text-lg font-medium text-gray-900'>No products found</h3>
              <p className='mt-2 text-sm text-gray-500'>
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className='mt-4 px-4 py-2 bg-black text-white rounded-full text-sm'
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection