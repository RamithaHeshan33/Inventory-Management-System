const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSIHAgAt1qr3dZoRVKjpw4p2qddppl7TRnog&s"
    },
    role: {
        type: String,
        enum: ["admin", "retailer", "warehouse", "marketing"],
        default: "retailer"
    },
    industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Industry",
        required: function () {
            return this.role === "retailer" || this.role === "warehouse";
        }
    }

}, {timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User;
