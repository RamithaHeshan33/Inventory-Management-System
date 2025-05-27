const categoryModel = require('../models/categoryModel');
const industryModel = require('../models/industryModel');

// Create a new category
const createCategory = async (req, res) => {
    const {name, description, industry} = req.body;
    
    if(!name || !description || !industry) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {

        const industryExists = await industryModel.findOne({industry});
        if(industryExists) {
            return res.status(400).json({message: "Industry already exists"});
        }

        const category = await categoryModel.create({
            name,
            description,
            industry
        });
        res.status(201).json(category, {message: "Category created successfully"});
    }

    catch(error) {
        console.error("Error creating category:", error);
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


// get category by id
const getCategoryById = async (req, res) => {
    const {id} = req.params;

    try {
        const category = await categoryModel.findById(id);

        if(!category || category.length === 0) {
            return res.status(404).json({message: "Category not found"});
        }

        res.status(200).json({message: "Category retrieved successfully", category});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.getCategoryById = getCategoryById;


// update category
const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name, description, industry} = req.body;

    try {
        const category = await categoryModel.findByIdAndUpdate(id, {
            name,
            description,
            industry
        }, {new: true});

        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }

        res.status(200).json({message: "Category updated successfully", category});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.updateCategory = updateCategory;


// delete category
const deleteCategory = async (req, res) => {
    const {id} = req.params;

    try {
        const category = await categoryModel.findByIdAndDelete(id);

        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }

        res.status(200).json({message: "Category deleted successfully"});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.deleteCategory = deleteCategory;

// get categories by industry
const getCategoriesByIndustry = async (req, res) => {
    const {industryId} = req.params;

    try {
        const categories = await categoryModel.find({industry: industryId});

        if(!categories || categories.length === 0) {
            return res.status(404).json({message: "No categories found for this industry"});
        }

        res.status(200).json({message: "Categories retrieved successfully", categories});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.getCategoriesByIndustry = getCategoriesByIndustry;