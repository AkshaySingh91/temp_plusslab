import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/plusslabs`);
    console.log('Connected to MongoDB');

    // Delete existing superadmin
    await User.deleteMany({ role: 'superadmin' });

    // Create with simpler credentials
    const userData = {
      name: 'Super Admin',
      email: 'admin@plusslabs.com',
      password: 'admin123', // Simple password for testing
      role: 'superadmin'
    };

    // Create user and let schema handle password hashing
    const superAdmin = new User(userData);
    await superAdmin.save();

    console.log('=================================');
    console.log('Super Admin Created Successfully!');
    console.log('Use these credentials to login:');
    console.log('Email: admin@plusslabs.com');
    console.log('Password: admin123');
    console.log('=================================');
    //  node scripts/createSuperAdmin.js

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createSuperAdmin();
