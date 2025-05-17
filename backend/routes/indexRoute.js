const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");

// User Routes
router.use("/users", userRoutes);

// Product Routes
router.use("/products", productRoutes);

module.exports = router;
