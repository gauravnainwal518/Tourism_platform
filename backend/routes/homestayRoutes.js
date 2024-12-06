const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const homestayController = require('../controllers/homestayController');
//const authMiddleware = require('../middlewares/authMiddleware');

// Ensure the 'uploads' folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 2 MB per file
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'));
        }
    }
});



// Get all homestays
router.get('/', homestayController.getAllHomestays);

// Add a new homestay with photo uploads
router.post(
    '/create',
    //authMiddleware          for this time we comment out this - Ensure only authenticated users can add homestays
    upload.array('photos', 10), // Handles up to 10 photos per request
    homestayController.addHomestay
);

// Update a homestay by ID
// Delete a homestay by ID
// Get a specific homestay by ID
//above features also imp


module.exports = router;
