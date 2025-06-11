const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');

// Create a new order
const createOrder = async (req, res) => {
    const {userId, products, totalAmount} = req.body;

    if (!userId || !products || !totalAmount) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            return res.status(400).json({message: "Invalid user ID"});
        }

        // Validate products
        for (const product of products) {
            const productExists = await productModel.findById(product.productId);
            if (!productExists) {
                return res.status(400).json({message: `Invalid product ID: ${product.productId}`});
            }
        }

        const newOrder = new orderModel({
            userId,
            products,
            totalAmount
        });

        await newOrder.save();
        res.status(201).json({message: "Order created successfully", order: newOrder});
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.createOrder = createOrder;