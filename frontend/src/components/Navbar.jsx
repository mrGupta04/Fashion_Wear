import React, { useContext, useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const profileRef = useRef(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        setProfileOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="mx-auto px-0 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between h-24 items-center"> {/* Increased from h-20 to h-24 */}
                    {/* Logo - Now larger but with proper spacing */}

                    <Link to="/" className="flex-shrink-0 flex items-center pl-4 md:pl-0">
                        <span className="text-2xl xs:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300">
                            Fashion Wear
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'border-indigo-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`
                            }
                        >
                            HOME
                        </NavLink>
                        <NavLink
                            to="/collection"
                            className={({ isActive }) =>
                                `px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'border-indigo-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`
                            }
                        >
                            COLLECTION
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'border-indigo-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`
                            }
                        >
                            ABOUT
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'border-indigo-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`
                            }
                        >
                            CONTACT
                        </NavLink>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4 pr-4 md:pr-0">
                        <button
                            onClick={() => { setShowSearch(true); navigate('/collection') }}
                            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <img src={assets.search_icon} className="h-6 w-6" alt="Search" />
                        </button>

                        {/* Profile dropdown */}
                        <div className="relative ml-3 hidden md:block" ref={profileRef}>
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        if (token) {
                                            setProfileOpen(!profileOpen);
                                        } else {
                                            navigate('/login');
                                        }
                                    }}
                                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <img src={assets.profile_icon} className="h-6 w-6" alt="Profile" />
                                </button>
                                {token && profileOpen && (
                                    <div className="origin-top-right absolute right-0 mt-8 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <button
                                            onClick={() => {
                                                navigate('/orders');
                                                setProfileOpen(false);
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            Orders
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
                            <img src={assets.cart_icon} className="h-6 w-6" alt="Cart" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <img src={assets.menu_icon} className="h-6 w-6" alt="Menu" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                <div className="px-4 pt-2 pb-3 space-y-1 bg-white shadow-md w-full">
                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        to="/collection"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        COLLECTION
                    </NavLink>
                    <NavLink
                        to="/about"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        ABOUT
                    </NavLink>
                    <NavLink
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        CONTACT
                    </NavLink>

                    {/* Profile section in mobile menu */}
                    {token ? (
                        <>
                            <button
                                onClick={() => {
                                    navigate('/orders');
                                    setMenuOpen(false);
                                }}
                                className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-left"
                            >
                                My Orders
                            </button>
                            <button
                                onClick={() => {
                                    logout();
                                    setMenuOpen(false);
                                }}
                                className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-left"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                navigate('/login');
                                setMenuOpen(false);
                            }}
                            className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-left"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;