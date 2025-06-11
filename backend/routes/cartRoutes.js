const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

router.post("/add", cartController.addItemToCart)
router.get("/get/:userId", cartController.getCartItemsByUser)
router.put("/update/:id", cartController.updateCartItemQuantity)
router.delete("/delete/:id", cartController.removeItemFromCart)

module.exports = router;

