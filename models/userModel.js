import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  cartItems: { type: Object, default: {} }
}, { timestamps: true });

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;
