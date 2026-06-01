import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import { sendOrderNotification } from '../utils/sendOrderNotification.js';

function createOrderNumber() {
  return `SH${Date.now().toString().slice(-8)}`;
}

export const createOrder = asyncHandler(async (req, res) => {
  const { customer, delivery, items = [] } = req.body;
  const totalAmount = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
  const customerLookup = [{ phone: customer.phone }];

  if (customer.email) {
    customerLookup.push({ email: customer.email });
  }

  const customerDoc = await Customer.findOneAndUpdate(
    { $or: customerLookup },
    {
      $set: {
        fullName: customer.fullName,
        phone: customer.phone,
        whatsapp: customer.whatsapp,
        email: customer.email,
      },
      $push: { addresses: delivery },
      $inc: { orderCount: 1 },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const order = await Order.create({
    orderNumber: createOrderNumber(),
    customer,
    customerRef: customerDoc._id,
    delivery,
    items,
    totalAmount,
    timeline: [{ status: 'pending', note: 'Order submitted by customer' }],
  });

  await sendOrderNotification(order);
  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const { paymentStatus = 'all', search, status = 'all' } = req.query;
  const query = {};

  if (status !== 'all') {
    query.orderStatus = status;
  }

  if (paymentStatus !== 'all') {
    query.paymentStatus = paymentStatus;
  }

  if (search) {
    query.$or = [
      { orderNumber: { $regex: search, $options: 'i' } },
      { 'customer.fullName': { $regex: search, $options: 'i' } },
      { 'customer.email': { $regex: search, $options: 'i' } },
      { 'customer.phone': { $regex: search, $options: 'i' } },
    ];
  }

  const orders = await Order.find(query).sort({ createdAt: -1 });
  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const lookup = mongoose.isValidObjectId(req.params.id)
    ? { _id: req.params.id }
    : { orderNumber: req.params.id.replace(/^#/, '') };
  const order = await Order.findOne(lookup).populate('customerRef');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json(order);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.orderStatus = status;
  order.timeline.push({ status, note });
  await order.save();
  res.json(order);
});

export const trackOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { contact } = req.query;
  const order = await Order.findOne({
    orderNumber: orderId,
    $or: [{ 'customer.email': contact }, { 'customer.phone': contact }],
  });

  if (!order) {
    res.status(404);
    throw new Error('Order not found for the provided details');
  }

  res.json(order);
});
