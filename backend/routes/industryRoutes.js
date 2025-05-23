const express = require("express");
const industryController = require("../controllers/industryController");
const router = express.Router();

router.post("/add", industryController.addIndustry);
router.get("/getById/:id", industryController.getIndustryById);
router.get("/getAll", industryController.getAllIndustries);
router.put("/update/:id", industryController.updateIndustry);
router.delete("/delete/:id", industryController.deleteIndustry);

module.exports = router;