const dotenv = require('dotenv');
const connectDB = require('../config/database');
const User = require('../models/User');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const seedAdmin = async () => {
  try {
    // Wait a moment for connection to establish
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@librarybooking.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      await require('mongoose').connection.close();
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@librarybooking.com',
      phone: '9999999999',
      password: 'Admin@123456',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log('Email: admin@librarybooking.com');
    console.log('Password: Admin@123456');
    console.log('⚠️  Please change the password after first login!');

    await require('mongoose').connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    await require('mongoose').connection.close();
    process.exit(1);
  }
};

seedAdmin();
