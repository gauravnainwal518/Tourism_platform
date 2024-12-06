const Guide = require('../models/Guide');

const guideController = {
  // Get all guides with populated user field
  getGuides: async (req, res) => {
    try {
      const guides = await Guide.find()
        .populate('FullName', 'name email') // Populate user fields 
        .exec();
      res.json(guides);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch guides' });
    }
  },

  // Create a new guide
  createGuide: async (req, res) => {
    try {
      const { FullName,email, phoneNumber, bio, languages,  } = req.body;
      
      if (!FullName||!email ||!phoneNumber || !bio || !languages) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newGuide = new Guide({
        FullName,
        email,
        phoneNumber,
        bio,
        languages,
       
      });

      await newGuide.save();
      res.status(201).json(newGuide);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create guide' });
    }
  },

  
};

module.exports = guideController;
