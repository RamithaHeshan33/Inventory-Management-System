const StockModel = require('../models/retailerStockModel');

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