const industryModel = require('../models/industryModel');

// Create a new industry
const addIndustry = async(req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const industry = await industryModel.create({
            name,
            description
        });
        res.status(201).json({ message: "Industry created successfully", industry });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.addIndustry = addIndustry;

// Get all industries
const getAllIndustries = async(req, res) => {
    try {
        const industries = await industryModel.find();

        if (!industries || industries.length === 0) {
            return res.status(404).json({ message: "No industries found" });
        }

        res.status(200).json({ message: "Industries retrieved successfully", industries });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.getAllIndustries = getAllIndustries;

// Get industry by ID
const getIndustryById = async(req, res) => {
    const { id } = req.params;

    try {
        const industry = await industryModel.findById(id);

        if (!industry) {
            return res.status(404).json({ message: "Industry not found" });
        }

        res.status(200).json({ message: "Industry retrieved successfully", industry });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.getIndustryById = getIndustryById;

// Update industry by ID
const updateIndustry = async(req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const industry = await industryModel.findByIdAndUpdate(id, { name, description }, { new: true });

        if (!industry) {
            return res.status(404).json({ message: "Industry not found" });
        }

        res.status(200).json({ message: "Industry updated successfully", industry });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.updateIndustry = updateIndustry;

// Delete industry by ID
const deleteIndustry = async(req, res) => {
    const { id } = req.params;

    try {
        const industry = await industryModel.findByIdAndDelete(id);

        if (!industry) {
            return res.status(404).json({ message: "Industry not found" });
        }

        res.status(200).json({ message: "Industry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteIndustry = deleteIndustry;