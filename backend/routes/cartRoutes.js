const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

router.post("/add", cartController.addItemToCart)
router.get("/get/:userId", cartController.getCartItemsByUser)

module.exports = router;

