import asyncHandler from 'express-async-handler';
import ContactMessage from '../models/ContactMessage.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);
  res.status(201).json(message);
});
