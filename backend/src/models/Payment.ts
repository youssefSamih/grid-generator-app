import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  code: { type: String, required: true },
  grid: { type: [[String]], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model('Payment', PaymentSchema);
