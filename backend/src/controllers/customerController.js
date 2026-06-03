import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Customer from '../models/Customer.js';

export const getCustomers = asyncHandler(async (req, res) => {
  const district = String(req.query.district || '').trim();
  const search = String(req.query.search || '').trim();
  const query = {};

  if (district.length > 80) {
    res.status(400);
    throw new Error('Customer district filter must be 80 characters or fewer.');
  }

  if (search.length > 80) {
    res.status(400);
    throw new Error('Customer search filter must be 80 characters or fewer.');
  }

  if (district) {
    query['addresses.district'] = district;
  }

  if (search) {
    const safeSearch = escapeRegex(search);

    query.$or = [
      { fullName: { $regex: safeSearch, $options: 'i' } },
      { email: { $regex: safeSearch, $options: 'i' } },
      { phone: { $regex: safeSearch, $options: 'i' } },
      { whatsapp: { $regex: safeSearch, $options: 'i' } },
    ];
  }

  const customers = await Customer.find(query).sort({ createdAt: -1 });
  res.json(customers);
});

export const getCustomerById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('A valid customer ID is required.');
  }

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }

  res.json(customer);
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
