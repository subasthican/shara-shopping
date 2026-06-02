import express from 'express';
import {
  changeAdminPassword,
  getAdminProfile,
  loginAdmin,
  updateAdminProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.route('/me').get(protect, getAdminProfile).put(protect, updateAdminProfile);
router.put('/password', protect, changeAdminPassword);

export default router;
