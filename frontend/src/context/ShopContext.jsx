import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // Add to cart with both size and color
    const addToCart = async (itemId, size, color) => {
        if (!size || !color) {
            toast.error('Please select both size and color');
            return;
        }

        // Create a unique variant key combining size and color
        const variantKey = `${size}|${color}`;
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId][variantKey] = (cartData[itemId][variantKey] || 0) + 1;
        } else {
            cartData[itemId] = { [variantKey]: 1 };
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', 
                    { itemId, size, color }, 
                    { headers: { token } }
                );
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || 'Failed to add to cart');
            }
        }
    }

    // Get total count of items in cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const variantKey in cartItems[itemId]) {
                const quantity = cartItems[itemId][variantKey];
                if (quantity > 0) {
                    totalCount += quantity;
                }
            }
        }
        return totalCount;
    }

    // Update quantity of a specific variant
    const updateQuantity = async (itemId, size, color, quantity) => {
        const variantKey = `${size}|${color}`;
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId] || !cartData[itemId][variantKey]) {
            toast.error('Item not found in cart');
            return;
        }

        // Remove item if quantity is 0
        if (quantity <= 0) {
            delete cartData[itemId][variantKey];
            // Remove item entry if no variants left
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][variantKey] = quantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', 
                    { itemId, size, color, quantity }, 
                    { headers: { token } }
                );
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || 'Failed to update cart');
            }
        }
    }

    // Calculate total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                for (const variantKey in cartItems[itemId]) {
                    const quantity = cartItems[itemId][variantKey];
                    if (quantity > 0) {
                        totalAmount += itemInfo.price * quantity;
                    }
                }
            }
        }
        return totalAmount;
    }

    // Fetch products
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    // Get user's cart data
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { token } }
            );
            
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to load cart');
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            getUserCart(storedToken);
        } else if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products, 
        currency, 
        delivery_fee,
        search, 
        setSearch, 
        showSearch, 
        setShowSearch,
        cartItems, 
        addToCart,
        setCartItems,
        getCartCount, 
        updateQuantity,
        getCartAmount, 
        navigate, 
        backendUrl,
        setToken, 
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;