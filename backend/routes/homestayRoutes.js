import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import homestayController from '../controllers/homestayController.js';
import { protect, adminOnly, guideOrAdmin, ownerOrAdmin, userOrOwner } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ensure the 'uploads' folder exists
const uploadDir = path.join(process.cwd(), 'uploads', 'homestays');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only JPG, PNG, GIF allowed'));
  }
});

// FIXED / STATIC ROUTES 

// Create homestay (only user/owner)
router.post('/create', protect, userOrOwner, upload.array('photos', 10), homestayController.createHomestay);

// Admin only: get pending homestays
router.get('/pending', protect, adminOnly, homestayController.getPendingHomestays);

// Admin only: approve homestay
router.patch('/:id/approve', protect, adminOnly, homestayController.approveHomestay);

// Bookings routes
router.get('/bookings/me', protect, homestayController.getMyHomestayBookings);
router.get('/bookings/for-me', protect, homestayController.getBookingsForOwner);
router.patch('/bookings/:bookingId/status', protect, ownerOrAdmin, homestayController.updateBookingStatus);
router.delete('/bookings/:bookingId', protect, homestayController.deleteHomestayBooking);

// Available and owner homestays
router.get('/available', protect, homestayController.getAvailableHomestays);
router.get('/for-me', protect, homestayController.getOwnerHomestays);

// Get all homestays
router.get('/', homestayController.getAllHomestays);

//  DYNAMIC ROUTES 

// Book homestay (users) – must come BEFORE /:id
router.post('/:id/book', protect, homestayController.bookHomestay);

// Get, update, delete by ID (owner/admin)
router.get('/:id', protect, homestayController.getHomestayById);
router.put('/:id', protect, upload.array('photos', 10), homestayController.updateHomestay);
router.delete('/:id', protect, ownerOrAdmin, homestayController.deleteHomestay);

export default router;
