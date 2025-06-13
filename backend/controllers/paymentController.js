const Stripe = require("stripe");
const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
const createCheckoutSession = async(req, res) => {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        console.error("cartItems missing or invalid:", cartItems);
        return res.status(400).json({ error: "Invalid cart items" });
    }

    try {
        console.log("Received cartItems:", cartItems);

        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'lkr',
                product_data: {
                  name: String(item.productId.name),
                },
                unit_amount: Math.round(item.productId.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:5173/retailer/payment_success',
            cancel_url: 'http://localhost:5173/retailer/view_cart',
            metadata: {
              userId: String(cartItems[0].userId),
              cart: JSON.stringify(cartItems.map(item => ({
                  productId: item.productId._id,
                  quantity: item.quantity
              }))),
          },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
}

exports.createCheckoutSession = createCheckoutSession;

// Webhook endpoint to process order after successful payment
const stripeWebhook = async(req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers['stripe-signature'];
    let event;

    console.log('Webhook received'); // Log to confirm webhook is hit

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('Webhook event verified:', event.type); // Log event type
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('Session data:', session); // Log session data

        const userId = session.metadata.userId;
        const cartItems = JSON.parse(session.metadata.cart);
        console.log('Parsed cartItems:', cartItems); // Log cart items

        let totalAmount = 0;
        const orderProducts = [];

        try {
            for (const item of cartItems) {
                console.log('Processing item:', item); // Log each item
                const product = await productModel.findById(item.productId);
                if (!product) {
                    console.warn(`Product not found: ${item.productId}`);
                    continue;
                }

                const newQuantity = product.quantity - item.quantity;
                if (newQuantity < 0) {
                    console.warn(`Insufficient stock for product: ${item.productId}`);
                    continue;
                }

                product.quantity = newQuantity;
                await product.save();
                console.log(`Updated product ${item.productId} quantity to ${newQuantity}`);

                totalAmount += product.price * item.quantity;
                orderProducts.push({
                    productId: item.productId,
                    quantity: item.quantity,
                });
            }

            const order = new orderModel({
                userId,
                products: orderProducts,
                totalAmount,
            });
            await order.save();
            console.log('Order saved:', order);

            await cartModel.deleteMany({ userId });
            console.log(`Cart cleared for user: ${userId}`);
        } catch (err) {
            console.error('Error processing order:', err);
            return res.status(500).send('Error processing order');
        }
    }

    res.status(200).send('Webhook received');
}

exports.stripeWebhook = stripeWebhook;