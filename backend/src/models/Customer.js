import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    addresses: [
      {
        address: String,
        city: String,
        district: String,
      },
    ],
    orderCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

customerSchema.index({ phone: 1, email: 1 });

export default mongoose.model('Customer', customerSchema);
