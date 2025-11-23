const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  library_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Library',
    required: true
  },
  bookingDate: {
    type: Date,
    required: [true, 'Please provide booking date']
  },
  seatNumber: {
    type: String,
    required: [true, 'Please provide seat number']
  },
  timeSlot: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  orderId: {
    type: String
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  confirmedAt: {
    type: Date
  }
});

// Generate unique booking ID
bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date(this.bookingDate);
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const random = Math.floor(10000 + Math.random() * 90000);
    this.bookingId = `BK-${dateStr}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
