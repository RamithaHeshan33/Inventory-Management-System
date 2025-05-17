const StockModel = require('../models/retailerStockModel');
const UserModel = require('../models/userModel');
const ProductModel = require('../models/productModel');

const  getAllStocks = async(req, res) => {
    try {
        const stocks = await StockModel.find();
        if (stocks.length === 0) {
            return res.status(404).json({message: "No stocks found"});
        }
        res.status(200).json(stocks);
    }

    catch(error) {
        console.error("Error fetching stocks:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getAllStocks = getAllStocks;

const getStockByMultipleFields = async(req, res) => {
    const { productId, warehouseId } = req.params;
    try {
        const stock = await StockModel.findOne({ productId, warehouseId });
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }
        res.status(200).json(stock);
    }

    catch(error) {
        console.error("Error fetching stock:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getStockByMultipleFields = getStockByMultipleFields;


const addStock = async(req, res) => {
    const { stockName, productId, quantity, warehouseId } = req.body;
    try {
        // Check if product exists
        const productExists = await ProductModel.findById(productId);
        if (!productExists) {
            return res.status(400).json({ message: "Invalid productId" });
        }

        // Check if warehouse/user exists
        const warehouseExists = await UserModel.findById(warehouseId);
        if (!warehouseExists || warehouseExists.role !== 'warehouse') {
            return res.status(400).json({ message: "Invalid warehouse user" });
        }

        const newStock = new StockModel({ stockName, productId, quantity, warehouseId });
        await newStock.save();
        res.status(201).json(newStock);
    }

    catch(error) {
        console.error("Error adding stock:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.addStock = addStock;

const updateStock = async(req, res) => {
    const { productId, warehouseId} = req.params;
    const { quantity } = req.body;
    try {
        const stock = await StockModel.findOne({ productId, warehouseId });
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        stock.quantity = quantity;
        await stock.save();
        res.status(200).json(stock);
    }

    catch(error) {
        console.error("Error updating stock:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateStock = updateStock;