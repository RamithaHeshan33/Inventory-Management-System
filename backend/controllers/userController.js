const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async(req, res) => {
    const {name, email, password, role} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        await newUser.save();
        res.status(201).json({message: "User registered successfully", user: newUser});
    }
    catch(error) {
        res.status(500).json({message: "Internal server error"});
    }
}

exports.registerUser = registerUser;

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid password"});
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role
        }, JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({
            message: "Login successful",
            token
        });
    }
    catch(error) {
        res.status(500).json({message: "Internal server error"});
    }
}

exports.loginUser = loginUser;
