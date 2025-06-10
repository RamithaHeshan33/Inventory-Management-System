const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCategoryModel');
const userModel = require('../models/userModel');

const addProducts = async (req, res) => {
    try {
        // Extract form fields (all will be strings)
        const {
            name,
            description,
            price,
            category,
            subCategory,
            wholesaleStock,
            expireDate,
            quantity,
            size
        } = req.body;

        const image = req.file ? req.file.path : undefined;
        const userID = req.user._id;

        // Validate required fields
        if (!name || !price || !category || !subCategory || !wholesaleStock || !quantity || !size) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Parse numeric values
        const parsedPrice = parseFloat(price);
        const parsedQuantity = parseInt(quantity);

        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) return res.status(400).json({ message: "Invalid category ID" });

        const subCategoryExists = await subCategoryModel.findById(subCategory);
        if (!subCategoryExists) return res.status(400).json({ message: "Invalid sub-category ID" });

        const userExists = await userModel.findById(userID);
        if (!userExists) return res.status(400).json({ message: "Invalid user ID" });

        const newProduct = new ProductModel({
            name,
            description,
            price: parsedPrice,
            category,
            subCategory,
            image,
            wholesaleStock,
            expireDate: expireDate ? new Date(expireDate) : undefined,
            quantity: parsedQuantity,
            size,
            userID
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.addProducts = addProducts;

const getProductsById = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await ProductModel.findById(id);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product retrieved successfully", product});
    }

    catch(error) {
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getProductsById = getProductsById;

const getAllProducts = async(req, res) => {
    try {
        const products = await ProductModel.find();

        if(!products || products.length === 0) {
            return res.status(404).json({message: "No products found"});
        }
        res.status(200).json({message: "Products retrieved successfully", products});

    }

    catch(error) {
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getAllProducts = getAllProducts;

const updateProducts = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        price,
        category,
        subCategory,
        wholesaleStock,
        expireDate,
        quantity,
        size
    } = req.body;

    const image = req.file ? req.file.path : undefined;

    try {
        const updateFields = {
            name,
            description,
            price: parseFloat(price),
            category,
            subCategory,
            wholesaleStock,
            expireDate: expireDate ? new Date(expireDate) : undefined,
            quantity: parseInt(quantity),
            size
        };

        if (image) updateFields.image = image;

        const product = await ProductModel.findByIdAndUpdate(id, updateFields, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.updateProducts = updateProducts;

const deleteProducts = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await ProductModel.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    }

    catch(error) {
        res.status(500).json({message: "Internal server error"});
    }
}

exports.deleteProducts = deleteProducts;


const getProductByMultipleFields = async (req, res) => {
    const { id, name, category, expireDate } = req.body;

    // Build a dynamic query object
    let query = {};
    if (id) query._id = id;
    if (name) query.name = name;
    if (category) query.category = category;
    if (expireDate) query.expireDate = new Date(expireDate);

    try {
        const product = await ProductModel.find(query);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product retrieved successfully", product });
    } catch (error) {
        console.error("Error retrieving product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getProductByMultipleFields = getProductByMultipleFields;

// get products by userid
const normalizeImagePath = (product) => {
    if (product.image) {
      product.image = product.image.split('\\').join('/');
    }
    return product;
  };

const getProductsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
    const products = await ProductModel.find({ userID: userId })
        .populate('category')
        .populate('subCategory');

    if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found for this user" });
    }

    // Normalize images for all products
    const normalizedProducts = products.map(prod => {
        let p = prod.toObject(); // convert mongoose doc to plain obj
        if(p.image) p.image = p.image.split('\\').join('/');
        return p;
    });

    res.status(200).json({ message: "Products retrieved successfully", products: normalizedProducts });
    } catch (error) {
    console.error("Error retrieving products by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
    }
};

exports.getProductsByUserId = getProductsByUserId;
