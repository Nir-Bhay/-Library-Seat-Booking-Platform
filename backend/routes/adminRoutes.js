const express = require('express');
const {
  getPendingLibraries,
  approveLibrary,
  rejectLibrary,
  getDashboardStats,
  getAllUsers
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/pending-libraries', getPendingLibraries);
router.put('/approve-library/:id', approveLibrary);
router.put('/reject-library/:id', rejectLibrary);
router.get('/dashboard-stats', getDashboardStats);
router.get('/users', getAllUsers);

module.exports = router;
