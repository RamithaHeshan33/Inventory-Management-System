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
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSIHAgAt1qr3dZoRVKjpw4p2qddppl7TRnog&s"
    },
    wholesaleStock: {
        type: Number,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;