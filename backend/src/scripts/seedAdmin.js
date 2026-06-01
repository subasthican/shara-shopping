import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Admin from '../models/Admin.js';

dotenv.config();

async function seedAdmin() {
  const name = process.env.SEED_ADMIN_NAME || 'Shara Admin';
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required');
  }

  if (password.length < 8) {
    throw new Error('SEED_ADMIN_PASSWORD must be at least 8 characters');
  }

  await connectDatabase();

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    existingAdmin.name = name;
    existingAdmin.password = password;
    existingAdmin.role = 'super-admin';
    existingAdmin.isActive = true;
    await existingAdmin.save();
    console.log(`Updated admin account: ${email}`);
    return;
  }

  await Admin.create({
    name,
    email,
    password,
    role: 'super-admin',
    isActive: true,
  });

  console.log(`Created admin account: ${email}`);
}

seedAdmin()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
