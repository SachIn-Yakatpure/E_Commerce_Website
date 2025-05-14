import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
}, { timestamps: true });

// it basically Prevent model overwriting if it already exists
const Users = mongoose.models.Users || mongoose.model('Users', userSchema);

export default Users;
