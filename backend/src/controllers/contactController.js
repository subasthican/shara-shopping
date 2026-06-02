import asyncHandler from 'express-async-handler';
import ContactMessage from '../models/ContactMessage.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);
  res.status(201).json(message);
});

export const getContactMessages = asyncHandler(async (req, res) => {
  const { search, status = 'all' } = req.query;
  const query = {};

  if (status !== 'all') {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } },
    ];
  }

  const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
  res.json(messages);
});

export const getContactMessageById = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  res.json(message);
});

export const updateContactMessageStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true },
  );

  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  res.json(message);
});
