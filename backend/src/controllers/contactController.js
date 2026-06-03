import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import ContactMessage from '../models/ContactMessage.js';
import { escapeRegex } from '../utils/escapeRegex.js';
import { createPaginatedResponse, getPagination } from '../utils/pagination.js';

const CONTACT_MESSAGE_STATUSES = ['new', 'read', 'replied', 'archived'];
const CONTACT_MESSAGE_STATUS_FILTERS = ['all', ...CONTACT_MESSAGE_STATUSES];

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
  const pagination = getPagination(req.query);
  const search = String(req.query.search || '').trim();
  const status = String(req.query.status || 'all').trim().toLowerCase();
  const query = {};

  if (!CONTACT_MESSAGE_STATUS_FILTERS.includes(status)) {
    res.status(400);
    throw new Error('Contact message status filter is invalid.');
  }

  if (search.length > 80) {
    res.status(400);
    throw new Error('Contact message search filter must be 80 characters or fewer.');
  }

  if (status !== 'all') {
    query.status = status;
  }

  if (search) {
    const safeSearch = escapeRegex(search);

    query.$or = [
      { fullName: { $regex: safeSearch, $options: 'i' } },
      { email: { $regex: safeSearch, $options: 'i' } },
      { phone: { $regex: safeSearch, $options: 'i' } },
      { subject: { $regex: safeSearch, $options: 'i' } },
      { message: { $regex: safeSearch, $options: 'i' } },
    ];
  }

  const messageQuery = ContactMessage.find(query).sort({ createdAt: -1 });

  if (pagination.requested) {
    messageQuery.skip(pagination.skip).limit(pagination.limit);
  }

  const messages = await messageQuery;

  if (pagination.requested) {
    const total = await ContactMessage.countDocuments(query);
    return res.json(createPaginatedResponse(messages, pagination, total));
  }

  res.json(messages);
});

export const getContactMessageById = asyncHandler(async (req, res) => {
  validateContactMessageId(req.params.id, res);

  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  res.json(message);
});

export const updateContactMessageStatus = asyncHandler(async (req, res) => {
  const status = String(req.body.status || '').trim().toLowerCase();

  validateContactMessageId(req.params.id, res);

  if (!CONTACT_MESSAGE_STATUSES.includes(status)) {
    res.status(400);
    throw new Error('Contact message status is invalid.');
  }

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

function validateContactMessageId(id, res) {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error('A valid contact message ID is required.');
  }
}
