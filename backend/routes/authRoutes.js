const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Optional: Logout user (only if you have a logout function in authController)
if (authController.logout) {
    router.post('/logout', authController.logout); // Check if the logout function exists
}



module.exports = router;
