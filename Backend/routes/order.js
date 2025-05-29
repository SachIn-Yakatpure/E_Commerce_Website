import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import isAuth from '../middleware/authMiddleware.js';
const router = express.Router();

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

router.get('/myorders', isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id,  
      products: { $exists: true, $ne: []}, 
    })
      .populate('products.productId', 'title price image')  
      .sort({ createdAt: -1 });

    console.log(JSON.stringify(orders, null, 2));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});


export default router;
