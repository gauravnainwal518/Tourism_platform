const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const homestayController = require('../controllers/homestayController');
const { protect, adminOnly, guideOrAdmin, ownerOrAdmin,userOrOwner } = require('../middlewares/authMiddleware');

// Ensure the 'uploads' folder exists
const uploadDir = path.join(__dirname, '../uploads/homestays');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only JPG, PNG, GIF allowed'));
  }
});

//  Routes 

// Create homestay ( only "user","owner" not guide/admin)
router.post(
  '/create',
  protect,
  userOrOwner,   //  changed here
  upload.array('photos', 10),
  homestayController.createHomestay
);

// Admin only: get pending
router.get('/pending', protect, adminOnly, homestayController.getPendingHomestays);

// Admin only: approve
router.patch('/:id/approve', protect, adminOnly, homestayController.approveHomestay);

// Bookings BEFORE /:id
router.get('/bookings/me', protect, homestayController.getMyHomestayBookings);
router.patch(
  '/bookings/:bookingId/status',
  protect,
  ownerOrAdmin,
  homestayController.updateBookingStatus
);

// Delete/Cancel Booking 
router.delete('/bookings/:bookingId', protect, homestayController.deleteHomestayBooking);

//  Homestay Owner Dashboard 
router.get('/bookings/for-me', protect, homestayController.getBookingsForOwner);


// Get available homestays (for booking by users)
router.get('/available', protect, homestayController.getAvailableHomestays);

// Get all homestays
router.get('/', homestayController.getAllHomestays);

// Fetch homestays owned by logged-in user (owner)
router.get('/for-me', protect, homestayController.getOwnerHomestays);


// Get by ID (must come after fixed routes above)
router.get('/:id', protect, homestayController.getHomestayById);

// Update (owner or admin)
router.put('/:id', protect, upload.array('photos', 10), homestayController.updateHomestay);

// Delete homestay (owner or admin)
router.delete('/:id', protect, ownerOrAdmin, homestayController.deleteHomestay);

// Book homestay (users)
router.post('/:id/book', protect, homestayController.bookHomestay);

module.exports = router;
