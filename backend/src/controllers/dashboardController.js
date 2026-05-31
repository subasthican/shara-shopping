import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [orders, products, categories, customers, pendingOrders] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    Category.countDocuments(),
    Customer.countDocuments(),
    Order.countDocuments({ orderStatus: 'pending' }),
  ]);

  const sales = await Order.aggregate([
    { $match: { orderStatus: { $ne: 'cancelled' } } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  res.json({
    orders,
    products,
    categories,
    customers,
    pendingOrders,
    totalSales: sales[0]?.total || 0,
  });
});
