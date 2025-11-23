const express = require('express');
const {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').post(createBooking);
router.route('/my-bookings').get(getMyBookings);
router.route('/:id').get(getBooking);
router.route('/:id/cancel').put(cancelBooking);

module.exports = router;
