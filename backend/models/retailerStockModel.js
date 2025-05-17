const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true});

const Stock = mongoose.model('RetailerStock', stockSchema);
module.exports = Stock;