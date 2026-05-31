import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  trackOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', protect, getOrders);
router.get('/track/:orderId', trackOrder);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, updateOrderStatus);

export default router;
