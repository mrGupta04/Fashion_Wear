import userModel from "../models/userModel.js";

// add products to user cart with color
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size, color } = req.body;

        if (!size || !color) {
            return res.status(400).json({ 
                success: false, 
                message: "Please select both size and color" 
            });
        }

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Create a unique key combining size and color
        const variantKey = `${size}|${color}`;

        if (cartData[itemId]) {
            if (cartData[itemId][variantKey]) {
                cartData[itemId][variantKey] += 1;
            } else {
                cartData[itemId][variantKey] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][variantKey] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// update user cart with color
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, color, quantity } = req.body;

        if (!size || !color) {
            return res.status(400).json({ 
                success: false, 
                message: "Size and color are required" 
            });
        }

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        const variantKey = `${size}|${color}`;
        
        if (!cartData[itemId] || !cartData[itemId][variantKey]) {
            return res.status(404).json({ 
                success: false, 
                message: "Item not found in cart" 
            });
        }

        cartData[itemId][variantKey] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// get user cart data with color information
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {};

        // Transform the cart data to include separate size and color fields
        const transformedCart = {};
        
        for (const [itemId, variants] of Object.entries(cartData)) {
            transformedCart[itemId] = {};
            
            for (const [variantKey, quantity] of Object.entries(variants)) {
                const [size, color] = variantKey.split('|');
                transformedCart[itemId][variantKey] = {
                    size,
                    color,
                    quantity
                };
            }
        }

        res.json({ success: true, cartData: transformedCart });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart };