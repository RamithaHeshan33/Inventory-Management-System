const ProductModel = require('../models/productModel');

const addProducts = async (req, res) => {
    const { name, description, price, category, image, wholesaleStock, expireDate } = req.body;
  
    try {
      const newProduct = new ProductModel({
        name,
        description,
        price,
        category,
        image,
        wholesaleStock,
        expireDate,
      });
      await newProduct.save();
      res.status(201).json({ message: "Product added successfully", product: newProduct });
    }

    catch (error) {
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

const updateProducts = async(req, res) => {
    const {id} = req.params;
    const {name, description, price, category, image, wholesaleStock, expireDate} = req.body;
    try {
        const product = await ProductModel.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            image,
            wholesaleStock,
            expireDate
        }, {new: true});

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product updated successfully", product});
    }

    catch(error) {
        res.status(500).json({message: "Internal server error"});
    }
}

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
