import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String, required: true },
    sku: { type: String },
    size: { type: String },
    colour: { name: String, hex: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      whatsapp: String,
      email: String,
    },
    customerRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    delivery: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      note: String,
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    contactMethod: { type: String, enum: ['phone', 'whatsapp', 'email'], default: 'whatsapp' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' },
    orderStatus: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    timeline: [
      {
        status: String,
        note: String,
        date: { type: Date, default: Date.now },
      },
    ],
    adminNotes: String,
  },
  { timestamps: true },
);

orderSchema.index({ orderNumber: 1, 'customer.email': 1, 'customer.phone': 1 });

export default mongoose.model('Order', orderSchema);
