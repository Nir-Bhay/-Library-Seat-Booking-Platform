const Library = require('../models/Library');
const User = require('../models/User');
const Booking = require('../models/Booking');

// @desc    Get pending libraries
// @route   GET /api/admin/pending-libraries
// @access  Private (Admin)
exports.getPendingLibraries = async (req, res, next) => {
  try {
    const libraries = await Library.find({ isApproved: false })
      .populate('librarian_id', 'fullName email phone')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: libraries.length,
      data: libraries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve library
// @route   PUT /api/admin/approve-library/:id
// @access  Private (Admin)
exports.approveLibrary = async (req, res, next) => {
  try {
    const library = await Library.findById(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        error: 'Library not found'
      });
    }

    library.isApproved = true;
    library.approvedAt = Date.now();
    await library.save();

    res.status(200).json({
      success: true,
      message: 'Library approved successfully',
      data: library
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject library
// @route   PUT /api/admin/reject-library/:id
// @access  Private (Admin)
exports.rejectLibrary = async (req, res, next) => {
  try {
    const library = await Library.findById(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        error: 'Library not found'
      });
    }

    await library.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Library rejected and removed',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard-stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalLibrarians = await User.countDocuments({ role: 'librarian' });
    const totalLibraries = await Library.countDocuments({ isApproved: true });
    const pendingApprovals = await Library.countDocuments({ isApproved: false });
    const totalBookings = await Booking.countDocuments();

    // Calculate total revenue
    const bookings = await Booking.find({ paymentStatus: 'paid' });
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const platformCommission = totalRevenue * 0.1; // 10% commission

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate('user_id', 'fullName email')
      .populate('library_id', 'libraryName')
      .sort('-createdAt')
      .limit(10);

    // Top libraries by bookings
    const topLibraries = await Booking.aggregate([
      { $match: { bookingStatus: 'confirmed' } },
      { $group: { _id: '$library_id', bookingCount: { $sum: 1 } } },
      { $sort: { bookingCount: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalLibrarians,
        totalLibraries,
        totalBookings,
        totalRevenue,
        platformCommission,
        pendingApprovals,
        recentBookings,
        topLibraries
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role } = req.query;

    const query = {};
    if (role) {
      query.role = role;
    }

    const skip = (page - 1) * limit;
    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select('-password')
      .sort('-createdAt')
      .limit(Number(limit))
      .skip(skip);

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      },
      data: users
    });
  } catch (error) {
    next(error);
  }
};
