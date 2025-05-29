import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import isAuth from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create PaymentIntent
router.post("/create-checkout-session", isAuth, async (req, res) => {

  const products = req.body.cartItems;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No products provided" });
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title,
        images: [product.image.startsWith('http') ? product.image : `http://localhost:7000${product.image}`]
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  // Add delivery charge as a fixed item
  lineItems.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: 5000, // ₹50.00
    },
    quantity: 1,
  });

  //  Add tax as a fixed item
  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const taxAmount = Math.round(subtotal * 0.18 * 100);

  lineItems.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Tax (18%)",
      },
      unit_amount: taxAmount,
    },
    quantity: 1,
  });

  try {
    const cartItemsForStripe = products.map(p => ({
      productId: p.productId || p._id || p.id,
      quantity: p.quantity || p.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        cart: JSON.stringify(cartItemsForStripe),
        userId: req.user._id.toString(),
        email: req.user.email,
        grandTotal: req.body.grandTotal.toString(),
        taxes: req.body.taxes.toString(),
        deliveryCharges: req.body.deliveryCharges.toString()
      }
    });

    console.log("🛒 Original products array from frontend:", products);
    console.log("🛒 Sending cart to Stripe:", cartItemsForStripe);

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
