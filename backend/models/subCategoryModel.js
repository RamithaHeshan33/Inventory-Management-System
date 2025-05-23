const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {timestamps: true});

const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);
module.exports = subCategoryModel;