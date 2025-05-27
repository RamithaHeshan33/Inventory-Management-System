const subCategoryModel = require("../models/subCategoryModel");
const categoryModel = require("../models/categoryModel");

// add sub category
const addSubCategory = async(req, res) => {
    const {name, description, category} = req.body;

    if(!name || !description || !category) {
        return res.status(400).json({message: "Please fill all the fields"});
    }

    try {
        const categoryExists = await categoryModel.find({category});
        if(!categoryExists) {
            return res.status(400).json({message: "Category does not exist"});
        }

        const SubCategory = await subCategoryModel.create({
            name,
            description,
            category
        });
        res.status(201).json({message: "Sub category created successfully", SubCategory});
    }

    catch(error) {
        console.error("Error creating sub category:", error);
        res.status(500).json({message: "Server error"});
    }
}

exports.addSubCategory = addSubCategory;

// get all sub categories
const getAllSubCategories = async(req, res) => {
    try {
        const subCategories = await subCategoryModel.find().populate("category");

        if(!subCategories || subCategories.length === 0) {
            return res.status(404).json({message: "No sub categories found"});
        }

        res.status(200).json({message: "Sub categories retrieved successfully", subCategories});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.getAllSubCategories = getAllSubCategories;

// get sub category by id
const getSubCategoryById = async(req, res) => {
    const {id} = req.params;

    try {
        const subCategory = await subCategoryModel.findById(id).populate("category");

        if(!subCategory || subCategory.length === 0) {
            return res.status(404).json({message: "Sub category not found"});
        }

        res.status(200).json({message: "Sub category retrieved successfully", subCategory});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.getSubCategoryById = getSubCategoryById;

// update sub category
const updateSubCategory = async(req, res) => {
    const {id} = req.params;
    const {name, description, category} = req.body;

    if(!name || !description || !category) {
        return res.status(400).json({message: "Please fill all the fields"});
    }

    try {
        const subCategory = await subCategoryModel.findByIdAndUpdate(id, {
            name,
            description,
            category
        }, {new: true});

        if(!subCategory) {
            return res.status(404).json({message: "Sub category not found"});
        }

        res.status(200).json({message: "Sub category updated successfully", subCategory});
    }

    catch(error) {
        console.error("Error updating sub category:", error);
        res.status(500).json({message: "Server error"});
    }
}

exports.updateSubCategory = updateSubCategory;

// delete sub category
const deleteSubCategory = async(req, res) => {
    const {id} = req.params;

    try {
        const subCategory = await subCategoryModel.findByIdAndDelete(id);

        if(!subCategory) {
            return res.status(404).json({message: "Sub category not found"});
        }

        res.status(200).json({message: "Sub category deleted successfully"});
    }

    catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

exports.deleteSubCategory = deleteSubCategory;

// get sub categories by category
const getSubCategoriesByCategory = async(req, res) => {
    const {categoryId} = req.params;

    try {
        const subCategories = await subCategoryModel.find({category: categoryId});
        if(!subCategories || subCategories.length === 0) {
            return res.status(404).json({message: "No sub categories found for this category"});
        }
        res.status(200).json({message: "Sub categories retrieved successfully", subCategories});
    }
    catch(error) {
        console.error("Error fetching sub categories by category:", error);
        res.status(500).json({message: "Server error"});
    }
}

exports.getSubCategoriesByCategory = getSubCategoriesByCategory;