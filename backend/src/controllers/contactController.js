import asyncHandler from 'express-async-handler';
import ContactMessage from '../models/ContactMessage.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const messagePayload = normalizeContactMessage(req.body);
  const errors = validateContactMessage(messagePayload);

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

  const message = await ContactMessage.create(messagePayload);
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

function normalizeContactMessage(payload = {}) {
  return {
    fullName: String(payload.fullName || '').trim(),
    email: String(payload.email || '').trim().toLowerCase(),
    phone: String(payload.phone || '').trim(),
    subject: String(payload.subject || '').trim(),
    message: String(payload.message || '').trim(),
  };
}

function validateContactMessage(message) {
  const errors = [];

  if (message.fullName.length < 2) {
    errors.push('Full name must be at least 2 characters.');
  }

  if (!isEmail(message.email)) {
    errors.push('A valid email address is required.');
  }

  if (message.phone && !isPhoneNumber(message.phone)) {
    errors.push('Phone number is invalid.');
  }

  if (!message.subject) {
    errors.push('Subject is required.');
  }

  if (message.message.length < 10) {
    errors.push('Message must be at least 10 characters.');
  }

  return errors;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhoneNumber(value) {
  return /^[+()\d\s-]{7,18}$/.test(value);
}
