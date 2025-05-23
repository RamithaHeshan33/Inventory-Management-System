const User = require("../models/userModel");
const industryModel = require("../models/industryModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async(req, res) => {
    const { name, email, password, role, profilePicture, industry } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        if ((role === "retailer" || role === "warehouse") && !industry) {
            return res.status(400).json({ message: "Industry is required for retailers and warehouses" });
        }

        if (industry) {
            const industryExists = await industryModel.findById(industry);
            if (!industryExists) {
                return res.status(400).json({ message: "Invalid industry ID" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profilePicture,
            industry: industry || null
        })

        await newUser.save();
        res.status(201).json({message: "User registered successfully", user: newUser});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

exports.registerUser = registerUser;

const loginUser = async(req, res) => {
    const {email, password, role, industry} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        if(user.role !== role) {
            return res.status(400).json({message: "Invalid role"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid password"});
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            profilePicture: user.profilePicture,
            industry: user.industry
        }, JWT_SECRET, {expiresIn: "1h"});

        console.log(user);
        res.status(200).json({
            message: "Login successful",
            token
        });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.loginUser = loginUser;
