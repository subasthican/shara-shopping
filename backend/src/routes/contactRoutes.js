import express from 'express';
import {
  createContactMessage,
  getContactMessageById,
  getContactMessages,
  updateContactMessageStatus,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
import { publicWriteLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.route('/').post(publicWriteLimiter, createContactMessage).get(protect, getContactMessages);
router.route('/:id').get(protect, getContactMessageById);
router.route('/:id/status').put(protect, updateContactMessageStatus);

export default router;
