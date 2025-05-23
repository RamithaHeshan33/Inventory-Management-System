const express = require("express");
const router = express.Router();

// Importing all the route files
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const retailerStockRoutes = require("./retailerStockRoutes");
const categoryRoutes = require("./categoryRoutes");
const industryRoutes = require("./industryRoutes");
const subCategoryRoutes = require("./subCategoryRoutes");

// User Routes
router.use("/users", userRoutes);

// Product Routes
router.use("/products", productRoutes);

// Retailer Stock Routes
router.use("/stocks", retailerStockRoutes);

// Category Routes
router.use("/categories", categoryRoutes);

// SubCategory Routes
router.use("/subcategories", subCategoryRoutes);

// Industry Routes
router.use("/industries", industryRoutes);

module.exports = router;
