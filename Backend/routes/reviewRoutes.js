import express from 'express';
import Product from '../models/Product.js';
import isAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id/reviews', isAuth, async (req, res) => {
  try {
    const { rating } = req.body;

    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ message: 'Valid rating (1-5) is required' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update average rating
    const newTotalRatings = product.totalRatings + 1;
    const newAverage = ((product.rating * product.totalRatings) + parsedRating) / newTotalRatings;

    product.rating = newAverage;
    product.totalRatings = newTotalRatings;

    await product.save();

    res.status(201).json({
      message: 'Rating submitted',
      rating: product.rating.toFixed(1),
      totalRatings: product.totalRatings,
    });

  } catch (err) {
    console.error('❌ Error submitting rating:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
