const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post("/make", orderController.createOrder);
router.get("/retailer/:userId", orderController.getOrderByRetailerID);
router.get("/warehouse/:userId", orderController.getOrdersByWarehouse);
router.put("/update/:id", orderController.updateOrderStatus);


module.exports = router;