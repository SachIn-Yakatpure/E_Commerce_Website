import mongoose from "mongoose";

const cartItemSchema = {
  id: String,
  title: String,
  image: String,
  price: Number,
  qty: { type: Number, required: true },
  total_item_price: Number
};

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cartItems: [cartItemSchema],
  cartCounter: Number,
  totalPrice: Number,
  deliverCharges: Number,
  taxes: Number,
  grandTotal: Number
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
