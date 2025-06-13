const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();

// Create Checkout Session
router.post('/create-checkout-session', paymentController.createCheckoutSession);

// Webhook endpoint to process order after successful payment
router.post('/', express.raw({ type: 'application/json' }), paymentController.stripeWebhook);

module.exports = router;
