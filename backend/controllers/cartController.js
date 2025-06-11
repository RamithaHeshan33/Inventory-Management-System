const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

// Add item to cart
const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const cartItem = await cartModel.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ message: "Item updated in cart", cartItem });
        } else {
            const newCartItem = await cartModel.create({
                userId,
                productId,
                quantity
            });
            return res.status(201).json({ message: "Item added to cart", newCartItem });
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.addItemToCart = addItemToCart;

// get cart items by user
const getCartItemsByUser = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const cartItems = await cartModel.find({ userId }).populate("productId");

        if (!cartItems || cartItems.length === 0) {
            return res.status(200).json({ cartItems: [] });
        }

        res.status(200).json({ message: "Cart items retrieved successfully", cartItems });
    } catch (error) {
        console.error("Error retrieving cart items:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getCartItemsByUser = getCartItemsByUser;

// update cart item quantity
const updateCartItemQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const cartItem = await cartModel.findOne({ userId, productId });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: "Cart item updated successfully", cartItem });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateCartItemQuantity = updateCartItemQuantity;

// remove item from cart
const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: "User ID and Product ID are required" });
    }

    try {
        const cartItem = await cartModel.findOneAndDelete({ userId, productId });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item removed successfully" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeItemFromCart = removeItemFromCart;