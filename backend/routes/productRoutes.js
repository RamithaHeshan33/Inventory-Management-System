const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post("/add", authenticate, upload.single("image"), productController.addProducts);
router.get("/getById/:id", productController.getProductsById);
router.get("/getAll", productController.getAllProducts);
router.put("/update/:id", productController.updateProducts);
router.delete("/delete/:id", productController.deleteProducts);
router.post("/getByMultipleFields", productController.getProductByMultipleFields);

// router.get("/getByCategory", productController.getProductsByCategory);


module.exports = router;