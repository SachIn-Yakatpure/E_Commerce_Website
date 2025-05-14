import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import bodyParser from "body-parser"; 
import Product from "../models/Product.js";

dotenv.config();
// we should use this in cmd stripe listen --forward-to localhost:7000/webhook
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

    if (!session.metadata || !session.metadata.cart) {
      console.error("❌ Missing cart metadata in Stripe session");
      return res.status(400).send("Missing cart metadata");
    }
    let cart;
    try {
      cart = JSON.parse(session.metadata.cart);
      console.log("🧾 session.metadata.cart:", session.metadata.cart);

      for (const item of cart) {
        console.log("🔍 Looking for productId:", item.productId, "with quantity:", item.quantity);

        try {
          const product = await Product.findById(item.productId);


          if (product) {
            console.log("✅ Found product:", product.title, "| Current qty:", product.quantity);
            product.quantity = Math.max(0, product.quantity - item.quantity);
            await product.save();
            console.log("📦 Updated quantity:", product.quantity);
          } else {
            console.error("❌ Product not found with ID:", item.productId);
          }
        } catch (err) {
          console.error("❌ Error during DB lookup/update:", err.message);
        }
      }

      console.log("✅ Product quantities updated after successful payment.");
    } catch (err) {
      console.error("❌ Error processing cart items:", err);
    }
  }

  res.status(200).send("Webhook received");
});

export default router;
