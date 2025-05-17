const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/add", productController.addProducts);
router.get("/getById/:id", productController.getProductsById);
router.get("/getAll", productController.getAllProducts);
router.put("/update", productController.updateProducts);
router.delete("/delete", productController.deleteProducts);
router.post("/getByMultipleFields", productController.getProductByMultipleFields);

// router.get("/getByCategory", productController.getProductsByCategory);


module.exports = router;