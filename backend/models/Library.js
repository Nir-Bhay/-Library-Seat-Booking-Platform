const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  libraryName: {
    type: String,
    required: [true, 'Please provide library name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  librarian_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true,
      match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
    }
  },
  contactNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  coverImage: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  totalSeats: {
    type: Number,
    required: [true, 'Please provide total seats'],
    min: 1
  },
  availableSeats: {
    type: Number,
    default: function() {
      return this.totalSeats;
    }
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Please provide price per hour'],
    min: 0
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Please provide price per day'],
    min: 0
  },
  openTime: {
    type: String,
    required: [true, 'Please provide opening time']
  },
  closeTime: {
    type: String,
    required: [true, 'Please provide closing time']
  },
  amenities: [{
    type: String,
    enum: ['wifi', 'ac', 'parking', 'cafeteria', 'locker', 'water', 'charging']
  }],
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedAt: {
    type: Date
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for search
librarySchema.index({ libraryName: 'text', 'address.city': 'text', 'address.area': 'text' });

module.exports = mongoose.model('Library', librarySchema);
