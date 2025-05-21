const categoryModel = require('../models/categoryModel');

// Create a new category
const createCategory = async (req, res) => {
    const {name, description} = req.body;
    
    if(!name || !description) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const category = await categoryModel.create({
            name,
            description
        });
        res.status(201).json(category, {message: "Category created successfully"});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.createCategory = createCategory;


// get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();

        if(!categories || categories.length === 0) {
            return res.status(404).json({message: "No categories found"});
        }

        res.status(200).json({message: "Categories retrieved successfully", categories});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }

}

exports.getAllCategories = getAllCategories;