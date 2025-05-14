import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.put('/update-quantity/:productId', async (req, res) => {
  const { quantity } = req.body;

  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.quantity = quantity;
    await product.save();
    res.json({ message: 'Quantity updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});

export default router;
