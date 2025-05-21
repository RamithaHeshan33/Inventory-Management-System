const express = require("express");
const router = express.Router();

// Importing all the route files
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const retailerStockRoutes = require("./retailerStockRoutes");
const categoryRoutes = require("./categoryRoutes");

// User Routes
router.use("/users", userRoutes);

// Product Routes
router.use("/products", productRoutes);

// Retailer Stock Routes
router.use("/stocks", retailerStockRoutes);

// Category Routes
router.use("/categories", categoryRoutes);

module.exports = router;
