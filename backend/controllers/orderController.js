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

// get orders by user ID - this is used by the retailer to get orders
const getOrderByRetailerID = async(req, res) => {
    const {userId} = req.params;

    if (!userId) {
        return res.status(400).json({message: "User ID is required"});
    }

    try {
        const orders = await orderModel.find({userId}).populate('products.productId');
        if (!orders || orders.length === 0) {
            return res.status(404).json({message: "No orders found for this user"});
        }
        res.status(200).json({message: "Orders retrieved successfully", orders});
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getOrderByRetailerID = getOrderByRetailerID;


// get orders by user ID - this is used by the warehouse to get orders made by the retailer
const getOrdersByWarehouse = async (req, res) => {
    const { userId: warehouseId } = req.params;

    if (!warehouseId) {
        return res.status(400).json({ message: "Warehouse ID is required" });
    }

    try {
        const allOrders = await orderModel.find().populate('products.productId');

        const warehouseOrders = allOrders.filter(order =>
            order.products.some(p => p.productId?.userID?.toString() === warehouseId)
        );

        if (warehouseOrders.length === 0) {
            return res.status(404).json({ message: "No orders found for this warehouse" });
        }

        res.status(200).json({ message: "Orders retrieved successfully", orders: warehouseOrders });
    } catch (error) {
        console.error("Error fetching warehouse orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getOrdersByWarehouse = getOrdersByWarehouse;

// update order status
const updateOrderStatus = async(req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || !status) {
        return res.status(400).json({ message: "Order ID and status are required" });
    }

    try {
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateOrderStatus = updateOrderStatus;