import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';
import { generateToken } from '../utils/generateToken.js';

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, isActive: true });

  if (!admin || !(await admin.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    token: generateToken(admin._id),
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin });
});

export const updateAdminProfile = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    res.status(404);
    throw new Error('Admin profile not found');
  }

  admin.name = name || admin.name;
  admin.email = email || admin.email;

  const updatedAdmin = await admin.save();

  res.json({
    admin: {
      id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      role: updatedAdmin.role,
    },
  });
});

export const changeAdminPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    res.status(404);
    throw new Error('Admin profile not found');
  }

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error('Current password and new password are required');
  }

  if (!(await admin.matchPassword(currentPassword))) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  admin.password = newPassword;
  await admin.save();

  res.json({ message: 'Password updated successfully' });
});
