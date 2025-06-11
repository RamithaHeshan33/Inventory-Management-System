const express = require("express");
const router = express.Router();

// Importing all the route files
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const retailerStockRoutes = require("./retailerStockRoutes");
const categoryRoutes = require("./categoryRoutes");
const industryRoutes = require("./industryRoutes");
const subCategoryRoutes = require("./subCategoryRoutes");
const orderRoutes = require("./orderRoutes");
const cartRoutes = require("./cartRoutes");

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

// Order Routes
router.use("/orders", orderRoutes);

// Cart Routes
router.use("/cart", cartRoutes);

module.exports = router;
