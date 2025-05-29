import express from "express";
import isAuth from '../middleware/authMiddleware.js';
import Users from '../models/users.js';
import Cart from "../models/Cart.js";
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const router = express.Router();

// Save or update user's cart


router.post("/save", isAuth, async (req, res) => {
  const userId = req.user._id;
  const cartItems = req.body.cartItems;

  try {
    console.log("📥 Received cartItems from frontend:", cartItems);

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ message: "Invalid cart data, expected array" });
    }

    // 🔍 Validate stock before saving
    for (const item of cartItems) {
      const product = await Product.findById(item.id);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.title}` });
      }

      if (item.qty > product.quantity) {
        return res.status(400).json({
          message: `❌ Not enough stock for "${product.title}". Requested: ${item.qty}, Available: ${product.quantity}`
        });
      }
    }

    // ✅ If all quantities are valid, continue saving
    const sanitizedItems = cartItems.map(item => {
      const qty = item.qty < 1 ? 1 : item.qty;
      return {
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        qty,
        total_item_price: item.price * qty
      };
    });

    const cartMeta = {
      cartItems: sanitizedItems,
      cartCounter: sanitizedItems.reduce((sum, item) => sum + item.qty, 0),
      totalPrice: sanitizedItems.reduce((sum, item) => sum + item.total_item_price, 0),
      deliverCharges: 50,
      taxes: 0,
      grandTotal: 0
    };
    cartMeta.grandTotal = cartMeta.totalPrice + cartMeta.deliverCharges + cartMeta.taxes;

    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { user: userId, ...cartMeta },
      { upsert: true, new: true, runValidators: true }
    );

    console.log("✅ Cart saved for user:", userId);
    res.status(200).json({ message: "Cart saved successfully", cart: updatedCart });

  } catch (err) {
    console.error("❌ Error saving cart:", err.message);
    res.status(500).json({ error: "Failed to save cart", details: err.message });
  }
});

// Get user's cart 
router.get("/", isAuth, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart || !Array.isArray(cart.cartItems)) {
      return res.status(200).json({ cartItems: [] }); // empty cart fallback
    }

    res.status(200).json({ cartItems: cart.cartItems });
  } catch (err) {
    console.error("❌ Error fetching cart from Cart model:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});


export default router;
