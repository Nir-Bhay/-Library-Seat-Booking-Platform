const Library = require('../models/Library');
const cloudinary = require('../config/cloudinary');

// @desc    Get all approved libraries
// @route   GET /api/libraries
// @access  Public
exports.getLibraries = async (req, res, next) => {
  try {
    const { city, area, minPrice, maxPrice, amenities, page = 1, limit = 10, sort = '-averageRating' } = req.query;

    const query = { isApproved: true };

    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }

    if (area) {
      query['address.area'] = new RegExp(area, 'i');
    }

    if (minPrice || maxPrice) {
      query.pricePerHour = {};
      if (minPrice) query.pricePerHour.$gte = Number(minPrice);
      if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
    }

    if (amenities) {
      const amenitiesArray = amenities.split(',');
      query.amenities = { $all: amenitiesArray };
    }

    const skip = (page - 1) * limit;
    const total = await Library.countDocuments(query);

    const libraries = await Library.find(query)
      .sort(sort)
      .limit(Number(limit))
      .skip(skip)
      .select('-__v');

    res.status(200).json({
      success: true,
      count: libraries.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total
      },
      data: libraries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single library
// @route   GET /api/libraries/:id
// @access  Public
exports.getLibrary = async (req, res, next) => {
  try {
    const library = await Library.findById(req.params.id)
      .populate('librarian_id', 'fullName email contactNumber');

    if (!library) {
      return res.status(404).json({
        success: false,
        error: 'Library not found'
      });
    }

    res.status(200).json({
      success: true,
      data: library
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new library
// @route   POST /api/libraries
// @access  Private (Librarian)
exports.createLibrary = async (req, res, next) => {
  try {
    req.body.librarian_id = req.user.id;

    // Handle image uploads if present
    if (req.files && req.files.length > 0) {
      const imageUrls = [];
      
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'library-booking/libraries'
        });
        imageUrls.push(result.secure_url);
      }

      req.body.images = imageUrls;
      req.body.coverImage = imageUrls[0];
    }

    const library = await Library.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Library submitted for approval',
      data: library
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update library
// @route   PUT /api/libraries/:id
// @access  Private (Librarian)
exports.updateLibrary = async (req, res, next) => {
  try {
    let library = await Library.findById(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        error: 'Library not found'
      });
    }

    // Make sure user is library owner
    if (library.librarian_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this library'
      });
    }

    library = await Library.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: library
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete library
// @route   DELETE /api/libraries/:id
// @access  Private (Librarian/Admin)
exports.deleteLibrary = async (req, res, next) => {
  try {
    const library = await Library.findById(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        error: 'Library not found'
      });
    }

    // Make sure user is library owner
    if (library.librarian_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this library'
      });
    }

    await library.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
