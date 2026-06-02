import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import { sendOrderNotification } from '../utils/sendOrderNotification.js';

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const ORDER_STATUS_FILTERS = ['all', ...ORDER_STATUSES];
const PAYMENT_STATUS_FILTERS = ['all', 'pending', 'paid', 'cancelled'];

function createOrderNumber() {
  return `SH${Date.now().toString().slice(-8)}`;
}

export const createOrder = asyncHandler(async (req, res) => {
  const { customer, delivery, items } = normalizeOrderPayload(req.body);
  const errors = validateOrderPayload({ customer, delivery, items });

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
  const paymentStatus = String(req.query.paymentStatus || 'all').trim().toLowerCase();
  const search = String(req.query.search || '').trim();
  const status = String(req.query.status || 'all').trim().toLowerCase();
  const query = {};

  if (!ORDER_STATUS_FILTERS.includes(status)) {
    res.status(400);
    throw new Error('Order status filter is invalid.');
  }

  if (!PAYMENT_STATUS_FILTERS.includes(paymentStatus)) {
    res.status(400);
    throw new Error('Payment status filter is invalid.');
  }

  if (search.length > 80) {
    res.status(400);
    throw new Error('Order search filter must be 80 characters or fewer.');
  }

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
  const lookup = getOrderLookup(req.params.id, res);
  const order = await Order.findOne(lookup).populate('customerRef');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json(order);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, note } = normalizeOrderStatusPayload(req.body);
  const errors = validateOrderStatusPayload({ status, note });

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

  const lookup = getOrderLookup(req.params.id, res);
  const order = await Order.findOne(lookup);

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
  const orderId = String(req.params.orderId || '').trim().replace(/^#/, '').toUpperCase();
  const contact = String(req.query.contact || '').trim().toLowerCase();

  if (!/^SH\d{4,}$/i.test(orderId) || (!isEmail(contact) && !isPhoneNumber(contact))) {
    res.status(400);
    throw new Error('A valid order ID and email or phone number are required');
  }

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

function normalizeOrderPayload(payload = {}) {
  const customer = payload.customer || {};
  const delivery = payload.delivery || {};
  const items = Array.isArray(payload.items) ? payload.items : [];

  return {
    customer: {
      fullName: String(customer.fullName || '').trim(),
      phone: String(customer.phone || '').trim(),
      whatsapp: String(customer.whatsapp || '').trim(),
      email: String(customer.email || '').trim().toLowerCase(),
    },
    delivery: {
      address: String(delivery.address || '').trim(),
      city: String(delivery.city || '').trim(),
      district: String(delivery.district || '').trim(),
      note: String(delivery.note || '').trim(),
    },
    items: items.map((item) => ({
      product: item.product,
      productName: String(item.productName || '').trim(),
      sku: String(item.sku || '').trim(),
      size: String(item.size || '').trim(),
      colour: item.colour || {},
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
    })),
  };
}

function validateOrderPayload({ customer, delivery, items }) {
  const errors = [];

  if (customer.fullName.length < 2) {
    errors.push('Customer full name must be at least 2 characters.');
  }

  if (!isPhoneNumber(customer.phone)) {
    errors.push('A valid phone number is required.');
  }

  if (!isEmail(customer.email)) {
    errors.push('A valid email address is required.');
  }

  if (customer.whatsapp && !isPhoneNumber(customer.whatsapp)) {
    errors.push('WhatsApp number is invalid.');
  }

  if (delivery.address.length < 6) {
    errors.push('A complete delivery address is required.');
  }

  if (!delivery.city) {
    errors.push('Delivery city is required.');
  }

  if (!delivery.district) {
    errors.push('Delivery district is required.');
  }

  if (!items.length) {
    errors.push('At least one order item is required.');
  }

  items.forEach((item, index) => {
    if (!item.productName) {
      errors.push(`Order item ${index + 1} requires a product name.`);
    }

    if (!Number.isFinite(item.price) || item.price < 0) {
      errors.push(`Order item ${index + 1} has an invalid price.`);
    }

    if (!Number.isFinite(item.quantity) || item.quantity < 1) {
      errors.push(`Order item ${index + 1} has an invalid quantity.`);
    }
  });

  return errors;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhoneNumber(value) {
  return /^[+()\d\s-]{7,18}$/.test(value);
}

function normalizeOrderStatusPayload(payload = {}) {
  return {
    status: String(payload.status || '').trim().toLowerCase(),
    note: String(payload.note || '').trim(),
  };
}

function validateOrderStatusPayload({ status, note }) {
  const errors = [];

  if (!ORDER_STATUSES.includes(status)) {
    errors.push('Order status is invalid.');
  }

  if (note.length > 240) {
    errors.push('Order status note must be 240 characters or fewer.');
  }

  return errors;
}

function getOrderLookup(id, res) {
  const orderId = String(id || '').trim();
  const orderNumber = orderId.replace(/^#/, '').toUpperCase();

  if (mongoose.isValidObjectId(orderId)) {
    return { _id: orderId };
  }

  if (/^SH\d{4,}$/.test(orderNumber)) {
    return { orderNumber };
  }

  res.status(400);
  throw new Error('A valid order ID or order number is required.');
}
