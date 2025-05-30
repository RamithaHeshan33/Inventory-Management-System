const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.post("/add", categoryController.createCategory);
router.get("/all", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
router.get("/byIndustry/:industryId", categoryController.getCategoriesByIndustry);


module.exports = router;