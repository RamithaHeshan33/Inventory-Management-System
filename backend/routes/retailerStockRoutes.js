const express = require("express");
const retailerStockController = require("../controllers/retailerStockController");
const router = express.Router();

router.get("/getAll", retailerStockController.getAllStocks);

module.exports = router;