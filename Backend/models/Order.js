import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    taxes: { type: Number },
    deliveryCharges: { type: Number },
    paymentStatus: { type: String, default: 'Unpaid' },
    orderStatus: { type: String, default: 'Processing' },
    paidAt: { type: Date },
    sessionId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
