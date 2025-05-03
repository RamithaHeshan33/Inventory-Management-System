const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");

// User Routes
router.use("/users", userRoutes);

module.exports = router;
