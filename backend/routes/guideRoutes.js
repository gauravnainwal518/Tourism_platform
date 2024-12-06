const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

// Get all guides
router.get('/', guideController.getGuides);

// POST a new guide
router.post('/', guideController.createGuide);


module.exports = router;
