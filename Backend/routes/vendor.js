import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.put('/update-quantity/:productId', async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const qtyToAdd = Number(quantity);
  if (isNaN(qtyToAdd) || qtyToAdd <= 0) {
    return res.status(400).json({ message: 'Invalid quantity provided' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.totalQuantity += qtyToAdd;
    product.currentQuantity += qtyToAdd;
    product.updatedQuantity = qtyToAdd;

    await product.save();

    res.status(200).json({
      message: 'Stock updated successfully',
      product,
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


export default router;
