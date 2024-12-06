const Homestay = require('../models/Homestay');

const homestayController = {
    // Get all homestays
    getAllHomestays: async (req, res) => {
        try {
            const homestays = await Homestay.find();
            res.json(homestays);
        } catch (error) {
            console.error('Error fetching homestays:', error);
            res.status(500).json({ error: 'Failed to fetch homestays' });
        }
    },

    // Add a new homestay
    addHomestay: async (req, res) => {
        try {
           
            const { name, location, description, pricePerNight, amenities } = req.body;
            if (!name || !location || !description || !pricePerNight || !amenities) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Check if files exist
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'No photos uploaded' });
            }

            // Map file paths for the uploaded photos
            const photoPaths = req.files.map(file => {
                return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            });

            // Create a new homestay (host field removed)
            const newHomestay = new Homestay({
                name,
                location,
                description,
                pricePerNight,
                amenities,
                photos: photoPaths, // Save photo URLs in the database
            });

            // Save the new homestay
            await newHomestay.save();
            res.status(201).json({ message: 'Homestay added successfully', data: newHomestay });
        } catch (error) {
            console.error('Error adding homestay:', error);
            res.status(500).json({ error: 'Failed to add homestay', details: error.message });
        }
    },
};

module.exports = homestayController;
//note - how we handle photo section 
