const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = require("../middleware/upload");

router.post("/add", authenticate, upload.single('image'), productController.addProducts);
router.get("/getById/:id", productController.getProductsById);
router.get("/getAll", productController.getAllProducts);
router.put("/update/:id", authenticate, upload.single('image'), productController.updateProducts);
router.delete("/delete/:id", authenticate, productController.deleteProducts);
router.post("/getByMultipleFields", productController.getProductByMultipleFields);
router.get("/getByUserId/:userId", authenticate, productController.getProductsByUserId);


// router.get("/getByCategory", productController.getProductsByCategory);


module.exports = router;