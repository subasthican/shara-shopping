import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';
import { generateToken } from '../utils/generateToken.js';

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = normalizeCredentials(req.body);
  const errors = validateCredentials({ email, password });

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

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
  const { email, name } = normalizeProfile(req.body);
  const errors = validateProfile({ email, name });

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

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
  const { currentPassword, newPassword } = normalizePasswordPayload(req.body);
  const errors = validatePasswordPayload({ currentPassword, newPassword });

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    res.status(404);
    throw new Error('Admin profile not found');
  }

  if (!(await admin.matchPassword(currentPassword))) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  admin.password = newPassword;
  await admin.save();

  res.json({ message: 'Password updated successfully' });
});

function normalizeCredentials(payload = {}) {
  return {
    email: String(payload.email || '').trim().toLowerCase(),
    password: String(payload.password || ''),
  };
}

function normalizeProfile(payload = {}) {
  return {
    email: String(payload.email || '').trim().toLowerCase(),
    name: String(payload.name || '').trim(),
  };
}

function normalizePasswordPayload(payload = {}) {
  return {
    currentPassword: String(payload.currentPassword || ''),
    newPassword: String(payload.newPassword || ''),
  };
}

function validateCredentials({ email, password }) {
  const errors = [];

  if (!isEmail(email)) {
    errors.push('A valid email address is required.');
  }

  if (!password) {
    errors.push('Password is required.');
  }

  return errors;
}

function validateProfile({ email, name }) {
  const errors = [];

  if (name.length < 2) {
    errors.push('Admin name must be at least 2 characters.');
  }

  if (!isEmail(email)) {
    errors.push('A valid email address is required.');
  }

  return errors;
}

function validatePasswordPayload({ currentPassword, newPassword }) {
  const errors = [];

  if (!currentPassword) {
    errors.push('Current password is required.');
  }

  if (newPassword.length < 8) {
    errors.push('New password must be at least 8 characters.');
  }

  if (currentPassword && currentPassword === newPassword) {
    errors.push('New password must be different from the current password.');
  }

  return errors;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
