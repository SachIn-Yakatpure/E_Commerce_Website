const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order'); 
const isAuth = require('../upload/middleware/authMiddleware');

router.post('/purchase', isAuth, async (req, res) => {
  const { productId } = req.body;
  const quantity = 1;

  try {
    const product = await Product.findById(productId);
    if (!product || product.quantity < quantity) {
      return res.status(400).json({ message: 'Product unavailable or out of stock' });
    }

    product.quantity -= quantity;
    await product.save();

    const order = new Order({
      user: req.user._id,
      product: productId,
      quantity,
      totalPrice: product.price * quantity,
    });

    await order.save();
    res.json({ message: 'Purchase successful', order });
  } catch (err) {
    res.status(500).json({ message: 'Error processing purchase', err });
  }
});

module.exports = router;
