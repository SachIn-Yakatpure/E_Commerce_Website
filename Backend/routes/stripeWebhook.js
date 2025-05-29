import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

dotenv.config();

// Command to use: stripe listen --forward-to localhost:7000/webhook
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post("/", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  console.log("🔥 Stripe webhook triggered");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("📦 Stripe session metadata:", session.metadata);

    if (!session.metadata || !session.metadata.cart) {
      console.error("❌ Missing cart metadata in Stripe session");
      return res.status(400).send("Missing cart metadata");
    }

    try {
      const cart = JSON.parse(session.metadata.cart);
      console.log("🧾 session.metadata.cart:", cart);

      // ✅ Reduce quantity for each purchased product
      for (const item of cart) {
        console.log("🔍 Looking for productId:", item.productId, "with quantity:", item.quantity);

        try {
          const product = await Product.findById(item.productId);

          if (product) {
            console.log("✅ Found product:", product.title, "| Current qty:", product.currentQuantity);
            product.currentQuantity = Math.max(0, product.currentQuantity - item.quantity);
            await product.save();
            console.log("📦 Updated currentQuantity:", product.currentQuantity);

          } else {
            console.error("❌ Product not found with ID:", item.productId);
          }
        } catch (err) {
          console.error("❌ Error during DB lookup/update:", err.message);
        }
      }

      console.log("✅ Product quantities updated after successful payment.");

      // ✅ Save one order for the entire cart
      if (session.metadata && session.metadata.userId) {
        const existingOrder = await Order.findOne({ sessionId: session.id });

        if (existingOrder) {
          console.warn("⚠️ Order already exists for session:", session.id);
        } else {
          const newOrder = new Order({
            user: session.metadata.userId,
            products: cart,
            totalAmount: parseFloat(session.metadata.grandTotal),
            taxes: parseFloat(session.metadata.taxes),
            deliveryCharges: parseFloat(session.metadata.deliveryCharges),
            paymentStatus: "Paid",
            orderStatus: "Processing",
            sessionId: session.id,
          });

          await newOrder.save();
          console.log("📝 New order saved:", newOrder._id);
        }

        // ✅ Clear user's cart
        try {
          await Cart.findOneAndDelete({ user: session.metadata.userId });
          console.log("🧼 Cleared cart for user ID:", session.metadata.userId);
        } catch (err) {
          console.error("❌ Failed to clear cart:", err.message);
        }
      } else {
        console.warn("⚠️ No userId in metadata — order not saved, cart not cleared");
      }
    } catch (err) {
      console.error("❌ Error processing cart items:", err);
    }
  }

  res.status(200).send("Webhook received");
});

export default router;
