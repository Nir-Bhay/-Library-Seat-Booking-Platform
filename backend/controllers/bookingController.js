const Booking = require('../models/Booking');
const Library = require('../models/Library');

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    const { library_id, bookingDate, seatNumber, timeSlot, totalAmount } = req.body;

    // Check if library exists
    const library = await Library.findById(library_id);
    if (!library) {
      return res.status(404).json({
        success: false,
        error: 'Library not found'
      });
    }

    // Check if library is approved
    if (!library.isApproved) {
      return res.status(400).json({
        success: false,
        error: 'Library is not approved yet'
      });
    }

    // Check if seat is already booked for this date
    const existingBooking = await Booking.findOne({
      library_id,
      bookingDate,
      seatNumber,
      bookingStatus: { $in: ['confirmed', 'pending'] }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        error: 'This seat is already booked for the selected date'
      });
    }

    // Create booking
    const booking = await Booking.create({
      user_id: req.user.id,
      library_id,
      bookingDate,
      seatNumber,
      timeSlot,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: 'Booking created. Proceed to payment',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getMyBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { user_id: req.user.id };

    if (status) {
      query.bookingStatus = status;
    }

    const skip = (page - 1) * limit;
    const total = await Booking.countDocuments(query);

    const bookings = await Booking.find(query)
      .populate('library_id', 'libraryName address coverImage')
      .sort('-createdAt')
      .limit(Number(limit))
      .skip(skip);

    res.status(200).json({
      success: true,
      count: bookings.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      },
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('library_id', 'libraryName address contactNumber')
      .populate('user_id', 'fullName email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Make sure user is booking owner or admin
    if (booking.user_id._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Make sure user is booking owner
    if (booking.user_id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to cancel this booking'
      });
    }

    // Can't cancel completed bookings
    if (booking.bookingStatus === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel completed bookings'
      });
    }

    booking.bookingStatus = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};
