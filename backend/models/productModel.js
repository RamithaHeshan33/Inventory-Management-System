const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    image: {
        type: String,
        default: null,
    },
    wholesaleStock: {
        type: String,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;