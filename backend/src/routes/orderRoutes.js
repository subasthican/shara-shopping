import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  trackOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { orderTrackingLimiter, publicWriteLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.post('/', publicWriteLimiter, createOrder);
router.get('/', protect, getOrders);
router.get('/track/:orderId', orderTrackingLimiter, trackOrder);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, updateOrderStatus);

export default router;
