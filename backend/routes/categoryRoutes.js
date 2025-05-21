const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.post("/add", categoryController.createCategory);
router.get("/all", categoryController.getAllCategories);


module.exports = router;