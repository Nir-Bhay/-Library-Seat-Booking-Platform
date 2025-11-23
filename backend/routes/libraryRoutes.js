const express = require('express');
const {
  getLibraries,
  getLibrary,
  createLibrary,
  updateLibrary,
  deleteLibrary
} = require('../controllers/libraryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getLibraries)
  .post(protect, authorize('librarian', 'admin'), createLibrary);

router
  .route('/:id')
  .get(getLibrary)
  .put(protect, authorize('librarian', 'admin'), updateLibrary)
  .delete(protect, authorize('librarian', 'admin'), deleteLibrary);

module.exports = router;
