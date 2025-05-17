const express = require("express");
const retailerStockController = require("../controllers/retailerStockController");
const router = express.Router();

router.get("/getAll", retailerStockController.getAllStocks);
router.post("/getByMultipleFields", retailerStockController.getStockByMultipleFields);
router.post("/add", retailerStockController.addStock);

module.exports = router;