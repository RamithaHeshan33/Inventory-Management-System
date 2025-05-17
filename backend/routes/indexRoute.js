const express = require("express");
const router = express.Router();

// Importing all the route files
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const retailerStockRoutes = require("./retailerStockRoutes");

// User Routes
router.use("/users", userRoutes);

// Product Routes
router.use("/products", productRoutes);

// Retailer Stock Routes
router.use("/stocks", retailerStockRoutes);

module.exports = router;
