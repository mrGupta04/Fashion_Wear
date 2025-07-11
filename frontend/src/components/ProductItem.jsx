import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {
    const { currency } = useContext(ShopContext);

    return (
        <div className="group relative flex flex-col h-full">
            <Link 
                onClick={() => window.scrollTo(0, 0)} 
                to={`/product/${id}`}
                className="flex flex-col h-full"
            >
                {/* Image container with fixed aspect ratio */}
                <div className="relative pt-[125%] bg-gray-50 overflow-hidden rounded-lg">
                    <img 
                        className="absolute top-0 left-0 w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        src={image[0]} 
                        alt={name}
                    />
                </div>
                
                {/* Product info */}
                <div className="mt-3 flex-grow">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{name}</h3>
                    <p className="mt-2 text-sm font-semibold text-gray-900">
                        {currency}{price}
                    </p>
                </div>
            </Link>
            
            {/* Quick view button (optional) */}
            <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </button>
        </div>
    )
}

export default ProductItem