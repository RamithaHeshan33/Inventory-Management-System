const mongoose = require("mongoose");
const industrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Industry = mongoose.model("Industry", industrySchema);
module.exports = Industry;