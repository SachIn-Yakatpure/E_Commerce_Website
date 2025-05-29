import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  totalQuantity: { // Lifetime total (never decreases)
    type: Number,
    required: true,
    default: 0,
  },
  currentQuantity: { // Actual stock available
    type: Number,
    required: true,
    default: 0,
  },
  updatedQuantity: { // Last added amount (for reference)
    type: Number,
    required: true,
    default: 0,
  },
  
  rating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
