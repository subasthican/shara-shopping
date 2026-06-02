import express from 'express';
import {
  createContactMessage,
  getContactMessageById,
  getContactMessages,
  updateContactMessageStatus,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createContactMessage).get(protect, getContactMessages);
router.route('/:id').get(protect, getContactMessageById);
router.route('/:id/status').put(protect, updateContactMessageStatus);

export default router;
