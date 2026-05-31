import express from 'express';
import { getCustomerById, getCustomers } from '../controllers/customerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCustomers);
router.get('/:id', protect, getCustomerById);

export default router;
