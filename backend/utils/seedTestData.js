const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Library = require('../models/Library');

// Load env vars
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const seedTestData = async () => {
  try {
    console.log('🌱 Seeding test data...\n');

    // Create test users
    const testUser = await User.findOne({ email: 'user@test.com' });
    if (!testUser) {
      await User.create({
        fullName: 'Test User',
        email: 'user@test.com',
        phone: '9876543210',
        password: 'User@123',
        role: 'user'
      });
      console.log('✅ Test user created');
      console.log('   Email: user@test.com');
      console.log('   Password: User@123\n');
    }

    // Create test librarian
    let testLibrarian = await User.findOne({ email: 'librarian@test.com' });
    if (!testLibrarian) {
      testLibrarian = await User.create({
        fullName: 'Test Librarian',
        email: 'librarian@test.com',
        phone: '9876543211',
        password: 'Librarian@123',
        role: 'librarian'
      });
      console.log('✅ Test librarian created');
      console.log('   Email: librarian@test.com');
      console.log('   Password: Librarian@123\n');
    }

    // Create test admin
    const testAdmin = await User.findOne({ email: 'admin@librarybooking.com' });
    if (!testAdmin) {
      await User.create({
        fullName: 'Admin User',
        email: 'admin@librarybooking.com',
        phone: '9999999999',
        password: 'Admin@123456',
        role: 'admin'
      });
      console.log('✅ Admin user created');
      console.log('   Email: admin@librarybooking.com');
      console.log('   Password: Admin@123456\n');
    }

    // Create sample libraries
    const existingLibrary = await Library.findOne({ libraryName: 'Central Library Delhi' });
    if (!existingLibrary && testLibrarian) {
      await Library.create({
        libraryName: 'Central Library Delhi',
        description: 'A modern library in the heart of Delhi with all amenities. Perfect for students and professionals.',
        librarian_id: testLibrarian._id,
        address: {
          street: '123 Main Road',
          area: 'Connaught Place',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001'
        },
        contactNumber: '9876543210',
        totalSeats: 100,
        pricePerHour: 50,
        pricePerDay: 400,
        openTime: '08:00',
        closeTime: '22:00',
        amenities: ['wifi', 'ac', 'parking', 'cafeteria'],
        isApproved: true,
        approvedAt: new Date(),
        averageRating: 4.5,
        totalReviews: 120
      });
      console.log('✅ Sample library created (Central Library Delhi)');

      await Library.create({
        libraryName: 'Study Hub Mumbai',
        description: 'Premium study space with 24x7 access. Equipped with high-speed internet and comfortable seating.',
        librarian_id: testLibrarian._id,
        address: {
          street: '456 Market Street',
          area: 'Andheri West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400053'
        },
        contactNumber: '9876543212',
        totalSeats: 80,
        pricePerHour: 60,
        pricePerDay: 500,
        openTime: '00:00',
        closeTime: '23:59',
        amenities: ['wifi', 'ac', 'parking', 'locker', 'charging'],
        isApproved: true,
        approvedAt: new Date(),
        averageRating: 4.7,
        totalReviews: 85
      });
      console.log('✅ Sample library created (Study Hub Mumbai)');

      await Library.create({
        libraryName: 'Knowledge Center Bangalore',
        description: 'Spacious library with separate silent zones and group study areas.',
        librarian_id: testLibrarian._id,
        address: {
          street: '789 Tech Park',
          area: 'Koramangala',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560034'
        },
        contactNumber: '9876543213',
        totalSeats: 120,
        pricePerHour: 55,
        pricePerDay: 450,
        openTime: '07:00',
        closeTime: '23:00',
        amenities: ['wifi', 'ac', 'water', 'charging'],
        isApproved: true,
        approvedAt: new Date(),
        averageRating: 4.3,
        totalReviews: 95
      });
      console.log('✅ Sample library created (Knowledge Center Bangalore)\n');
    }

    console.log('🎉 Test data seeding completed!\n');
    console.log('You can now login with:');
    console.log('- User: user@test.com / User@123');
    console.log('- Librarian: librarian@test.com / Librarian@123');
    console.log('- Admin: admin@librarybooking.com / Admin@123456\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding test data:', error);
    process.exit(1);
  }
};

seedTestData();
