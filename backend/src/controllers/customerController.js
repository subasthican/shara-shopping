import asyncHandler from 'express-async-handler';
import Customer from '../models/Customer.js';

export const getCustomers = asyncHandler(async (req, res) => {
  const { district, search } = req.query;
  const query = {};

  if (district) {
    query['addresses.district'] = district;
  }

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { whatsapp: { $regex: search, $options: 'i' } },
    ];
  }

  const customers = await Customer.find(query).sort({ createdAt: -1 });
  res.json(customers);
});

export const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }

  res.json(customer);
});
